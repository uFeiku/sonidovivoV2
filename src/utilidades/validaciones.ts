/* ============================================
   SONIDO VIVO - validaciones.ts
   Son funciones "puras": reciben datos y devuelven un resultado.
   No tocan el DOM, por eso son fáciles de probar con Vitest.
   Cada validador devuelve el MENSAJE de error, o "" si todo está bien.
   ============================================ */

/** Objeto de errores de un formulario: { campo: "mensaje" } (solo los campos con error) */
export type Errores<T> = Partial<Record<keyof T, string>>;

export const hayErrores = (errores: object): boolean => Object.keys(errores).length > 0;

/* -------------------- Correo -------------------- */

const MSG_DOMINIO = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

/** Solo se aceptan correos @duoc.cl, @profesor.duoc.cl y @gmail.com */
export function esCorreoValido(correo: string): boolean {
  const patron = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return patron.test(correo);
}

export function validarCorreo(correo: string): string {
  const valor = correo.trim();
  if (valor === "") return "El correo es obligatorio.";
  if (valor.length > 100) return "El correo no puede superar 100 caracteres.";
  if (!esCorreoValido(valor)) return MSG_DOMINIO;
  return "";
}

/* -------------------- Contraseña -------------------- */

export function validarClave(clave: string): string {
  if (clave === "") return "La contraseña es obligatoria.";
  if (clave.length < 4 || clave.length > 10) {
    return "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  return "";
}

/* -------------------- RUN chileno (Módulo 11) -------------------- */

/** Calcula el dígito verificador de un RUN (sin puntos ni guión). */
export function calcularDigitoVerificador(cuerpo: string): string {
  let suma = 0;
  let multiplicador = 2;

  // Recorremos el cuerpo de derecha a izquierda, multiplicando por 2,3,4,5,6,7,2,3...
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador++;
    if (multiplicador > 7) multiplicador = 2;
  }

  const digito = 11 - (suma % 11);
  if (digito === 11) return "0";
  if (digito === 10) return "K";
  return String(digito);
}

/** true si el RUN (ej: "123456785") tiene un dígito verificador correcto */
export function validarRun(run: string): boolean {
  if (!run || run.trim() === "") return false;

  const runLimpio = run.trim().toUpperCase();
  // Solo números y, al final, un número o una K
  if (!/^[0-9]+[0-9K]$/.test(runLimpio)) return false;

  const cuerpo = runLimpio.slice(0, -1);
  const dvIngresado = runLimpio.slice(-1);
  return dvIngresado === calcularDigitoVerificador(cuerpo);
}

export function validarCampoRun(run: string): string {
  const valor = run.trim();
  if (valor === "") return "El RUN es obligatorio.";
  if (valor.includes(".") || valor.includes("-")) {
    return "Ingresa el RUN sin puntos ni guión (ej: 123456785).";
  }
  if (!validarRun(valor)) return "El RUN no es válido. Revisa el dígito verificador.";
  return "";
}

/* -------------------- Helper de texto -------------------- */

function validarTexto(
  valor: string,
  mensajeObligatorio: string,
  maximo: number,
  mensajeMaximo: string,
): string {
  const v = valor.trim();
  if (v === "") return mensajeObligatorio;
  if (v.length > maximo) return mensajeMaximo;
  return "";
}

/** Agrega el error al objeto solo si el mensaje no está vacío */
function agregar<T>(errores: Errores<T>, campo: keyof T, mensaje: string): void {
  if (mensaje !== "") errores[campo] = mensaje;
}

/* ============================================
   1. LOGIN
   ============================================ */
export interface DatosLogin {
  correo: string;
  clave: string;
}

export function validarLogin(datos: DatosLogin): Errores<DatosLogin> {
  const errores: Errores<DatosLogin> = {};
  agregar(errores, "correo", validarCorreo(datos.correo));
  agregar(errores, "clave", validarClave(datos.clave));
  return errores;
}

/* ============================================
   2. CONTACTO
   ============================================ */
export interface DatosContacto {
  nombre: string;
  correo: string;
  comentario: string;
}

