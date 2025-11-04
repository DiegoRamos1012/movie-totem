import { validateEmail, validatePassword } from "./validators";
import { describe, test, expect } from "vitest";

// ==========================
// 🧩 Testes de Validação de Email
// ==========================
describe("Validação de email", () => {
  test("- Verifica se o email válido passa em todas as regras", () => {
    const result = validateEmail("exemplo@teste.com");
    expect(result.hasAt).toBeTruthy();
    expect(result.endsWithCom).toBeTruthy();
  });

  test("- Falha se o email não tiver '@'", () => {
    const result = validateEmail("exemploteste.com");
    expect(result.hasAt).toBeFalsy();
  });

  test("- Falha se o email não terminar com '.com'", () => {
    const result = validateEmail("exemplo@teste");
    expect(result.endsWithCom).toBeFalsy();
  });

  test("- Falha se o email for vazio", () => {
    const result = validateEmail("");
    expect(result.hasAt).toBeFalsy();
    expect(result.endsWithCom).toBeFalsy();
  });
});

// ==========================
// 🔒 Testes de Validação de Senha
// ==========================
describe("Validação de senha", () => {
  test("- Verifica se a senha válida passa em todas as regras", () => {
    const result = validatePassword("Exemplo1@");
    expect(result.minLength).toBeTruthy();
    expect(result.hasNumber).toBeTruthy();
    expect(result.hasSpecialChar).toBeTruthy();
  });

  test("- Falha se a senha for muito curta", () => {
    const result = validatePassword("123");
    expect(result.minLength).toBeFalsy();
  });

  test("- Falha se a senha não tiver número", () => {
    const result = validatePassword("exemplo@");
    expect(result.hasNumber).toBeFalsy();
  });

  test("- Falha se a senha não tiver caracter especial", () => {
    const result = validatePassword("exemplo1");
    expect(result.hasSpecialChar).toBeFalsy();
  });
});
