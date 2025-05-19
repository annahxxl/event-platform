import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ProxyService } from './proxy.service';

@Controller('reward-requests')
@UseGuards(JwtAuthGuard)
export class RewardRequestsProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  @Roles(Role.USER, Role.OPERATOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  async createRewardRequest(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @Get('me')
  async getMyRewardRequests(@Req() req: Request, @Res() res: Response) {
    (req as any).query.userId = (req as any).user.userId;
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @Get()
  @Roles(Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  async getRewardRequests(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }
}
