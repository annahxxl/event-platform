import { Module } from '@nestjs/common';
import { RewardRequestsController } from './reward-requests.controller';
import { RewardRequestsService } from './reward-requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardRequest,
  RewardRequestSchema,
} from './schemas/reward-request.schema';
import { Reward } from '../events/schemas/reward.schema';
import { RewardSchema } from '../events/schemas/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
  ],
  controllers: [RewardRequestsController],
  providers: [RewardRequestsService],
})
export class RewardRequestsModule {}
