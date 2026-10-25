import BotonLink from "../componentes/atomos/BotonLink";

function NoEncontrada() {
  return (
    <div className="container py-5 text-center">
      <h2>404 - Página no encontrada</h2>
      <p className="mb-4">La dirección que buscas no existe.</p>
      <BotonLink to="/">Volver al inicio</BotonLink>
    </div>
  );
}

export default NoEncontrada;
