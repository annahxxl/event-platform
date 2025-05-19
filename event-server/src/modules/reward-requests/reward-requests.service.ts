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

@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequest>,
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
  ) {}

  async createRewardRequest(
    rewardId: string,
    userId: string,
  ): Promise<RewardRequest> {
    const reward = await this.rewardModel
      .findById(rewardId)
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

    // 조건 검증
    let isConditionMet = false;
    let failureReason = null;
    if (event.conditionType === ConditionType.ATTENDANCE) {
      const attendance = await this.attendanceModel.findOne({ userId });
      const requiredDays = event.conditionConfig.requiredDays;
      isConditionMet = !attendance || attendance.streak >= requiredDays;
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
}
