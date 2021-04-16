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

  @Column()
  lastName: string;

  @Column()
  patronymic: number;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @ManyToOne(type => Address, address => address.users)
  address: Address;

  @OneToMany(type => Review, reviews => reviews.user, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  reviews: Promise<Review[]>;

  @OneToMany(type => Comment, comments => comments.user, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  comments: Promise<Comment[]>;

  @OneToMany(type => Booking, booking => booking.user, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  bookings: Promise<Booking[]>;

  @ManyToMany(type => Hotel, hotel => hotel.users, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  bookmarks: Promise<Hotel[]>;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  emailNotification: boolean;
}
