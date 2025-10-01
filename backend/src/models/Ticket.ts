import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Screening } from "./Screening.js";
import { Seat } from "./Seat.js";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "screening_id", type: "int" })
  screeningId: number;

  @Column({ name: "seat_id", type: "int" })
  seatId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  purchaseTime: Date;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Screening)
  @JoinColumn({ name: "screening_id" })
  screening: Screening;

  @ManyToOne(() => Seat)
  @JoinColumn({ name: "seat_id" })
  seat: Seat;
}
