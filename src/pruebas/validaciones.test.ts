import {
  esCorreoValido,
  validarClave,
  validarRun,
} from "../utilidades/validaciones";

// it() define una prueba, expect() indica qué resultado esperamos, toBe() lo compara.

describe("correo", () => {
  it("acepta los dominios permitidos", () => {
    expect(esCorreoValido("laura@duoc.cl")).toBe(true);
    expect(esCorreoValido("profe@profesor.duoc.cl")).toBe(true);
    expect(esCorreoValido("laura@gmail.com")).toBe(true);
  });

  it("rechaza otros dominios o formatos inválidos", () => {
    expect(esCorreoValido("laura@hotmail.com")).toBe(false);
    expect(esCorreoValido("laura@@gmail.com")).toBe(false);
    expect(esCorreoValido("lauragmail.com")).toBe(false);
  });

});

describe("contraseña", () => {
  it("debe tener entre 4 y 10 caracteres", () => {
    expect(validarClave("")).toBe("La contraseña es obligatoria.");
    expect(validarClave("123")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
    expect(validarClave("12345678901")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
    expect(validarClave("1234")).toBe("");
    expect(validarClave("1234567890")).toBe("");
  });
});

describe("RUN chileno (módulo 11)", () => {
  it("acepta un RUN correcto y rechaza uno con dígito verificador incorrecto o formato inválido", () => {
    expect(validarRun("123456785")).toBe(true); // el dígito verificador correcto de 12345678 es 5
    expect(validarRun("123456786")).toBe(false);
    expect(validarRun("abc")).toBe(false);
    expect(validarRun("")).toBe(false);
  });
});

