import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { VarianteBoton } from "../../tipos";

// Es un <Link> de React Router con aspecto de botón de Bootstrap.
// Usamos Link en vez de <a href> para navegar SIN recargar la página.
interface BotonLinkProps {
  to: string;
  variante?: VarianteBoton;
  pequeno?: boolean;
  children: ReactNode;
}

function BotonLink({ to, variante = "primary", pequeno = false, children }: BotonLinkProps) {
  const clases = `btn btn-${variante}${pequeno ? " btn-sm" : ""}`;

  return (
    <Link to={to} className={clases}>
      {children}
    </Link>
  );
}

export default BotonLink;
