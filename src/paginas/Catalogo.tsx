import ListaProductos from "../componentes/organismos/ListaProductos";
import { productos } from "../datos/productos";

function Catalogo() {
  return (
    <div className="container py-4">
      <h2>Catálogo de productos</h2>
      <p className="mb-4">Explora nuestras guitarras, baterías, teclados y más.</p>
      <ListaProductos productos={productos} />
    </div>
  );
}

export default Catalogo;
