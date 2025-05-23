import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConditionType, EventStatus } from '../events/schemas/event.schema';
import { Reward } from '../events/schemas/reward.schema';
import { Attendance } from './schemas/attendance.schema';
import {
  RewardRequest,
  RewardRequestStatus,
} from './schemas/reward-request.schema';
import { CreateRewardRequestRequestDto } from './dtos/request/create-reward-request.request.dto';

@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequest>,
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
  ) {}

  async createRewardRequest(
    body: CreateRewardRequestRequestDto,
    userId: string,
  ): Promise<RewardRequest> {
    const reward = await this.rewardModel
      .findById(body.rewardId)
      .populate('event')
      .populate('item');
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    const event = reward.event;
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.status !== EventStatus.ACTIVE) {
      throw new BadRequestException('Event is not active');
    }

    // 중복 요청인지 검증
    const existingRequest = await this.rewardRequestModel.findOne({
      reward: reward._id,
      userId,
    });
    if (existingRequest) {
      throw new BadRequestException('Duplicate request');
    }

    // 조건 검증
    let isConditionMet = false;
    let failureReason = null;
    if (event.conditionType === ConditionType.ATTENDANCE) {
      const attendance = await this.attendanceModel.findOne({ userId });
      const requiredDays = event.conditionConfig.requiredDays;
      isConditionMet = !attendance || attendance.streakDays >= requiredDays;
      failureReason = !isConditionMet ? '출석일수 부족' : null;
    }

    return await this.rewardRequestModel.create({
      reward: reward._id,
      userId,
      status: isConditionMet
        ? RewardRequestStatus.APPROVED
        : RewardRequestStatus.REJECTED,
      failureReason,
    });
  }

  async getRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find();
  }

  async getMyRewardRequests(userId: string): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find({ userId });
  }
}
