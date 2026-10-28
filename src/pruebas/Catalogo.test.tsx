import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../contexto/CarritoContext";
import Catalogo from "../paginas/Catalogo";
import { productos } from "../datos/productos";

// El catálogo usa enlaces y el botón de agregar, que pide el carrito.
function renderizarCatalogo() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Catalogo />
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("filtro del catálogo", () => {
  it("un texto deja solo algunos productos y vaciarlo los muestra todos", async () => {
    const usuario = userEvent.setup();
    renderizarCatalogo();

    const coincidencias = productos.filter((producto) => producto.nombre.toLowerCase().includes("guitarra"));
    await usuario.type(screen.getByLabelText("Nombre"), "guitarra");

    expect(screen.getAllByRole("button", { name: "Agregar" })).toHaveSize(coincidencias.length);
    expect(coincidencias.length).toBeGreaterThan(1);
    expect(coincidencias.length).toBeLessThan(productos.length);
    expect(screen.queryByRole("heading", { name: "Batería Acústica 5 piezas" })).not.toBeInTheDocument();

    await usuario.clear(screen.getByLabelText("Nombre"));

    expect(screen.getAllByRole("button", { name: "Agregar" })).toHaveSize(productos.length);
  });
});
