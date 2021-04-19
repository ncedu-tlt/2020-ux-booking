import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Address } from './addresses.dao';
import { Role } from './role.dao';
import { Review } from './review.dao';
import { Hotel } from './hotel.dao';
import { Comment } from './comment.dao';
import { Booking } from './booking.dao';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  patronymic: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  emailNotification: boolean;

  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @ManyToOne(type => Address, address => address.users, {
    nullable: true
  })
  address: Address;

  @OneToMany(type => Review, reviews => reviews.user, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  reviews: Promise<Review[]>;

  @OneToMany(type => Comment, comments => comments.user, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  comments: Promise<Comment[]>;

  @OneToMany(type => Booking, booking => booking.user, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  bookings: Promise<Booking[]>;

  @ManyToMany(type => Hotel, hotel => hotel.users, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  bookmarks: Promise<Hotel[]>;
}
