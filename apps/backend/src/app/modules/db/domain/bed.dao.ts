import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.dao';

@Entity('beds')
export class Bed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => Room, rooms => rooms.beds)
  rooms: Room[];
}
