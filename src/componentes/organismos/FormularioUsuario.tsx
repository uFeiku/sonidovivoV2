import { useState, type ChangeEvent, type FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import Boton from "../atomos/Boton";
import { regionesChile } from "../../datos/regiones";
import { validarUsuario, hayErrores, type DatosUsuario, type Errores } from "../../utilidades/validaciones";
import type { TipoUsuario } from "../../tipos";

// Este mismo organismo sirve para el Registro (solo "Cliente") y para el panel Admin (los 3 tipos).
interface FormularioUsuarioProps {
  tiposPermitidos: TipoUsuario[];
  tipoInicial?: TipoUsuario;
  textoBoton: string;
  mostrarLimpiar?: boolean;
}

function FormularioUsuario({ tiposPermitidos, tipoInicial, textoBoton, mostrarLimpiar = false }: FormularioUsuarioProps) {
  const datosIniciales: DatosUsuario = {
    run: "",
    tipo: tipoInicial ?? "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    region: "",
    comuna: "",
    direccion: "",
  };

  const [datos, setDatos] = useState<DatosUsuario>(datosIniciales);
  const [errores, setErrores] = useState<Errores<DatosUsuario>>({});
  const [exito, setExito] = useState(false);

  // Las comunas dependen de la región elegida (reemplaza el listener "change" de inicializarRegiones()).
  const comunas = regionesChile.find((r) => r.nombre === datos.region)?.comunas ?? [];

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = evento.target;
    setExito(false);

    if (name === "region") {
      // Al cambiar de región, la comuna anterior ya no es válida: la vaciamos.
      setDatos({ ...datos, region: value, comuna: "" });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevosErrores = validarUsuario(datos);
    setErrores(nuevosErrores);
    setExito(!hayErrores(nuevosErrores));
  };

  const limpiar = () => {
    setDatos(datosIniciales);
    setErrores({});
    setExito(false);
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {exito && (
        <div className="alert alert-success" role="alert">
          Usuario guardado correctamente (simulación).
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            id="run"
            etiqueta="RUN (sin puntos ni guión)"
            nombre="run"
            valor={datos.run}
            onChange={manejarCambio}
            error={errores.run}
            placeholder="Ej: 123456785"
            maxLength={10}
          />
        </div>
        <div className="col-md-6">
          <CampoSelect
            id="tipo-usuario"
            etiqueta="Tipo de usuario"
            nombre="tipo"
            valor={datos.tipo}
            onChange={manejarCambio}
            opciones={tiposPermitidos.map((tipo) => ({ valor: tipo, etiqueta: tipo }))}
            textoInicial="Seleccione..."
            error={errores.tipo}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            id="nombre"
            etiqueta="Nombre"
            nombre="nombre"
            valor={datos.nombre}
            onChange={manejarCambio}
            error={errores.nombre}
            placeholder="Tu nombre"
            maxLength={50}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            id="apellidos"
            etiqueta="Apellidos"
            nombre="apellidos"
            valor={datos.apellidos}
            onChange={manejarCambio}
            error={errores.apellidos}
            placeholder="Tus apellidos"
            maxLength={100}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            id="correo"
            etiqueta="Correo"
            nombre="correo"
            tipo="email"
            valor={datos.correo}
            onChange={manejarCambio}
            error={errores.correo}
            placeholder="tu@correo.cl"
            maxLength={100}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            id="fecha-nacimiento"
            etiqueta="Fecha de nacimiento (opcional)"
            nombre="fechaNacimiento"
            tipo="date"
            valor={datos.fechaNacimiento}
            onChange={manejarCambio}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoSelect
            id="region"
            etiqueta="Región"
            nombre="region"
            valor={datos.region}
            onChange={manejarCambio}
            opciones={regionesChile.map((r) => ({ valor: r.nombre, etiqueta: r.nombre }))}
            textoInicial="Seleccione una región"
            error={errores.region}
          />
        </div>
        <div className="col-md-6">
          <CampoSelect
            id="comuna"
            etiqueta="Comuna"
            nombre="comuna"
            valor={datos.comuna}
            onChange={manejarCambio}
            opciones={comunas.map((c) => ({ valor: c, etiqueta: c }))}
            textoInicial="Seleccione una comuna"
            error={errores.comuna}
          />
        </div>
      </div>

      <CampoFormulario
        id="direccion"
        etiqueta="Dirección"
        nombre="direccion"
        valor={datos.direccion}
        onChange={manejarCambio}
        error={errores.direccion}
        placeholder="Calle, número, depto..."
        maxLength={300}
      />

      <div className="d-flex gap-2">
        <Boton type="submit">{textoBoton}</Boton>
        {mostrarLimpiar && (
          <Boton variante="secondary" onClick={limpiar}>
            Limpiar
          </Boton>
        )}
      </div>
    </form>
  );
}

export default FormularioUsuario;
