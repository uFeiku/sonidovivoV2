import type { ChangeEvent } from "react";

export interface OpcionSelect {
  valor: string;
  etiqueta: string;
}

interface SelectProps {
  id: string;
  nombre: string;
  valor: string;
  onChange: (evento: ChangeEvent<HTMLSelectElement>) => void;
  opciones: OpcionSelect[];
  textoInicial: string; // texto de la primera opción vacía: "Seleccione..."
  invalido?: boolean;
  deshabilitado?: boolean;
}

function Select({ id, nombre, valor, onChange, opciones, textoInicial, invalido = false, deshabilitado = false }: SelectProps) {
  return (
    <select
      id={id}
      name={nombre}
      value={valor}
      onChange={onChange}
      disabled={deshabilitado}
      className={`form-select${invalido ? " is-invalid" : ""}`}
    >
      <option value="">{textoInicial}</option>
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.etiqueta}
        </option>
      ))}
    </select>
  );
}

export default Select;
