/** Formatea un número como precio chileno: 189990 -> "$189.990" */
export function formatearPrecio(numero: number): string {
  return "$" + numero.toLocaleString("es-CL");
}
