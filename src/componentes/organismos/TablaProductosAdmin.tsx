import Boton from "../atomos/Boton";
import { formatearPrecio } from "../../utilidades/formato";
import type { Producto } from "../../tipos";

interface TablaProductosAdminProps {
  productos: Producto[];
  onEditar: (id: number) => void;
}

function TablaProductosAdmin({ productos, onEditar }: TablaProductosAdminProps) {
  return (
    <div className="table-responsive tabla-scroll">
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.codigo}</td>
              <td>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ width: "48px", height: "48px", objectFit: "contain", background: "#fff" }}
                />
              </td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{formatearPrecio(producto.precio)}</td>
              <td>{producto.stock}</td>
              <td>
                <Boton variante="secondary" pequeno onClick={() => onEditar(producto.id)}>
                  Editar
                </Boton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductosAdmin;
