import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum MovieRating {
  LIVRE = 0,
  DEZ = 10,
  DOZE = 12,
  QUATORZE = 14,
  DEZESSEIS = 16,
  DEZOITO = 18,
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ name: "original_name", type: "varchar", length: 200 })
  originalName: string;

  @Column({ type: "text" })
  casting: string;

  @Column({ type: "varchar", length: 200 })
  direction: string;

  @Column({ type: "text" })
  synopsis: string;

  @Column({ type: "varchar", length: 50 })
  genre: string;

  @Column({ type: "int" })
  duration: number;

  @Column({ type: "enum", enum: MovieRating })
  rating: MovieRating;

  @Column({ name: "release_date", type: "date" })
  releaseDate: Date;

  @Column({ name: "poster_url", type: "varchar", length: 500, nullable: true })
  posterUrl: string;

  @Column({ type: "boolean", default: true })
  active: boolean;
}
