import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Boton from "../componentes/atomos/Boton";

describe("Boton (props y eventos)", () => {
  it("muestra la etiqueta recibida, aplica la variante y ejecuta onClick al hacer clic", async () => {
    const usuario = userEvent.setup();
    // jasmine.createSpy crea una función falsa (mock) que registra cuántas veces se llamó.
    const alHacerClic = jasmine.createSpy("alHacerClic");

    render(
      <Boton variante="danger" pequeno onClick={alHacerClic}>
        Eliminar
      </Boton>,
    );

    const boton = screen.getByRole("button", { name: "Eliminar" }); // la etiqueta llegó por children
    expect(boton).toHaveClass("btn", "btn-danger", "btn-sm"); // las props variante y pequeno cambian las clases
    expect(alHacerClic).not.toHaveBeenCalled(); // antes del clic, nadie la ha llamado

    await usuario.click(boton);

    expect(alHacerClic).toHaveBeenCalledTimes(1); // el evento llegó a la función recibida por props
  });
});
