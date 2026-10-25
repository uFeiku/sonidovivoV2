import type { ChangeEvent } from "react";

interface TextAreaProps {
  id: string;
  nombre: string;
  valor: string;
  onChange: (evento: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  filas?: number;
  invalido?: boolean;
}

function TextArea({ id, nombre, valor, onChange, placeholder, maxLength, filas = 4, invalido = false }: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={nombre}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={filas}
      className={`form-control${invalido ? " is-invalid" : ""}`}
    />
  );
}

export default TextArea;
