import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { CarritoProvider } from "./contexto/CarritoContext";

// Orden importante: el Router envuelve todo (para poder usar rutas)
// y el CarritoProvider también (para que cualquier componente pueda usar el carrito).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>,
);
