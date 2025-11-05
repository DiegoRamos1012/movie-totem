import axios from "axios";

/**
 * Validadores do sistema
 *
 * Padrão estabelecido:
 * - Todos os validadores devem retornar apenas os valores (true/false ou valor calculado)
 * - Não deve retornar erros nem manipular UI. Essas funções devem ser desempenhadas pelo arquivo que ela foi utilizada.
 */

/**
 * As seguintes validações de email e senha tem mais complexidade pois é necessário exibir feedbacks detalhados ao usuário sobre o que falta
 * para os dados passarem
 */

// Retorna um objeto com cada regra de validação do email
export const validateEmail = (email: string) => {
  return {
    hasAt: email.includes("@"),
    endsWithCom: email.endsWith(".com"),
  };
};

// Retorna true se todas as regras forem válidas
export const isEmailValid = (email: string): boolean => {
  const rules = validateEmail(email);
  // Retorna true se todas as regras forem verdadeiras
  return Object.values(rules).every(Boolean);
};

export const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>-]/.test(password),
  };
};

export const isPasswordValid = (password: string): boolean => {
  const rules = validatePassword(password);
  // Object.values(rules) pega todos os valores das regras (true/false)
  // every(Boolean) retorna true se todas as regras forem verdadeiras, false caso contrário
  return Object.values(rules).every(Boolean);
};

// Verifica no backend se o e-mail já está cadastrado.
// Retorna true quando o e-mail existe (ou seja, não pode ser usado para novo cadastro).
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const base =
      (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000";
    const res = await axios.get(`${base}/api/auth/check-email`, {
      params: { email },
    });
    return Boolean(res.data?.exists);
  } catch (err) {
    console.error("Erro ao verificar e-mail no servidor:", err);
    return false;
  }
};

// Validação assíncrona que combina regras locais e verificação no servidor
export const validateEmailAsync = async (email: string) => {
  const base = validateEmail(email);
  const exists = await checkEmailExists(email);
  return { ...base, exists };
};

export default {};
