import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        {/* Clases responsivas de Bootstrap: 100% en celular, 8/12 en tablet y 6/12 en pantallas grandes */}
        <div className="col-12 col-md-8 col-lg-6">
          <h2>Contáctanos</h2>
          <p className="mb-4">¿Tienes dudas sobre un instrumento? Escríbenos y te respondemos.</p>
          <FormularioContacto />
        </div>
      </div>
    </div>
  );
}

export default Contacto;
