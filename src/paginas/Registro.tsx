import { Link } from "react-router-dom";
import FormularioUsuario from "../componentes/organismos/FormularioUsuario";

function Registro() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h2>Registro de cliente</h2>
          <p className="mb-4">Crea tu cuenta para comprar en Sonido Vivo.</p>
          {/* En el registro público solo se puede crear un Cliente */}
          <FormularioUsuario tiposPermitidos={["Cliente"]} tipoInicial="Cliente" textoBoton="Registrarme" />
          <p className="mt-3">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
