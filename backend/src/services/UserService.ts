import { AppDataSource } from "../config/database";
import { User, Roles } from "../models/User";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    role?: Roles | string;
  }) {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios");
    }

    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new Error("Email já cadastrado");
    }

    // valida role opcional
    const validRoles = Object.values(Roles) as string[];
    const roleToUse =
      role && validRoles.includes(String(role))
        ? (role as Roles)
        : Roles.FUNCIONARIO;

    const hashed = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashed,
      role: roleToUse,
    });
    await this.userRepository.save(user);

    const { password: _p, ...safe } = user as any;
    return safe;
  }

  // adicionado: autentica usuário e retorna usuário sem senha
  async authUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Credenciais inválidas");
    }

    const { password: _p, ...safe } = user as any;
    return safe;
  }
}
