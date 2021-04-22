import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';
import { User } from './user.dao';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(type => User, user => user.comments, {
    onDelete: 'CASCADE'
  })
  user: User;

  @ManyToOne(type => Hotel, hotel => hotel.comments, {
    onDelete: 'CASCADE'
  })
  hotel: Promise<Hotel>;
}
