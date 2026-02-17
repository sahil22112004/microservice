import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RabbitmqConsumerService } from './rabbitmq.consumer'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RabbitmqConsumerService],
})
export class AppModule {}
