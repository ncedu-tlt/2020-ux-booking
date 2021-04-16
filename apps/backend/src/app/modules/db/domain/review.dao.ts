import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';
import { User } from './user.dao';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  pros: string;

  @Column()
  cons: string;

  @Column()
  rating: number;

  @ManyToOne(type => User, user => user.reviews, {
    onDelete: 'CASCADE'
  })
  user: User;

  @ManyToOne(type => Hotel, hotel => hotel.reviews, {
    onDelete: 'CASCADE'
  })
  hotel: Promise<Hotel>;
}
