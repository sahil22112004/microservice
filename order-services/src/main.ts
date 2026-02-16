import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'order_queue',
      queueOptions: {
        durable: true
      }
    }
  });

  await app.listen();
  Logger.log('Order Service is listening on RabbitMQ');
}

bootstrap();
