export enum Roles {
  ADMIN = "Admin",
  GERENTE = "Gerente",
  FUNCIONARIO = "Funcionário",
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;
}
