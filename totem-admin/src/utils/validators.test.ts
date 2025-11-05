import {
  validateEmail,
  validatePassword,
  checkEmailExists,
} from "./validators";
import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");
const mockedAxiosGet = vi.mocked(axios.get);

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

// ==========================
// ✅ Testes para checkEmailExists
// ==========================
describe("checkEmailExists", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("- Retorna true quando o servidor indica que o e-mail existe", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: { exists: true } });
    const res = await checkEmailExists("exemplo@teste.com");
    expect(res).toBe(true);
    expect(axios.get).toHaveBeenCalled();
  });

  test("- Retorna false quando o servidor indica que o e-mail não existe", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: { exists: false } });
    const res = await checkEmailExists("novo@teste.com");
    expect(res).toBe(false);
    expect(axios.get).toHaveBeenCalled();
  });

  test("- Em caso de erro, retorna false", async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error("network"));
    const res = await checkEmailExists("erro@teste.com");
    expect(res).toBe(false);
    expect(axios.get).toHaveBeenCalled();
  });
});
