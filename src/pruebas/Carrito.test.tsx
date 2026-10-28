import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider, CLAVE_CARRITO } from "../contexto/CarritoContext";
import Catalogo from "../paginas/Catalogo";
import Carrito from "../paginas/Carrito";
import Navbar from "../componentes/organismos/Navbar";

// MemoryRouter simula el router sin necesitar un navegador real.
function renderizarTienda() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Navbar />
        <Catalogo />
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("carrito de compras", () => {
  beforeEach(() => {
    localStorage.clear(); // cada prueba parte con el carrito vacío
  });

  it("agregar un producto actualiza el contador y la tabla", async () => {
    const usuario = userEvent.setup();
    renderizarTienda();

    await usuario.click(screen.getAllByRole("button", { name: "Agregar" })[0]);

    expect(screen.getByRole("link", { name: "Carrito (1)" })).toBeInTheDocument();
    expect(screen.queryByText("Tu carrito está vacío.")).not.toBeInTheDocument();
  });

  it("agregar el mismo producto dos veces suma la cantidad (no duplica la fila)", async () => {
    const usuario = userEvent.setup();
    renderizarTienda();

    const botones = screen.getAllByRole("button", { name: "Agregar" });
    await usuario.click(botones[0]);
    // El botón cambia a "¡Agregado!" un instante; volvemos a buscar el primero del catálogo.
    await usuario.click(screen.getAllByRole("button", { name: /Agregar|¡Agregado!/ })[0]);

    expect(screen.getByRole("link", { name: "Carrito (2)" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Eliminar" })).toHaveSize(1);
  });

  it("eliminar vuelve a dejar el carrito vacío y se guarda en localStorage", async () => {
    const usuario = userEvent.setup();
    renderizarTienda();

    await usuario.click(screen.getAllByRole("button", { name: "Agregar" })[0]);
    expect(JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? "[]")).toHaveSize(1);

    await usuario.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? "[]")).toHaveSize(0);
  });

});
