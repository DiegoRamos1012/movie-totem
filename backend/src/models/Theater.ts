import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "int" })
  capacity: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  // Use string reference
  @OneToMany("Seat", "theater")
  seats: any[];
}
