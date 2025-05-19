import {
  Controller,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  Get,
  Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class EventsProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  @Roles(Role.OPERATOR, Role.ADMIN)
  async createEvent(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @Get()
  @Roles(Role.OPERATOR, Role.ADMIN)
  async getEvents(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @Get(':id')
  @Roles(Role.OPERATOR, Role.ADMIN)
  async getEvent(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @Post(':id/rewards')
  @Roles(Role.OPERATOR, Role.ADMIN)
  async createReward(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToEventService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }
}
