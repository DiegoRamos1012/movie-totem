import { Roles, MovieRating, MovieStatus } from "./enums";

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
  movieStatus: MovieStatus;
  active: boolean;
}

