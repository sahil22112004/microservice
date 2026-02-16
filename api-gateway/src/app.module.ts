import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './outbox/outbox.entity';
import { ScheduleModule } from '@nestjs/schedule'

import { config } from 'dotenv';



config();



@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
    {
      name:ORDER_SERVICE_RABBITMQ,
      transport:Transport.RMQ,
      options:{
        urls :["amqp://guest:guest@rabbitmq:5672"],
        queue: 'order_queue',
        // exchangeType:'fanout',
        queueOptions:{
          durable: true,
        }
      }
    }
  ]),
 TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Order],
      synchronize: false,

    }),
  TypeOrmModule.forFeature([Order])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
