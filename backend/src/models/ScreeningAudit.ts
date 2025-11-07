import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ScreeningAudit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "screening_id", type: "int" })
  screeningId!: number;

  @Column({ type: "varchar", length: 100 })
  action!: string; // activate, deactivate, active_change

  @Column({ name: "previous_value", type: "text", nullable: true })
  previousValue?: string;

  @Column({ name: "new_value", type: "text", nullable: true })
  newValue?: string;

  @Column({ name: "performed_by_id", type: "int", nullable: true })
  performedById?: number;

  @Column({
    name: "performed_by_name",
    type: "varchar",
    length: 200,
    nullable: true,
  })
  performedByName?: string;

  @Column({
    name: "performed_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  performedAt!: Date;
}

export default ScreeningAudit;
