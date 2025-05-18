import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './modules/events/events.module';
import { ItemsModule } from './modules/items/items.module';
import { RewardRequestsModule } from './modules/reward-requests/reward-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/event',
    ),
    EventsModule,
    ItemsModule,
    RewardRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
