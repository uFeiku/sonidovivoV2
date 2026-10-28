import { render, screen } from "@testing-library/react";
import MensajeError from "../componentes/atomos/MensajeError";

describe("MensajeError (renderizado condicional)", () => {
  it("solo se dibuja cuando hay un mensaje de error", () => {
    // Sin mensaje: el componente devuelve null y no aparece nada en pantalla.
    const { rerender } = render(<MensajeError id="error-correo" />);
    expect(screen.queryByText("El correo es obligatorio.")).not.toBeInTheDocument();
    expect(document.getElementById("error-correo")).toBeNull();

    // Con mensaje: aparece el texto y con el id recibido por props.
    rerender(<MensajeError id="error-correo" mensaje="El correo es obligatorio." />);
    expect(screen.getByText("El correo es obligatorio.")).toBeInTheDocument();
    expect(document.getElementById("error-correo")).toHaveClass("text-danger");

    // Si el mensaje vuelve a quedar vacío, desaparece de nuevo.
    rerender(<MensajeError id="error-correo" mensaje="" />);
    expect(screen.queryByText("El correo es obligatorio.")).not.toBeInTheDocument();
  });
});
