import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contacto from "../paginas/Contacto";

describe("página Contacto", () => {
  test("muestra el título y los campos", () => {
    render(<Contacto />);
    expect(screen.getByRole("heading", { name: "Contáctanos" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
    expect(screen.getByLabelText("Comentario")).toBeInTheDocument();
  });

  test("al enviar vacío muestra los mensajes de error", async () => {
    const usuario = userEvent.setup();
    render(<Contacto />);

    await usuario.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByText("El nombre es obligatorio.")).toBeInTheDocument();
    expect(screen.getByText("El correo es obligatorio.")).toBeInTheDocument();
    expect(screen.getByText("El comentario es obligatorio.")).toBeInTheDocument();
  });

  test("con datos válidos muestra el mensaje de éxito y limpia el formulario", async () => {
    const usuario = userEvent.setup();
    render(<Contacto />);

    await usuario.type(screen.getByLabelText("Nombre"), "Laura");
    await usuario.type(screen.getByLabelText("Correo"), "laura@duoc.cl");
    await usuario.type(screen.getByLabelText("Comentario"), "Hola, tienen stock?");
    await usuario.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByText("¡Mensaje enviado! Te responderemos pronto.")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
  });

  // Desafío de la clase: comprobar que Contacto conserva las clases responsivas de Bootstrap.
  test("conserva las clases responsivas col-12, col-md-8 y col-lg-6", () => {
    const { container } = render(<Contacto />);
    const columna = container.querySelector(".col-12.col-md-8.col-lg-6");
    expect(columna).not.toBeNull();
    expect(columna).toHaveClass("col-12", "col-md-8", "col-lg-6");
  });
});
