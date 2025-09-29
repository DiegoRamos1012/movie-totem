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

  @Column({ length: 2 })
  row: string; // ex: "A", "B", "M"

  @Column()
  number: number; // ex: 1, 2, 6

  @Column({ length: 5 })
  code: string; // row + number, ex: "M6"

  @Column({ default: false })
  occupied: boolean;

  @ManyToOne(() => Theater, (theater) => theater.seats)
  theater: Theater;

  @Column({ name: "screening_id", nullable: true })
  screeningId: number; // ← ADICIONAR para reservas por sessão

  @ManyToOne(() => Screening)
  @JoinColumn({ name: "screening_id" })
  screening: Screening; // ← RELACIONAMENTO com sessão
}
