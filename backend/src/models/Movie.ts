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

  @Column({ length: 200 })
  name: string;

  @Column({ name: "original_name", length: 200 })
  originalName: string;

  @Column("text")
  casting: string;

  @Column({ length: 200 })
  direction: string;

  @Column("text")
  synopsis: string;

  @Column({ length: 50 })
  genre: string;

  @Column()
  duration: number;

  @Column({ type: "enum", enum: MovieRating })
  rating: MovieRating;

  @Column({ name: "release_date", type: "date" })
  releaseDate: Date;

  @Column({ name: "poster_url", length: 500, nullable: true })
  posterUrl: string;

  @Column({ default: true })
  active: boolean; // ← ADICIONAR status ativo/inativo
}
