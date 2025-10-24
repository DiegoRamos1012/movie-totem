import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "troque_esta_chave_em_producao";

export function signJwt(payload: object, expiresIn: string | number = "1h"): string {
  return jwt.sign(payload as any, JWT_SECRET as any, { expiresIn } as any);
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET as any) as T;
}
