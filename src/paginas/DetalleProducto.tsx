import { useParams } from "react-router-dom";
import BotonLink from "../componentes/atomos/BotonLink";
import BotonAgregar from "../componentes/moleculas/BotonAgregar";
import { useCarrito } from "../contexto/CarritoContext";
import { productos } from "../datos/productos";
import { formatearPrecio } from "../utilidades/formato";

function DetalleProducto() {
  // Ruta: /producto/:id  ->  useParams() lee ese ":id" (reemplaza URLSearchParams / ?id=)
  const { id } = useParams();
  const { agregar } = useCarrito();

  // Buscamos el producto que corresponde al id recibido en la URL
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <div className="container py-4">
        <p>Producto no encontrado.</p>
        <BotonLink to="/catalogo" variante="secondary">
          Volver al catálogo
        </BotonLink>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="bg-white rounded p-3 border">
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid d-block mx-auto" style={{ maxHeight: "420px", objectFit: "contain" }} />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <p className="categoria small text-uppercase mb-1">{producto.categoria}</p>
          <h2>{producto.nombre}</h2>
          <p>
            <strong>{producto.marca}</strong> · {producto.modelo}
          </p>
          <p className="precio display-6 fw-bold my-3">{formatearPrecio(producto.precio)}</p>
          <p>{producto.descripcion}</p>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <BotonAgregar texto="Agregar al carrito" onAgregar={() => agregar(producto)} />
            <BotonLink to="/catalogo" variante="secondary">
              Volver al catálogo
            </BotonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
