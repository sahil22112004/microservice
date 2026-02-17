import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('order')
  createOrder(@Body() order: any) {
    return this.appService.createOrder(order)
  }
}
