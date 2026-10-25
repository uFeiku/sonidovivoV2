import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página (ruta), sube al inicio. En HTML tradicional esto pasaba solo al recargar.
function ScrollArriba() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollArriba;
