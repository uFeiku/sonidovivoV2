import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavbarAdmin() {
  const [abierto, setAbierto] = useState(false);
  const cerrarMenu = () => setAbierto(false);

  const enlaces = [
    { ruta: "/admin", texto: "Inicio", exacto: true },
    { ruta: "/admin/productos", texto: "Productos", exacto: false },
    { ruta: "/admin/usuarios", texto: "Usuarios", exacto: false },
    { ruta: "/", texto: "Volver al sitio", exacto: true },
  ];

  return (
    <nav className="navbar navbar-expand-lg barra-sonido barra-admin sticky-top" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand logo" to="/admin" onClick={cerrarMenu}>
          Sonido <span>Vivo</span> <span className="badge text-bg-danger ms-1">ADMIN</span>
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

export default NavbarAdmin;
