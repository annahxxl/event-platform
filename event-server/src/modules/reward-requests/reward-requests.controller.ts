import { Body, Controller, Get, Post } from '@nestjs/common';
import { RewardRequestsService } from './reward-requests.service';
import { RewardRequest } from './schemas/reward-request.schema';
import { CreateRewardRequestRequestDto } from './dtos/request/create-reward-request.request.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/common/decorators/current-user.decorator';

@Controller('reward-requests')
export class RewardRequestsController {
  constructor(private readonly rewardRequestsService: RewardRequestsService) {}

  @Post()
  async createRewardRequest(
    @Body() body: CreateRewardRequestRequestDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<RewardRequest> {
    return this.rewardRequestsService.createRewardRequest(body, user.userId);
  }
  @Get()
  async getRewardRequests(): Promise<RewardRequest[]> {
    return this.rewardRequestsService.getRewardRequests();
  }

  @Get('my')
  async getMyRewardRequests(
    @CurrentUser() user: JwtPayload,
  ): Promise<RewardRequest[]> {
    return this.rewardRequestsService.getMyRewardRequests(user.userId);
  }
}
