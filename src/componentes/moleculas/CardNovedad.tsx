import BotonLink from "../atomos/BotonLink";

interface CardNovedadProps {
  id: number;
  titulo: string;
  fecha: string;
  resumen: string;
  imagen: string;
}

function CardNovedad({ id, titulo, fecha, resumen, imagen }: CardNovedadProps) {
  return (
    <div className="card h-100">
      <img src={imagen} alt={titulo} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column">
        <p className="text-secondary small mb-1">{fecha}</p>
        <h3 className="card-title h5">{titulo}</h3>
        <p className="card-text">{resumen}</p>
        <div className="mt-auto">
          <BotonLink to={`/novedad/${id}`} variante="secondary" pequeno>
            Leer más
          </BotonLink>
        </div>
      </div>
    </div>
  );
}

export default CardNovedad;
