import Boton from "../atomos/Boton";
import { formatearPrecio } from "../../utilidades/formato";

interface FilaCarritoProps {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
  onEliminar: (id: number) => void;
}

// Una fila (<tr>) de la tabla del carrito
function FilaCarrito({ id, nombre, imagen, precio, cantidad, onEliminar }: FilaCarritoProps) {
  return (
    <tr>
      <td>
        <img src={imagen} alt={nombre} style={{ width: "64px", height: "64px", objectFit: "contain", background: "#fff" }} />
      </td>
      <td>{nombre}</td>
      <td>{formatearPrecio(precio)}</td>
      <td>{cantidad}</td>
      <td>{formatearPrecio(precio * cantidad)}</td>
      <td>
        <Boton variante="danger" pequeno onClick={() => onEliminar(id)}>
          Eliminar
        </Boton>
      </td>
    </tr>
  );
}

export default FilaCarrito;
