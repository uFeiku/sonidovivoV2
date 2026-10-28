import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="pie-pagina mt-auto pt-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h4 className="h6 text-uppercase">Sonido Vivo</h4>
            <p className="mb-0">Instrumentos musicales y audio profesional en Viña del Mar.</p>
          </div>

          <div className="col-12 col-md-4">
            <h4 className="h6 text-uppercase">Contacto</h4>
            <p className="mb-1">Av. Libertad 1234, Viña del Mar</p>
            <p className="mb-1">Tel: +56 32 123 4567</p>
            <p className="mb-0">contacto@sonidovivo.cl</p>
          </div>

          <div className="col-12 col-md-4">
            <h4 className="h6 text-uppercase">Enlaces</h4>
            <p className="mb-1">
              <Link to="/nosotros">Sobre nosotros</Link>
            </p>
            <p className="mb-1">
              <Link to="/contacto">Contáctanos</Link>
            </p>
            <p className="mb-0">
              <Link to="/admin">Administración</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-secondary small border-top mt-4 py-3 mb-0">
          © 2026 Sonido Vivo - Viña del Mar. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
