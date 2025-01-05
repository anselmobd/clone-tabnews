const { somar } = require("../../models/calculadora");

describe("Função somar", () => {
  it("deve somar dois números inteiros positivos", () => {
    expect(somar(2, 3)).toBe(5);
  });

  it("deve somar dois números inteiros negativos", () => {
    expect(somar(-2, -3)).toBe(-5);
  });

  it("deve somar dois números de ponto flutuante", () => {
    expect(somar(2.5, 3.14)).toBeCloseTo(5.64);
  });

  it('deve retornar "error" se um dos argumentos não for um número', () => {
    expect(somar("2", 3)).toBe("error");
    expect(somar(2, "3")).toBe("error");
    expect(somar(true, 3)).toBe("error");
    expect(somar(2, false)).toBe("error");
    expect(somar(null, 3)).toBe("error");
    expect(somar(2, undefined)).toBe("error");
  });

  it('deve retornar "error" se ambos os argumentos não forem números', () => {
    expect(somar("2", "3")).toBe("error");
  });
});
