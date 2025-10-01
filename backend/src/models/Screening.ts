import "reflect-metadata";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "movie_id", type: "int" })
  movieId: number;

  @Column({ name: "theater_id", type: "int" })
  theaterId: number;

  @Column({ name: "start_time", type: "timestamp" })
  startTime: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @ManyToOne("Movie")
  @JoinColumn({ name: "movie_id" })
  movie: any;

  @ManyToOne("Theater")
  @JoinColumn({ name: "theater_id" })
  theater: any;
}
