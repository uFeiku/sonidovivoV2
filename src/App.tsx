import { Route, Routes } from "react-router-dom";
import LayoutPublico from "./componentes/plantillas/LayoutPublico";
import LayoutAdmin from "./componentes/plantillas/LayoutAdmin";
import ScrollArriba from "./componentes/plantillas/ScrollArriba";
import Inicio from "./paginas/Inicio";
import Catalogo from "./paginas/Catalogo";
import DetalleProducto from "./paginas/DetalleProducto";
import Carrito from "./paginas/Carrito";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Contacto from "./paginas/Contacto";
import Nosotros from "./paginas/Nosotros";
import Novedades from "./paginas/Novedades";
import DetalleNovedad from "./paginas/DetalleNovedad";
import NoEncontrada from "./paginas/NoEncontrada";
import AdminInicio from "./paginas/AdminInicio";
import AdminProductos from "./paginas/AdminProductos";
import AdminUsuarios from "./paginas/AdminUsuarios";

// Aquí se define el mapa de rutas de toda la aplicación (equivale a los 15 archivos .html).
function App() {
  return (
    <>
      <ScrollArriba />
      <Routes>
        {/* Sitio público: todas estas páginas se dibujan dentro de LayoutPublico (Navbar + Footer) */}
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          {/* Ruta dinámica: ":id" cambia según el producto (/producto/3, /producto/12...) */}
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/novedad/:id" element={<DetalleNovedad />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>

        {/* Panel de administración, con su propio Navbar */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminInicio />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
