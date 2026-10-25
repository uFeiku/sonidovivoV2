// Aquí definimos la "forma" de los datos con TypeScript.
// Si un objeto no cumple con estas interfaces, el editor nos avisa ANTES de ejecutar.

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  precio: number;
  categoria: string;
  stock: number;
  stockCritico: number;
  imagen: string;
  descripcion: string;
}

/** Lo que guardamos de cada producto dentro del carrito */
export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

export interface Novedad {
  id: number;
  titulo: string;
  fecha: string;
  imagen: string;
  resumen: string;
  parrafos: string[];
}

export interface Region {
  nombre: string;
  comunas: string[];
}

export type TipoUsuario = "Administrador" | "Vendedor" | "Cliente";

export interface UsuarioAdmin {
  run: string;
  nombre: string;
  correo: string;
  tipo: TipoUsuario;
  region: string;
  comuna: string;
}

/** Variantes de color de Bootstrap que usan nuestros botones */
export type VarianteBoton = "primary" | "secondary" | "danger" | "success";
