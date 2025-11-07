import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
  ADMIN = "admin",
  GERENTE = "gerente",
  FUNCIONARIO = "funcionario",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  // A exclamação serve para mostrar ao Typescript que,
  // sempre que acessarmos, a propriedade não será "undefined"

  @Column({ name: "name", type: "varchar" })
  name!: string;

  @Column({ name: "email", type: "varchar" })
  email!: string;

  @Column({ name: "password", type: "varchar" })
  password!: string;

  @Column({
    name: "role",
    type: "enum",
    enum: Roles,
    default: Roles.FUNCIONARIO,
  })
  role: string;

  @Column({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;
}
