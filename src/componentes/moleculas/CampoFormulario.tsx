import type { ChangeEvent } from "react";
import Etiqueta from "../atomos/Etiqueta";
import Input from "../atomos/Input";
import MensajeError from "../atomos/MensajeError";

// Molécula = Etiqueta + Input + MensajeError trabajando juntos.
interface CampoFormularioProps {
  id: string;
  etiqueta: string;
  nombre: string;
  tipo?: string;
  valor: string;
  onChange: (evento: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  step?: number | string;
}

function CampoFormulario({ id, etiqueta, nombre, tipo, valor, onChange, error, placeholder, maxLength, min, step }: CampoFormularioProps) {
  return (
    <div className="mb-3">
      <Etiqueta paraId={id} texto={etiqueta} />
      <Input
        id={id}
        nombre={nombre}
        tipo={tipo}
        valor={valor}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        step={step}
        invalido={Boolean(error)}
      />
      <MensajeError id={`error-${id}`} mensaje={error} />
    </div>
  );
}

export default CampoFormulario;
