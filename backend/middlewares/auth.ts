import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Adiciona os dados do usuário à requisição
    (req as any).usuario = decoded;

    next(); // prossegue para a rota
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
}
