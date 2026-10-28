import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { VarianteBoton } from "../../tipos";

// Props: los datos que este átomo puede recibir. Extendemos los atributos
// normales de <button> (onClick, disabled, type...) y agregamos los nuestros.
interface BotonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variante?: VarianteBoton;
  pequeno?: boolean;
  children: ReactNode;
}

function Boton({ variante = "primary", pequeno = false, type = "button", children, ...resto }: BotonProps) {
  const clases = `btn btn-${variante}${pequeno ? " btn-sm" : ""}`;

  return (
    <button type={type} className={clases} {...resto}>
      {children}
    </button>
  );
}

export default Boton;
