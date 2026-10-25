import BotonLink from "../atomos/BotonLink";
import BotonAgregar from "./BotonAgregar";
import { formatearPrecio } from "../../utilidades/formato";

// Una sola Card sirve para TODOS los productos: los datos llegan por Props.
interface CardProductoProps {
  id: number;
  titulo: string;
  categoria: string;
  precio: number;
  imagen: string;
  onAgregar: (id: number) => void;
}

function CardProducto({ id, titulo, categoria, precio, imagen, onAgregar }: CardProductoProps) {
  return (
    <div className="card tarjeta-producto h-100">
      <div className="bg-white p-2">
        <img src={imagen} alt={titulo} className="card-img-top" style={{ height: "180px", objectFit: "contain" }} />
      </div>

      <div className="card-body d-flex flex-column">
        <p className="categoria small text-uppercase mb-1">{categoria}</p>
        <h3 className="card-title h6">{titulo}</h3>
        <p className="precio fw-bold fs-5">{formatearPrecio(precio)}</p>

        {/* mt-auto empuja los botones hacia abajo para que todas las cards queden alineadas */}
        <div className="mt-auto d-flex flex-wrap gap-2">
          <BotonLink to={`/producto/${id}`} variante="secondary" pequeno>
            Ver detalle
          </BotonLink>
          <BotonAgregar pequeno onAgregar={() => onAgregar(id)} />
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
