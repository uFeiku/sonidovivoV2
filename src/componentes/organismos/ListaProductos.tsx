import CardProducto from "../moleculas/CardProducto";
import { useCarrito } from "../../contexto/CarritoContext";
import type { Producto } from "../../tipos";

interface ListaProductosProps {
  productos: Producto[];
}

// Organismo: una sección completa formada por muchas moléculas (CardProducto).
function ListaProductos({ productos }: ListaProductosProps) {
  const { agregar } = useCarrito();

  const manejarAgregar = (id: number) => {
    const producto = productos.find((p) => p.id === id);
    if (producto) agregar(producto);
  };

  return (
    // Bootstrap responsivo: 1 columna en celular, 2 en tablet, 3 en notebook y 4 en pantallas grandes
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <CardProducto
            id={producto.id}
            titulo={producto.nombre}
            categoria={producto.categoria}
            precio={producto.precio}
            imagen={producto.imagen}
            onAgregar={manejarAgregar}
          />
        </div>
      ))}
    </div>
  );
}

export default ListaProductos;
