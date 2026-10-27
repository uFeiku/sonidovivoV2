import { useRef, useState } from "react";
import TablaUsuariosAdmin from "../componentes/organismos/TablaUsuariosAdmin";
import FormularioUsuario from "../componentes/organismos/FormularioUsuario";
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  listarUsuarios,
  obtenerUsuario,
} from "../datos/repositorio";
import type { DatosUsuario } from "../utilidades/validaciones";
import type { TipoUsuario, UsuarioAdmin } from "../tipos";

function usuarioDesdeFormulario(datos: DatosUsuario): UsuarioAdmin {
  return {
    run: datos.run.trim(),
    nombre: datos.nombre.trim(),
    apellidos: datos.apellidos.trim(),
    correo: datos.correo.trim(),
    tipo: datos.tipo as TipoUsuario,
    region: datos.region,
    comuna: datos.comuna,
    fechaNacimiento: datos.fechaNacimiento,
    direccion: datos.direccion.trim(),
  };
}

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>(() => listarUsuarios());
  const [runEditando, setRunEditando] = useState<string | null>(null);
  const [claveFormulario, setClaveFormulario] = useState<string>("nuevo");
  const [versionFormulario, setVersionFormulario] = useState(0);
  const seccionFormulario = useRef<HTMLDivElement>(null);

  const usuarioEditando =
    runEditando === null ? null : usuarios.find((usuario) => usuario.run === runEditando) ?? null;

  const recargar = () => setUsuarios(listarUsuarios());

  const editar = (run: string) => {
    setRunEditando(run);
    setClaveFormulario(run);
    seccionFormulario.current?.scrollIntoView?.({ behavior: "smooth" });
  };

  const guardar = (datos: DatosUsuario): string | void => {
    const registro = usuarioDesdeFormulario(datos);

    if (runEditando === null) {
      const creado = crearUsuario(registro);
      if (!creado) return "Este RUN ya está registrado.";
      setRunEditando(creado.run);
    } else {
      actualizarUsuario(runEditando, {
        nombre: registro.nombre,
        apellidos: registro.apellidos,
        correo: registro.correo,
        tipo: registro.tipo,
        region: registro.region,
        comuna: registro.comuna,
        fechaNacimiento: registro.fechaNacimiento,
        direccion: registro.direccion,
      });
    }
    recargar();
  };

  const eliminar = (run: string) => {
    eliminarUsuario(run);
    if (runEditando === run) {
      setRunEditando(null);
      setClaveFormulario("nuevo");
      setVersionFormulario((version) => version + 1);
    }
    recargar();
  };

  const prepararNuevo = () => {
    setRunEditando(null);
    setClaveFormulario("nuevo");
  };

  const nombreTitulo = usuarioEditando
    ? [usuarioEditando.nombre, usuarioEditando.apellidos].filter(Boolean).join(" ")
    : "";

  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de usuarios</h2>
      <TablaUsuariosAdmin usuarios={usuarios} onEditar={editar} onEliminar={eliminar} />

      <div ref={seccionFormulario} className="mt-5">
        <h2 className="mb-3">{usuarioEditando ? `Editar usuario: ${nombreTitulo}` : "Crear usuario"}</h2>
        <FormularioUsuario
          key={`${claveFormulario}-${versionFormulario}`}
          tiposPermitidos={["Administrador", "Vendedor", "Cliente"]}
          textoBoton="Guardar usuario"
          mostrarLimpiar
          usuario={claveFormulario === "nuevo" ? null : obtenerUsuario(claveFormulario)}
          bloquearRun={runEditando !== null}
          onGuardar={guardar}
          onLimpiar={prepararNuevo}
        />
      </div>
    </div>
  );
}

export default AdminUsuarios;
