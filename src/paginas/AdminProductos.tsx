import { useRef, useState } from "react";
import TablaProductosAdmin from "../componentes/organismos/TablaProductosAdmin";
import FormularioProducto from "../componentes/organismos/FormularioProducto";
import { productos } from "../datos/productos";
import type { Producto } from "../tipos";

function AdminProductos() {
  // Producto que se está editando (null = formulario para uno nuevo)
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const seccionFormulario = useRef<HTMLDivElement>(null);

  const editar = (id: number) => {
    const producto = productos.find((p) => p.id === id) ?? null;
    setProductoEditando(producto);
    // Reemplaza el scrollIntoView() de editarProductoSimulado()
    seccionFormulario.current?.scrollIntoView?.({ behavior: "smooth" });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de productos</h2>
      <TablaProductosAdmin productos={productos} onEditar={editar} />

      <div ref={seccionFormulario} className="mt-5">
        <h2 className="mb-3">{productoEditando ? `Editar producto: ${productoEditando.nombre}` : "Agregar producto"}</h2>
        {/* La "key" cambia al elegir otro producto: React crea el formulario de nuevo con sus datos */}
        <FormularioProducto key={productoEditando ? productoEditando.id : "nuevo"} producto={productoEditando} />
      </div>
    </div>
  );
}

export default AdminProductos;
