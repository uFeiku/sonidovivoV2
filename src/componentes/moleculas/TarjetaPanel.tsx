import type { ReactNode } from "react";

// Tarjeta del panel de administración (título + texto + botón)
interface TarjetaPanelProps {
  titulo: string;
  descripcion: string;
  children: ReactNode; // aquí va el botón
}

function TarjetaPanel({ titulo, descripcion, children }: TarjetaPanelProps) {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{titulo}</h3>
        <p className="card-text">{descripcion}</p>
        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
}

export default TarjetaPanel;
