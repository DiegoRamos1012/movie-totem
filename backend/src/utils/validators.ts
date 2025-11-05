/**
 * Validadores do sistema (versão backend)
 *
 * Objetivo:
 * - Garantir segurança e consistência nas regras de validação
 * - Evitar duplicação de lógica entre frontend e backend
 */

// Valida estrutura básica de email
export const validateEmail = (email: string) => {
  return {
    hasAt: email.includes("@"),
    endsWithCom: email.endsWith(".com"),
  };
};

// Retorna true se todas as regras forem válidas
export const isEmailValid = (email: string): boolean => {
  const rules = validateEmail(email);
  return Object.values(rules).every(Boolean);
};

// Valida senha de acordo com critérios definidos
export const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>-]/.test(password),
  };
};

// Retorna true se todas as regras forem válidas
export const isPasswordValid = (password: string): boolean => {
  const rules = validatePassword(password);
  return Object.values(rules).every(Boolean);
};

// Exemplo: verificação de e-mail existente via banco de dados
// (função opcional, depende do seu modelo User)
export const checkEmailExists = async (
  email: string,
  userModel: any
): Promise<boolean> => {
  try {
    const user = await userModel.findOne({ where: { email } });
    return Boolean(user);
  } catch (err) {
    console.error("Erro ao verificar e-mail no banco:", err);
    return false;
  }
};

export default {
  validateEmail,
  isEmailValid,
  validatePassword,
  isPasswordValid,
  checkEmailExists,
};
