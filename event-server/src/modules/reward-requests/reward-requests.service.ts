import { Injectable, NotFoundException } from '@nestjs/common';
import {
  RewardRequest,
  RewardRequestStatus,
} from './schemas/reward-request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRewardRequestDto } from './dtos/create-reward-request.dto';
import { Model } from 'mongoose';
import { Reward } from '../events/schemas/reward.schema';

@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequest>,
  ) {}

  async createRewardRequest(
    userId: string,
    dto: CreateRewardRequestDto,
  ): Promise<RewardRequest> {
    const reward = await this.rewardModel.findById(dto.rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    return await this.rewardRequestModel.create({
      reward: reward._id,
      userId,
      status: RewardRequestStatus.PENDING,
    });
  }

  async getRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find();
  }
}
