import ListaProductos from "../componentes/organismos/ListaProductos";
import BotonLink from "../componentes/atomos/BotonLink";
import { productos } from "../datos/productos";
import type { Producto } from "../tipos";

// Un producto de distintos rubros para la portada
const CODIGOS_DESTACADOS = ["GA001", "GE001", "BT001", "TC002"];

function Inicio() {
  const destacados = CODIGOS_DESTACADOS.map((codigo) => productos.find((p) => p.codigo === codigo)).filter(
    (p): p is Producto => p !== undefined,
  );

  return (
    <>
      <section className="banner d-flex align-items-center justify-content-center text-center">
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Sonido Vivo</h1>
          <p className="lead mx-auto mb-4" style={{ maxWidth: "600px" }}>
            Tu tienda de instrumentos y equipos de audio en Viña del Mar. Más de 11 años acompañando a músicos de la
            región.
          </p>
          <BotonLink to="/catalogo">Ver catálogo</BotonLink>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-4">Productos destacados</h2>
        <ListaProductos productos={destacados} />
      </section>
    </>
  );
}

export default Inicio;
