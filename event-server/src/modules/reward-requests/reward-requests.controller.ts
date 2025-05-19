import { Body, Controller, Get, Post } from '@nestjs/common';
import { RewardRequestsService } from './reward-requests.service';
import { RewardRequest } from './schemas/reward-request.schema';
import { CreateRewardRequestRequestDto } from './dtos/request/create-reward-request.request.dto';

@Controller('reward-requests')
export class RewardRequestsController {
  constructor(private readonly rewardRequestsService: RewardRequestsService) {}

  @Post()
  async createRewardRequest(
    @Body() body: CreateRewardRequestRequestDto,
  ): Promise<RewardRequest> {
    return this.rewardRequestsService.createRewardRequest(
      body,
      '6829d4f545ab65aa04f44d7f', // TODO: 현재 로그인 유저 정보 받아오기
    );
  }
  @Get()
  async getRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestsService.getRewardRequests();
  }

  @Get('my')
  async getMyRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestsService.getMyRewardRequests(
      '6829d4f545ab65aa04f44d7f', // TODO: 현재 로그인 유저 정보 받아오기
    );
  }
}
