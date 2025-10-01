import {
  Entity,
  Column,
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

  @Column({ type: "numeric", precision: 10, scale: 2 })
  ticketPrice: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  // Relacionamento com Movie
  @ManyToOne(() => Movie)
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  // Relacionamento com Theater
  @ManyToOne(() => Theater)
  @JoinColumn({ name: "theater_id" })
  theater: Theater;
}
