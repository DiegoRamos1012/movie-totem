import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Snack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column({ type: "numeric", precision: 10, scale: 2, default: 0 })
  price: number;
}
