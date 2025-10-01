import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Theater } from "./Theater.js";
import { Screening } from "./Screening.js";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 2 })
  row: string; // ex: "A", "B", "M"

  @Column({ type: "int" })
  number: number; // ex: 1, 2, 6

  @Column({ type: "varchar", length: 5 })
  code: string; // row + number, ex: "M6"

  @Column({ type: "boolean", default: false })
  occupied: boolean;

  @Column({ name: "theater_id", type: "int" })
  theaterId: number;

  @Column({ name: "screening_id", type: "int", nullable: true })
  screeningId: number;

  @ManyToOne(() => Theater, (theater) => theater.seats)
  @JoinColumn({ name: "theater_id" })
  theater: Theater;

  @ManyToOne(() => Screening)
  @JoinColumn({ name: "screening_id" })
  screening: Screening;
}
