import TarjetaPanel from "../componentes/moleculas/TarjetaPanel";
import BotonLink from "../componentes/atomos/BotonLink";

function AdminInicio() {
  return (
    <div className="container py-4">
      <h2>Panel de administración</h2>
      <p className="mb-4">Bienvenido/a al área de gestión de Sonido Vivo.</p>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <TarjetaPanel titulo="Productos" descripcion="Ver, agregar y editar el catálogo de instrumentos.">
            <BotonLink to="/admin/productos" pequeno>
              Gestionar productos
            </BotonLink>
          </TarjetaPanel>
        </div>
        <div className="col">
          <TarjetaPanel titulo="Usuarios" descripcion="Administrar clientes, vendedores y administradores.">
            <BotonLink to="/admin/usuarios" pequeno>
              Gestionar usuarios
            </BotonLink>
          </TarjetaPanel>
        </div>
        <div className="col">
          <TarjetaPanel titulo="Sitio público" descripcion="Volver a la tienda visible para los clientes.">
            <BotonLink to="/" variante="secondary" pequeno>
              Ir al sitio
            </BotonLink>
          </TarjetaPanel>
        </div>
      </div>
    </div>
  );
}

export default AdminInicio;
