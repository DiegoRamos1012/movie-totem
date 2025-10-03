import type { Request, Response } from "express";
import { ScreeningService } from "../services/ScreeningService";

const screeningService = new ScreeningService();

export class ScreeningController {
    static async getScreenings(req: Request, res: Response) {
        try {
            const screenings = await screeningService.findAll();
            return res.status(200).json(screenings);
        } catch (error: any) {
            console.error(`Error fetching screenings: ${error}`)
        }
    }
}