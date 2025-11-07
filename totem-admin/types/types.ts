export enum Roles {
  ADMIN = "Admin",
  GERENTE = "Gerente",
  FUNCIONARIO = "Funcionário",
}

export enum MovieRating {
  LIVRE = 0,
  DEZ = 10,
  DOZE = 12,
  QUATORZE = 14,
  DEZESSEIS = 16,
  DEZOITO = 18,
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;
}

export interface Movie {
  id: number;
  name: string;
  originalName: string;
  casting: string;
  direction: string;
  synopsis: string;
  genre: string;
  duration: number;
  rating: MovieRating;
  releaseDate: Date;
  posterUrl: string;
  active: boolean;
}
