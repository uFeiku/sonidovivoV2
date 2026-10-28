import { useEffect, useState } from "react";
import Boton from "../atomos/Boton";

// Botón "Agregar" que, al hacer clic, cambia unos segundos a "¡Agregado!".
// Reemplaza el alert() de la versión HTML con feedback dentro de la propia página.
interface BotonAgregarProps {
  onAgregar: () => void;
  texto?: string;
  pequeno?: boolean;
}

function BotonAgregar({ onAgregar, texto = "Agregar", pequeno = false }: BotonAgregarProps) {
  const [agregado, setAgregado] = useState(false);

  // Cuando "agregado" pasa a true, programamos volver a false en 1.5 segundos.
  useEffect(() => {
    if (!agregado) return;
    const temporizador = setTimeout(() => setAgregado(false), 1500);
    return () => clearTimeout(temporizador); // limpieza si el componente se desmonta
  }, [agregado]);

  const manejarClick = () => {
    onAgregar();
    setAgregado(true);
  };

  return (
    <Boton variante={agregado ? "success" : "primary"} pequeno={pequeno} onClick={manejarClick}>
      {agregado ? "¡Agregado!" : texto}
    </Boton>
  );
}

export default BotonAgregar;
