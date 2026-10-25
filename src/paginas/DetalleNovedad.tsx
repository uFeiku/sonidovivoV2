import { useParams } from "react-router-dom";
import BotonLink from "../componentes/atomos/BotonLink";
import { novedades } from "../datos/novedades";

function DetalleNovedad() {
  const { id } = useParams();
  const novedad = novedades.find((n) => n.id === Number(id));

  if (!novedad) {
    return (
      <div className="container py-4">
        <p>Novedad no encontrada.</p>
        <BotonLink to="/novedades" variante="secondary">
          Volver a novedades
        </BotonLink>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <img src={novedad.imagen} alt={novedad.titulo} className="img-fluid rounded mb-4 w-100" style={{ maxHeight: "360px", objectFit: "cover" }} />
      <p className="text-secondary small mb-1">{novedad.fecha}</p>
      <h2 className="mb-3">{novedad.titulo}</h2>
      {novedad.parrafos.map((parrafo, indice) => (
        <p key={indice}>{parrafo}</p>
      ))}
      <BotonLink to="/novedades" variante="secondary">
        Volver a novedades
      </BotonLink>
    </div>
  );
}

export default DetalleNovedad;
