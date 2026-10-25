import type { ChangeEvent } from "react";
import Etiqueta from "../atomos/Etiqueta";
import TextArea from "../atomos/TextArea";
import MensajeError from "../atomos/MensajeError";

interface CampoTextAreaProps {
  id: string;
  etiqueta: string;
  nombre: string;
  valor: string;
  onChange: (evento: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
}

function CampoTextArea({ id, etiqueta, nombre, valor, onChange, error, placeholder, maxLength }: CampoTextAreaProps) {
  return (
    <div className="mb-3">
      <Etiqueta paraId={id} texto={etiqueta} />
      <TextArea
        id={id}
        nombre={nombre}
        valor={valor}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        invalido={Boolean(error)}
      />
      <MensajeError id={`error-${id}`} mensaje={error} />
    </div>
  );
}

export default CampoTextArea;
