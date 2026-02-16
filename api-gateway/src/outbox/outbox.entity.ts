import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export enum orderStatus {
  pending = 'pending',
  published = 'published',
}

@Entity('orders')
export class Order{

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  @Column({
    type:'enum',
    enum:orderStatus,
    default:orderStatus.pending
  })
  status:orderStatus

}