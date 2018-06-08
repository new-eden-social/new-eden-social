import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

}
