import { Controller, Get, Param, Post } from '@nestjs/common';
import { RewardRequestsService } from './reward-requests.service';
import { RewardRequest } from './schemas/reward-request.schema';

@Controller('rewards')
export class RewardRequestsController {
  constructor(private readonly rewardRequestsService: RewardRequestsService) {}

  @Post(':rewardId/request')
  async createRewardRequest(
    @Param('rewardId') rewardId: string,
  ): Promise<RewardRequest> {
    return this.rewardRequestsService.createRewardRequest(
      rewardId,
      '6829d4f545ab65aa04f44d7f', // TODO: 현재 로그인 유저 정보 받아오기
    );
  }

  @Get()
  async getRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestsService.getRewardRequests();
  }
}
