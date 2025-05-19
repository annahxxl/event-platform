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

@Controller('auth')
export class AuthProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All(['signup', 'signin'])
  async publicAuth(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToAuthService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }

  @UseGuards(JwtAuthGuard)
  @All('*')
  async protectedAuth(@Req() req: Request, @Res() res: Response) {
    const { statusCode, data } =
      await this.proxyService.proxyToAuthService(req);
    res.status(statusCode ?? HttpStatus.OK).json(data);
  }
}
