import type { UsuarioAdmin } from "../tipos";

// Usuarios de ejemplo para la tabla del panel de administración
export const usuariosEjemplo: UsuarioAdmin[] = [
  { run: "123456785", nombre: "Juan González", correo: "juan@correo.cl", tipo: "Administrador", region: "Región de Valparaíso", comuna: "Viña del Mar" },
  { run: "987654325", nombre: "Laura Díaz", correo: "laura@correo.cl", tipo: "Vendedor", region: "Región de Valparaíso", comuna: "Valparaíso" },
  { run: "112223339", nombre: "Pedro Rojas", correo: "pedro@correo.cl", tipo: "Cliente", region: "Región Metropolitana", comuna: "Santiago" },
];
