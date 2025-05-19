import {
  Controller,
  All,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';

@Controller('reward-requests')
export class RewardRequestsProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  /** 1) 내 이력 (/reward-requests/me) → USER 이상이면 OK */
  @UseGuards(JwtAuthGuard)
  @All('my')
  async myHistory(@Req() req: Request, @Res() res: Response) {
    // 토큰의 userId만 쿼리에 강제 주입
    (req as any).query.userId = (req as any).user.userId;
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  /** 2) 전사 이력 (/reward-requests) → OPERATOR·AUDITOR·ADMIN */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  @All()
  async allHistory(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }
}
