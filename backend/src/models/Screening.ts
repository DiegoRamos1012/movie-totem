import "reflect-metadata";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Movie } from "./Movie.js";
import { Theater } from "./Theater.js";

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "movie_id", type: "int" })
  movieId: number;

  @Column({ name: "theater_id", type: "int" })
  theaterId: number;

  @Column({ name: "screening_time", type: "timestamp" })
  screeningTime: Date;

  @Column({ name: "available_seats", type: "int" })
  availableSeats: number;

  @Column({ name: "basePrice", type: "numeric", precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  // Relacionamentos
  @ManyToOne(() => Movie)
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  @ManyToOne(() => Theater)
  @JoinColumn({ name: "theater_id" })
  theater: Theater;
}
