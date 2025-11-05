import { Request, Response, NextFunction } from "express";
import { validateEmail, validatePassword } from "../utils/validators";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const errors: string[] = [];

  if (!name || !email || !password) {
    errors.push("Nome, email e senha são obrigatórios");
  } else {
    const emailRules = validateEmail(email);
    if (!emailRules.hasAt) errors.push("Email deve conter '@'");
    if (!emailRules.endsWithCom) errors.push("Email deve terminar com '.com'");

    const pwRules = validatePassword(password);
    if (!pwRules.minLength)
      errors.push("Senha deve ter pelo menos 8 caracteres");
    if (!pwRules.hasNumber) errors.push("Senha deve conter ao menos um número");
    if (!pwRules.hasSpecialChar)
      errors.push("Senha deve conter ao menos um caractere especial");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Erro na validação", errors });
  }

  return next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const errors: string[] = [];

  if (!email || !password) {
    errors.push("Email e senha são obrigatórios");
  } else {
    const emailRules = validateEmail(email);
    if (!emailRules.hasAt) errors.push("Email deve conter '@'");
    if (!emailRules.endsWithCom) errors.push("Email deve terminar com '.com'");

    const pwRules = validatePassword(password);
    if (!pwRules.minLength)
      errors.push("Senha deve ter pelo menos 8 caracteres");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Erro na validação", errors });
  }

  return next();
};

export default validateUser;
