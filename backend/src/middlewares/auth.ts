import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database.js";
import { User } from "../models/User.js";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const userPayload = { ...(decoded as object) } as any;

    if (!userPayload.name && userPayload.id) {
      try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: Number(userPayload.id) });
        if (user) {
          userPayload.name = user.name;
        }
      } catch (e) {
        console.warn(
          "auth middleware: não foi possível buscar nome do usuário",
          e
        );
      }
    }

    (req as any).usuario = userPayload;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
}

export default auth;
