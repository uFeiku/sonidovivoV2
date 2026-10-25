interface MiembroEquipoProps {
  iniciales: string;
  nombre: string;
  rol: string;
}

function MiembroEquipo({ iniciales, nombre, rol }: MiembroEquipoProps) {
  return (
    <div className="card text-center h-100">
      <div className="card-body">
        <div className="avatar mx-auto mb-3">{iniciales}</div>
        <h3 className="h5">{nombre}</h3>
        <p className="text-secondary mb-0">{rol}</p>
      </div>
    </div>
  );
}

export default MiembroEquipo;
