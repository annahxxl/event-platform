import { Body, Controller, Get, Post } from '@nestjs/common';
import { RewardRequest } from './schemas/reward-request.schema';
import { RewardRequestsService } from './reward-requests.service';
import { CreateRewardRequestDto } from './dtos/create-reward-request.dto';

@Controller('reward-requests')
export class RewardRequestsController {
  constructor(private readonly rewardRequestsService: RewardRequestsService) {}

  @Post()
  async createRewardRequest(
    @Body() dto: CreateRewardRequestDto,
  ): Promise<RewardRequest> {
    return this.rewardRequestsService.createRewardRequest(
      '임시아이디', // TODO: 현재 로그인 유저 정보 받아오기
      dto,
    );
  }

  @Get()
  async getRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestsService.getRewardRequests();
  }
}
