import { Link } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

function Login() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2>Iniciar sesión</h2>
          <p className="mb-4">Ingresa con tu correo y contraseña.</p>
          <FormularioLogin />
          <p className="mt-3">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
