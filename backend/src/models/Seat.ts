import "reflect-metadata";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "theater_id", type: "int" })
  theaterId: number;

  @Column({ type: "varchar", length: 10 })
  row: string;

  @Column({ type: "int" })
  number: number;

  @Column({ type: "boolean", default: true })
  available: boolean;

  @ManyToOne("Theater")
  @JoinColumn({ name: "theater_id" })
  theater: any;
}