export function validarContacto(datos: DatosContacto): Errores<DatosContacto> {
  const errores: Errores<DatosContacto> = {};
  agregar(
    errores,
    "nombre",
    validarTexto(datos.nombre, "El nombre es obligatorio.", 100, "El nombre no puede superar 100 caracteres."),
  );
  agregar(errores, "correo", validarCorreo(datos.correo));
  agregar(
    errores,
    "comentario",
    validarTexto(
      datos.comentario,
      "El comentario es obligatorio.",
      500,
      "El comentario no puede superar 500 caracteres.",
    ),
  );
  return errores;
}

/* ============================================
   3. USUARIO (registro y admin de usuarios)
   ============================================ */
export interface DatosUsuario {
  run: string;
  tipo: string;
  nombre: string;
  apellidos: string;
  correo: string;
  fechaNacimiento: string; // opcional
  region: string;
  comuna: string;
  direccion: string;
}

export function validarUsuario(datos: DatosUsuario): Errores<DatosUsuario> {
  const errores: Errores<DatosUsuario> = {};
  agregar(errores, "run", validarCampoRun(datos.run));
  agregar(
    errores,
    "nombre",
    validarTexto(datos.nombre, "El nombre es obligatorio.", 50, "El nombre no puede superar 50 caracteres."),
  );
  agregar(
    errores,
    "apellidos",
    validarTexto(
      datos.apellidos,
      "Los apellidos son obligatorios.",
      100,
      "Los apellidos no pueden superar 100 caracteres.",
    ),
  );
  agregar(errores, "correo", validarCorreo(datos.correo));
  if (datos.tipo === "") errores.tipo = "Selecciona un tipo de usuario.";
  if (datos.region === "") errores.region = "Selecciona una región.";
  if (datos.comuna === "") errores.comuna = "Selecciona una comuna.";
  agregar(
    errores,
    "direccion",
    validarTexto(
      datos.direccion,
      "La dirección es obligatoria.",
      300,
      "La dirección no puede superar 300 caracteres.",
    ),
  );
  return errores;
}

/* ============================================
   4. PRODUCTO (admin de productos)
   Los números llegan como texto desde el <input>.
   ============================================ */
export interface DatosProducto {
  codigo: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string; // opcional
  stock: string;
  stockCritico: string; // opcional
}

const esEnteroMayorOIgualACero = (texto: string): boolean =>
  Number.isInteger(Number(texto)) && Number(texto) >= 0;

export function validarProducto(datos: DatosProducto): Errores<DatosProducto> {
  const errores: Errores<DatosProducto> = {};

  const codigo = datos.codigo.trim();
  if (codigo === "") errores.codigo = "El código del producto es obligatorio.";
  else if (codigo.length < 3) errores.codigo = "El código debe tener al menos 3 caracteres.";

  if (datos.categoria === "") errores.categoria = "Selecciona una categoría.";

  agregar(
    errores,
    "nombre",
    validarTexto(
      datos.nombre,
      "El nombre del producto es obligatorio.",
      100,
      "El nombre no puede superar 100 caracteres.",
    ),
  );

  // Descripción: opcional, máximo 500
  if (datos.descripcion.trim().length > 500) {
    errores.descripcion = "La descripción no puede superar 500 caracteres.";
  }

  // Precio: obligatorio, mínimo 0 (acepta decimales)
  if (datos.precio === "") errores.precio = "El precio es obligatorio.";
  else if (parseFloat(datos.precio) < 0) errores.precio = "El precio no puede ser negativo.";

  // Stock: obligatorio, entero >= 0
  if (datos.stock === "") errores.stock = "El stock es obligatorio.";
  else if (!esEnteroMayorOIgualACero(datos.stock)) {
    errores.stock = "El stock debe ser un número entero igual o mayor a 0.";
  }

  // Stock crítico: opcional, entero >= 0
  if (datos.stockCritico !== "" && !esEnteroMayorOIgualACero(datos.stockCritico)) {
    errores.stockCritico = "El stock crítico debe ser un número entero igual o mayor a 0.";
  }

  return errores;
}
