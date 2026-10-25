import TablaUsuariosAdmin from "../componentes/organismos/TablaUsuariosAdmin";
import FormularioUsuario from "../componentes/organismos/FormularioUsuario";

function AdminUsuarios() {
  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de usuarios</h2>
      <TablaUsuariosAdmin />

      <h2 className="mt-5 mb-3">Crear / Editar usuario</h2>
      <FormularioUsuario tiposPermitidos={["Administrador", "Vendedor", "Cliente"]} textoBoton="Guardar usuario" mostrarLimpiar />
    </div>
  );
}

export default AdminUsuarios;
