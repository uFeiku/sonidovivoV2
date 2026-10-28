import CardNovedad from "../moleculas/CardNovedad";
import { novedades } from "../../datos/novedades";

function ListaNovedades() {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {novedades.map((novedad) => (
        <div className="col" key={novedad.id}>
          <CardNovedad
            id={novedad.id}
            titulo={novedad.titulo}
            fecha={novedad.fecha}
            resumen={novedad.resumen}
            imagen={novedad.imagen}
          />
        </div>
      ))}
    </div>
  );
}

export default ListaNovedades;
