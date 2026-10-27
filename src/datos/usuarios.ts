import type { UsuarioAdmin } from "../tipos";

// Usuarios de ejemplo para la tabla del panel de administración
export const usuariosEjemplo: UsuarioAdmin[] = [
  { run: "123456785", nombre: "Juan", apellidos: "González", correo: "juan@gmail.com", tipo: "Administrador", region: "Región de Valparaíso", comuna: "Viña del Mar", direccion: "Calle 1" },
  { run: "987654325", nombre: "Laura", apellidos: "Díaz", correo: "laura@gmail.com", tipo: "Vendedor", region: "Región de Valparaíso", comuna: "Valparaíso", direccion: "Calle 2" },
  { run: "112223339", nombre: "Pedro", apellidos: "Rojas", correo: "pedro@gmail.com", tipo: "Cliente", region: "Región Metropolitana", comuna: "Santiago", direccion: "Calle 3" },
];
