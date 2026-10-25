interface MensajeErrorProps {
  id: string;
  mensaje?: string;
}

// Si no hay mensaje no dibuja nada (devuelve null).
function MensajeError({ id, mensaje }: MensajeErrorProps) {
  if (!mensaje) return null;

  return (
    <p id={id} className="text-danger small mt-1 mb-0">
      {mensaje}
    </p>
  );
}

export default MensajeError;
