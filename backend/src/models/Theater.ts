import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Seat } from "./Seat.js";

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string; // nome da sala

  @Column({ type: "int" })
  capacity: number; // total seats

  @OneToMany(() => Seat, (seat) => seat.theater)
  seats: Seat[];
}
