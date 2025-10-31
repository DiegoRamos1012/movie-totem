/**
 * Validadores do sistema
 * 
 * Padrão estabelecido:
 * - Todos os validadores devem retornar apenas os valores (true/false ou valor calculado)
 * - Não deve retornar erros nem manipular UI. Essas funções devem ser desempenhadas pelo arquivo que ela foi utilizada.
 */

/**  As seguintes validações de email e senha tem mais complexidade pois é necessário exibir feedbacks detalhados ao usuário sobre o que falta
para os dados passarem 
* Exemplo de algoritmo que vai utilizar (lembre-se de apagar o exemplo quando for aplicado): 
const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const rules = validatePassword(value);
    const newErrors: string[] = [];

    if (!rules.minLength) newErrors.push("Senha deve ter pelo menos 8 caracteres.");
    if (!rules.hasNumber) newErrors.push("Senha deve conter ao menos um número.");
    if (!rules.hasSpecialChar) newErrors.push("Senha deve conter ao menos um caractere especial.");

    setErrors(newErrors);
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Digite sua senha"
      />
      <ul>
        {errors.map((err, idx) => (
          <li key={idx} style={{ color: "red" }}>{err}</li>
        ))}
      </ul>
    </div>
  );
};
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

