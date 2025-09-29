import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Movies } from "./Movie.js";
import { Theater } from "./Theater.js";

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "movie_id" })
  movieId: number;

  @Column({ name: "theater_id" })
  theaterId: number;

  @Column({ name: "screening_time", type: "timestamp" })
  screeningTime: Date;

  @Column({ name: "available_seats" })
  availableSeats: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  ticketPrice: number; // ← ADICIONAR preço do ingresso

  @Column({ default: true })
  active: boolean; // ← ADICIONAR status ativo/cancelado

  // Relacionamento com Movie
  @ManyToOne(() => Movies)
  @JoinColumn({ name: "movie_id" })
  movie: Movies;

  // Relacionamento com Theater
  @ManyToOne(() => Theater)
  @JoinColumn({ name: "theater_id" })
  theater: Theater;
}
