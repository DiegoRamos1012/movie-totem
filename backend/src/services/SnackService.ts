import { Request, Response } from "express";
import { Snack } from "../models/Snack";
import { AppDataSource } from "../config/database";

export class Snacks {
  private snackRepository = AppDataSource.getRepository(Snack);

  async findAll(): Promise<Snack[]> {
    return await this.snackRepository.find({
      where: { active: true },
      order: { id: "ASC" },
      select: [
        "id",
        "name",
        "description",
        "price",
        "category",
        "available",
        "imageUrl",
      ],
    });
  }

  async create(snackData: Partial<Snack>) {
    const snack = this.snackRepository.create(snackData);
    return await this.snackRepository.save(snack);
  }

  async delete(id: number): Promise<Snack> {
    const snack = await this.snackRepository.findOneBy({ id });
    if (!snack) {
      throw new Error("Snack not found");
    }
    await this.snackRepository.remove(snack);
    return snack;
  }

  async update(id: number, snackData: Partial<Snack>): Promise<Snack> {
    const snack = await this.snackRepository.findOneBy({ id });
    if (!snack) {
      throw new Error("Snack not found");
    }
    await this.snackRepository.update(id, snackData);
    const updatedSnack = await this.snackRepository.findOneBy({ id });
    return updatedSnack!;
  }
}
