import { useRef, useState } from "react";
import TablaProductosAdmin from "../componentes/organismos/TablaProductosAdmin";
import FormularioProducto from "../componentes/organismos/FormularioProducto";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProducto,
} from "../datos/repositorio";
import type { DatosProducto } from "../utilidades/validaciones";
import type { Producto } from "../tipos";

// Arma el producto que entiende el repositorio. Marca y modelo no están en el formulario:
// si estamos editando, se conservan; si es nuevo, quedan vacíos.
function productoDesdeFormulario(datos: DatosProducto, anterior: Producto | null): Omit<Producto, "id"> {
  return {
    codigo: datos.codigo.trim(),
    categoria: datos.categoria,
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion.trim(),
    precio: Number(datos.precio),
    imagen: datos.imagen.trim(),
    stock: Number(datos.stock),
    stockCritico: datos.stockCritico.trim() === "" ? 0 : Number(datos.stockCritico),
    marca: anterior?.marca ?? "",
    modelo: anterior?.modelo ?? "",
  };
}

function AdminProductos() {
  // La tabla lee el repositorio, no el arreglo fijo de productos.ts.
  const [productosAdmin, setProductosAdmin] = useState<Producto[]>(() => listarProductos());
  const [idEditando, setIdEditando] = useState<number | null>(null);
  // La key del formulario solo cambia al elegir Editar, Limpiar o al borrar el que se está editando.
  // Al guardar no cambia: el mensaje de éxito sigue y el próximo Guardar actualiza el mismo id.
  const [claveFormulario, setClaveFormulario] = useState<number | "nuevo">("nuevo");
  const [versionFormulario, setVersionFormulario] = useState(0);
  const seccionFormulario = useRef<HTMLDivElement>(null);

  const productoEditando =
    idEditando === null ? null : productosAdmin.find((producto) => producto.id === idEditando) ?? null;

  const recargar = () => setProductosAdmin(listarProductos());

  const editar = (id: number) => {
    setIdEditando(id);
    setClaveFormulario(id);
    seccionFormulario.current?.scrollIntoView?.({ behavior: "smooth" });
  };

  const guardar = (datos: DatosProducto) => {
    const anterior = idEditando === null ? null : obtenerProducto(idEditando) ?? null;
    const campos = productoDesdeFormulario(datos, anterior);

    if (idEditando === null) {
      const nuevo = crearProducto(campos);
      setIdEditando(nuevo.id);
    } else {
      actualizarProducto(idEditando, campos);
    }
    recargar();
  };

  const eliminar = (id: number) => {
    eliminarProducto(id);
    if (idEditando === id) {
      setIdEditando(null);
      setClaveFormulario("nuevo");
      // Si la key ya era "nuevo" (se acababa de crear), igual hay que montar el formulario vacío.
      setVersionFormulario((version) => version + 1);
    }
    recargar();
  };

  const prepararNuevo = () => {
    setIdEditando(null);
    setClaveFormulario("nuevo");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de productos</h2>
      <TablaProductosAdmin productos={productosAdmin} onEditar={editar} onEliminar={eliminar} />

      <div ref={seccionFormulario} className="mt-5">
        <h2 className="mb-3">
          {productoEditando ? `Editar producto: ${productoEditando.nombre}` : "Agregar producto"}
        </h2>
        <FormularioProducto
          key={`${claveFormulario}-${versionFormulario}`}
          producto={typeof claveFormulario === "number" ? obtenerProducto(claveFormulario) : null}
          onGuardar={guardar}
          onLimpiar={prepararNuevo}
        />
      </div>
    </div>
  );
}

export default AdminProductos;
