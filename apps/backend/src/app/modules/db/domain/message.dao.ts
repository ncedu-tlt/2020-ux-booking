import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class MessageDao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;
}
