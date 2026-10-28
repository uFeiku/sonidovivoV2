import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCarrito } from "../../contexto/CarritoContext";

function Navbar() {
  // Reemplaza inicializarMenuMovil(): el estado "abierto" decide si el menú móvil se ve.
  const [abierto, setAbierto] = useState(false);
  const { totalItems } = useCarrito();

  const cerrarMenu = () => setAbierto(false);

  const enlaces = [
    { ruta: "/", texto: "Inicio", exacto: true },
    { ruta: "/catalogo", texto: "Catálogo", exacto: false },
    { ruta: "/novedades", texto: "Novedades", exacto: false },
    { ruta: "/nosotros", texto: "Nosotros", exacto: false },
    { ruta: "/contacto", texto: "Contacto", exacto: false },
    { ruta: "/carrito", texto: `Carrito (${totalItems})`, exacto: false },
    { ruta: "/login", texto: "Ingresar", exacto: false },
  ];

  return (
    <nav className="navbar navbar-expand-lg barra-sonido sticky-top" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand logo" to="/" onClick={cerrarMenu}>
          Sonido <span>Vivo</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${abierto ? " show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {enlaces.map((enlace) => (
              <li className="nav-item" key={enlace.ruta}>
                {/* NavLink = Link que además sabe si es la página activa */}
                <NavLink
                  to={enlace.ruta}
                  end={enlace.exacto}
                  onClick={cerrarMenu}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                >
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
