import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';
import { User } from './user.dao';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => Hotel, hotels => hotels.paymentMethods, {
    nullable: false
  })
  hotels: Promise<Hotel[]>;
}
