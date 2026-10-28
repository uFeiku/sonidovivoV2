import { useState, type ChangeEvent } from "react";
import ListaProductos from "../componentes/organismos/ListaProductos";
import FiltroCatalogo from "../componentes/moleculas/FiltroCatalogo";
import { categorias, productos } from "../datos/productos";

function Catalogo() {
  // Texto y categoría son campos controlados: cada cambio vuelve a armar la lista.
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");

  const texto = nombre.trim().toLowerCase();
  const visibles = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "" || producto.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });

  const cambiarNombre = (evento: ChangeEvent<HTMLInputElement>) => {
    setNombre(evento.target.value);
  };

  const cambiarCategoria = (evento: ChangeEvent<HTMLSelectElement>) => {
    setCategoria(evento.target.value);
  };

  return (
    <div className="container py-4">
      <h2>Catálogo de productos</h2>
      <p className="mb-4">Explora nuestras guitarras, baterías, teclados y más.</p>
      <FiltroCatalogo
        nombre={nombre}
        categoria={categoria}
        categorias={categorias}
        onNombre={cambiarNombre}
        onCategoria={cambiarCategoria}
      />
      {visibles.length === 0 ? (
        <p>No hay productos que coincidan con la búsqueda.</p>
      ) : (
        <ListaProductos productos={visibles} />
      )}
    </div>
  );
}

export default Catalogo;
