import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyService } from './proxy.service';
import { AuthModule } from '../auth/auth.module';
import { AuthProxyController } from './auth.proxy.controller';
import { EventsProxyController } from './events.proxy.controller';
import { RewardRequestsProxyController } from './reward-requests.proxy.controller';
import { ItemsProxyController } from './items.proxy.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    AuthModule,
  ],
  controllers: [
    AuthProxyController,
    EventsProxyController,
    ItemsProxyController,
    RewardRequestsProxyController,
  ],
  providers: [ProxyService],
  exports: [ProxyService],
})
export class ProxyModule {}
