import { useState, type ChangeEvent, type FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import Boton from "../atomos/Boton";
import { validarLogin, hayErrores, type DatosLogin, type Errores } from "../../utilidades/validaciones";

function FormularioLogin() {
  // useState guarda lo que el usuario escribe. Cada vez que cambia, React vuelve a dibujar el formulario.
  const [datos, setDatos] = useState<DatosLogin>({ correo: "", clave: "" });
  const [errores, setErrores] = useState<Errores<DatosLogin>>({});
  const [exito, setExito] = useState(false);

  // Un solo manejador para todos los campos: usa el atributo name del input ("correo" o "clave").
  const manejarCambio = (evento: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
    setExito(false);
  };

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault(); // equivale al preventDefault() de la versión HTML
    const nuevosErrores = validarLogin(datos);
    setErrores(nuevosErrores);
    setExito(!hayErrores(nuevosErrores));
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {exito && (
        <div className="alert alert-success" role="alert">
          Inicio de sesión simulado exitoso. ¡Bienvenido/a!
        </div>
      )}

      <CampoFormulario
        id="login-correo"
        etiqueta="Correo"
        nombre="correo"
        tipo="email"
        valor={datos.correo}
        onChange={manejarCambio}
        error={errores.correo}
        placeholder="tu@correo.cl"
        maxLength={100}
      />

      <CampoFormulario
        id="login-clave"
        etiqueta="Contraseña"
        nombre="clave"
        tipo="password"
        valor={datos.clave}
        onChange={manejarCambio}
        error={errores.clave}
        placeholder="4 a 10 caracteres"
        maxLength={10}
      />

      <Boton type="submit">Ingresar</Boton>
    </form>
  );
}

export default FormularioLogin;
