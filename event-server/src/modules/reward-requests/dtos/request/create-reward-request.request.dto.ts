import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRewardRequestRequestDto {
  @IsString()
  @IsNotEmpty()
  rewardId: string;
}
