import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { signJwt } from "../utils/jwt";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await userService.registerUser({
      name,
      email,
      password,
      role,
    });
    return res
      .status(201)
      .json({ message: `Usuário "${user.name}" cadastrado com sucesso`, user });
  } catch (error: any) {
    const message = error?.message ?? "Erro no cadastro";
    return res.status(400).json({ message });
  }
};

export const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authUser(email, password);

    const token = signJwt(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      "1h"
    );

    return res.status(200).json({ user, token });
  } catch (error: any) {
    const message = error?.message ?? "Falha na autenticação";
    return res.status(401).json({ message });
  }
};
