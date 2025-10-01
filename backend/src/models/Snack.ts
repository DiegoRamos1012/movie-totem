import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Snack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "numeric", precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: "boolean", default: true })
  active: boolean;
}
