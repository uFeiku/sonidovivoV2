import { usuariosEjemplo } from "../../datos/usuarios";

function TablaUsuariosAdmin() {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Región</th>
            <th>Comuna</th>
          </tr>
        </thead>
        <tbody>
          {usuariosEjemplo.map((usuario) => (
            <tr key={usuario.run}>
              <td>{usuario.run}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.region}</td>
              <td>{usuario.comuna}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuariosAdmin;
