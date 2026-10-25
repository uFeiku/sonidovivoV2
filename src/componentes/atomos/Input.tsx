import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  nombre: string;
  tipo?: string;
  valor: string;
  onChange: (evento: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  invalido?: boolean;
  min?: number;
  step?: number | string;
}

function Input({ id, nombre, tipo = "text", valor, onChange, placeholder, maxLength, invalido = false, min, step }: InputProps) {
  return (
    <input
      id={id}
      name={nombre}
      type={tipo}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      min={min}
      step={step}
      className={`form-control${invalido ? " is-invalid" : ""}`}
    />
  );
}

export default Input;
