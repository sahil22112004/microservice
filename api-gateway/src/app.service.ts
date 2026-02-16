import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order, orderStatus } from './outbox/outbox.entity'
import { ClientProxy } from '@nestjs/microservices'
import { ORDER_SERVICE_RABBITMQ } from './constants'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @Inject(ORDER_SERVICE_RABBITMQ) private readonly client: ClientProxy
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async createOrder(order: any) {
    const outboxData = {
      message: JSON.stringify(order),
      status: orderStatus.pending
    }

    const savedOrder = this.orderRepo.create(outboxData)
    await this.orderRepo.save(savedOrder)

    return { message: 'Order placed successfully', order: savedOrder }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processOutbox() {
    const pendingOrders = await this.orderRepo.find({
      where: { status: orderStatus.pending }
    })

    for (const item of pendingOrders) {
      try {
        this.client.emit('order-created', JSON.parse(item.message))

        item.status = orderStatus.published
        await this.orderRepo.save(item)

        console.log(`Processed outbox item ${item.id}`)
      } catch (err) {
        console.error(`Failed to process outbox item ${item.id}:`, err)
      }
    }
  }
}
