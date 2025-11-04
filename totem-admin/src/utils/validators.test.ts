import { validateEmail } from "./validators";
import { describe, test, expect} from "vitest"

describe("Validação de email", () => {
    test("- Verifica se o email inserido possui @ no campo", () => {
        expect(validateEmail("exemplo@.com")).toBe(true);
    });

    test("- Verifica se o email inserido possui .com no campo", () => {
        expect(validateEmail("exemplo@.com")).toBe(true);
    })
})

