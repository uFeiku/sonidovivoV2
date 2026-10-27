import Boton from "../atomos/Boton";
import type { UsuarioAdmin } from "../../tipos";

interface TablaUsuariosAdminProps {
  usuarios: UsuarioAdmin[];
  onEditar: (run: string) => void;
  onEliminar: (run: string) => void;
}

function nombreVisible(usuario: UsuarioAdmin): string {
  return [usuario.nombre, usuario.apellidos].filter(Boolean).join(" ");
}

function TablaUsuariosAdmin({ usuarios, onEditar, onEliminar }: TablaUsuariosAdminProps) {
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
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.run}>
              <td>{usuario.run}</td>
              <td>{nombreVisible(usuario)}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.region}</td>
              <td>{usuario.comuna}</td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  <Boton variante="secondary" pequeno onClick={() => onEditar(usuario.run)}>
                    Editar
                  </Boton>
                  <Boton variante="danger" pequeno onClick={() => onEliminar(usuario.run)}>
                    Eliminar
                  </Boton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuariosAdmin;
