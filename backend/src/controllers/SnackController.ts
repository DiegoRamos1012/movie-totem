import { Request, Response } from "express";
import { Snack } from "../models/Snack";
import { AppDataSource } from "../config/database";

export class Snacks {
    private snackRepository = AppDataSource.getRepository(Snack)

    async findAll(): Promise<Snack> {
        return await this.snackRepository.find({
            ord
        })
    }
}