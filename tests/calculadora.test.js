const calculadora = require("../models/calculadora.js");

test("somar 40 e 2 = 42", () => {
  expect(calculadora.somar(40, 2)).toBe(42);
});

test("somar 'banana' e 2 = 'error'", () => {
  expect(calculadora.somar("banana", 2)).toBe("error");
});

test("somar 40 = 'error'", () => {
  expect(calculadora.somar(40)).toBe("error");
});

test("somar = 'error'", () => {
  expect(calculadora.somar()).toBe("error");
});
