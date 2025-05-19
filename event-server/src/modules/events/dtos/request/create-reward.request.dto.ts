import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRewardRequestDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
