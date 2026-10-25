import { describe, expect, test } from "vitest";
import {
  calcularDigitoVerificador,
  esCorreoValido,
  hayErrores,
  validarClave,
  validarContacto,
  validarCorreo,
  validarLogin,
  validarProducto,
  validarRun,
  validarUsuario,
} from "../utilidades/validaciones";
import { formatearPrecio } from "../utilidades/formato";

// test() define una prueba, expect() indica qué resultado esperamos, toBe() lo compara.

describe("correo", () => {
  test("acepta los dominios permitidos", () => {
    expect(esCorreoValido("laura@duoc.cl")).toBe(true);
    expect(esCorreoValido("profe@profesor.duoc.cl")).toBe(true);
    expect(esCorreoValido("laura@gmail.com")).toBe(true);
  });

  test("rechaza otros dominios o formatos inválidos", () => {
    expect(esCorreoValido("laura@hotmail.com")).toBe(false);
    expect(esCorreoValido("laura@@gmail.com")).toBe(false);
    expect(esCorreoValido("lauragmail.com")).toBe(false);
  });

  test("devuelve el mensaje de error correcto", () => {
    expect(validarCorreo("")).toBe("El correo es obligatorio.");
    expect(validarCorreo("a".repeat(101) + "@gmail.com")).toBe("El correo no puede superar 100 caracteres.");
    expect(validarCorreo("laura@hotmail.com")).toBe("Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    expect(validarCorreo("laura@gmail.com")).toBe("");
  });
});

describe("contraseña", () => {
  test("debe tener entre 4 y 10 caracteres", () => {
    expect(validarClave("")).toBe("La contraseña es obligatoria.");
    expect(validarClave("123")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
    expect(validarClave("12345678901")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
    expect(validarClave("1234")).toBe("");
    expect(validarClave("1234567890")).toBe("");
  });
});

describe("RUN chileno (módulo 11)", () => {
  test("calcula el dígito verificador", () => {
    expect(calcularDigitoVerificador("12345678")).toBe("5");
    expect(calcularDigitoVerificador("1000005")).toBe("K"); // caso especial: resultado 10
    expect(calcularDigitoVerificador("1000013")).toBe("0"); // caso especial: resultado 11
  });

  test("acepta RUN válidos", () => {
    expect(validarRun("123456785")).toBe(true);
    expect(validarRun("987654325")).toBe(true);
    expect(validarRun("1000005K")).toBe(true);
    expect(validarRun("1000005k")).toBe(true); // la K en minúscula también vale
  });

  test("rechaza RUN con dígito verificador incorrecto o formato inválido", () => {
    expect(validarRun("123456786")).toBe(false);
    expect(validarRun("abc")).toBe(false);
    expect(validarRun("")).toBe(false);
  });
});

describe("formularios completos", () => {
  test("login vacío devuelve errores en ambos campos", () => {
    const errores = validarLogin({ correo: "", clave: "" });
    expect(errores.correo).toBe("El correo es obligatorio.");
    expect(errores.clave).toBe("La contraseña es obligatoria.");
  });

  test("login correcto no devuelve errores", () => {
    expect(hayErrores(validarLogin({ correo: "laura@duoc.cl", clave: "1234" }))).toBe(false);
  });

  test("contacto: el comentario no puede superar 500 caracteres", () => {
    const errores = validarContacto({ nombre: "Ana", correo: "ana@gmail.com", comentario: "x".repeat(501) });
    expect(errores.comentario).toBe("El comentario no puede superar 500 caracteres.");
    expect(errores.nombre).toBeUndefined();
  });

  test("usuario: un formulario vacío tiene error en todos los campos obligatorios", () => {
    const errores = validarUsuario({
      run: "", tipo: "", nombre: "", apellidos: "", correo: "",
      fechaNacimiento: "", region: "", comuna: "", direccion: "",
    });
    expect(Object.keys(errores).sort()).toEqual(
      ["apellidos", "comuna", "correo", "direccion", "nombre", "region", "run", "tipo"],
    );
  });

  test("usuario: el RUN no acepta puntos ni guión", () => {
    const errores = validarUsuario({
      run: "12.345.678-5", tipo: "Cliente", nombre: "Ana", apellidos: "Pérez", correo: "ana@gmail.com",
      fechaNacimiento: "", region: "R", comuna: "C", direccion: "Calle 1",
    });
    expect(errores.run).toBe("Ingresa el RUN sin puntos ni guión (ej: 123456785).");
  });

  test("producto: stock debe ser entero y precio no puede ser negativo", () => {
    const errores = validarProducto({
      codigo: "GA001", categoria: "Baterías", nombre: "Batería", descripcion: "",
      precio: "-5", imagen: "", stock: "1.5", stockCritico: "",
    });
    expect(errores.precio).toBe("El precio no puede ser negativo.");
    expect(errores.stock).toBe("El stock debe ser un número entero igual o mayor a 0.");
    expect(errores.stockCritico).toBeUndefined(); // es opcional
  });
});

describe("formato de precio", () => {
  test("usa puntos como separador de miles", () => {
    expect(formatearPrecio(189990)).toBe("$189.990");
  });
});
