import type { ChangeEvent } from "react";
import Etiqueta from "../atomos/Etiqueta";
import Select, { type OpcionSelect } from "../atomos/Select";
import MensajeError from "../atomos/MensajeError";

interface CampoSelectProps {
  id: string;
  etiqueta: string;
  nombre: string;
  valor: string;
  onChange: (evento: ChangeEvent<HTMLSelectElement>) => void;
  opciones: OpcionSelect[];
  textoInicial: string;
  error?: string;
  deshabilitado?: boolean;
}

function CampoSelect({ id, etiqueta, nombre, valor, onChange, opciones, textoInicial, error, deshabilitado }: CampoSelectProps) {
  return (
    <div className="mb-3">
      <Etiqueta paraId={id} texto={etiqueta} />
      <Select
        id={id}
        nombre={nombre}
        valor={valor}
        onChange={onChange}
        opciones={opciones}
        textoInicial={textoInicial}
        invalido={Boolean(error)}
        deshabilitado={deshabilitado}
      />
      <MensajeError id={`error-${id}`} mensaje={error} />
    </div>
  );
}

export default CampoSelect;
