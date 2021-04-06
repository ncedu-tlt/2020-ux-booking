import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(type => Review, reviews => reviews.user)
  reviews: Review[];

  @OneToMany(type => Comment, comments => comments.user)
  comments: Comment[];

  @OneToMany(type => Booking, booking => booking.user)
  bookings: Booking[];

  @ManyToMany(type => Hotel, hotel => hotel.users)
  bookmarks: Hotel[];

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  emailNotification: boolean;
}
