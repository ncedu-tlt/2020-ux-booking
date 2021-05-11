import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.dao';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(type => User, users => users.roles, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  users: Promise<User[]>;
}
