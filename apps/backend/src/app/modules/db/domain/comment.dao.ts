import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';
import { User } from './user.dao';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Hotel, hotel => hotel.comments)
  hotel: Hotel;
}
