import {
  Controller,
  All,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';

@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class ItemsProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  @Roles(Role.OPERATOR, Role.ADMIN)
  async createItem(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToItemService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @Get()
  @Roles(Role.OPERATOR, Role.ADMIN)
  async getItems(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToItemService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }
}
