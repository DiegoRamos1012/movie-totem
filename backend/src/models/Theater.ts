import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Seat } from "./Seat.js";

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; // nome da sala

  @Column()
  capacity: number; // total seats

  @OneToMany(() => Seat, (seat) => seat.theater)
  seats: Seat[];
}
