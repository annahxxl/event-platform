import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('gateway/health-check')
  checkGatewayHealth(): string {
    return this.appService.checkGatewayHealth();
  }

  @Get('auth/health-check')
  async checkAuthHealth(): Promise<string> {
    return this.appService.checkAuthHealth();
  }

  @Get('event/health-check')
  async checkEventHealth(): Promise<string> {
    return this.appService.checkEventHealth();
  }
}
