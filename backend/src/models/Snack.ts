import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum SnackCategory {
  PIPOCA = "pipoca", // Pipoca doce, salgada, caramelo, chocolate
  BEBIDA = "bebida", // Refrigerantes, sucos, água, energéticos
  DOCE = "doce", // Chocolate, balas, jujubas, M&M's
  COMBO = "combo", // Combos de pipoca + bebida
  OUTROS = "outros", // Outros itens especiais
}

@Entity()
export class Snack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "enum", enum: SnackCategory })
  category: SnackCategory;

  @Column({ type: "varchar", length: 50, nullable: true })
  size: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "varchar", length: 200, nullable: true })
  imageUrl: string;

  @Column({ type: "text", nullable: true })
  ingredients: string;

  @Column({ type: "text", nullable: true })
  allergens: string;

  @Column({ type: "boolean", default: true })
  available: boolean;

  @Column({ type: "int", default: 0 })
  stockQuantity: number;

  @Column({ type: "boolean", default: false })
  isCombo: boolean;

  @Column({ type: "text", nullable: true })
  comboItems: string; // JSON string para itens do combo

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  discountPercentage: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
