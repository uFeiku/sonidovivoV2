import FilaCarrito from "../moleculas/FilaCarrito";
import BotonLink from "../atomos/BotonLink";
import { useCarrito } from "../../contexto/CarritoContext";
import { formatearPrecio } from "../../utilidades/formato";

function TablaCarrito() {
  const { items, total, eliminar } = useCarrito();

  // Carrito vacío: mostramos un mensaje en vez de la tabla
  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="fs-5">Tu carrito está vacío.</p>
        <BotonLink to="/catalogo">Ir al catálogo</BotonLink>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <FilaCarrito
                key={item.id}
                id={item.id}
                nombre={item.nombre}
                imagen={item.imagen}
                precio={item.precio}
                cantidad={item.cantidad}
                onEliminar={eliminar}
              />
            ))}
          </tbody>
        </table>
      </div>

      <p className="total-carrito fs-4 fw-bold text-end">Total: {formatearPrecio(total)}</p>
      <BotonLink to="/catalogo" variante="secondary">
        Seguir comprando
      </BotonLink>
    </>
  );
}

export default TablaCarrito;
