import { Outlet } from "react-router-dom";
import Navbar from "../organismos/Navbar";
import Footer from "../organismos/Footer";

// Plantilla (template): el "esqueleto" que comparten todas las páginas públicas.
// <Outlet /> es el hueco donde React Router dibuja la página que corresponda a la URL.
function LayoutPublico() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutPublico;
