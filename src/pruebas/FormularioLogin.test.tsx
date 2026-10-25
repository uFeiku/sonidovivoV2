import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

describe("FormularioLogin", () => {
  test("valida correo y contraseña obligatorios", async () => {
    const usuario = userEvent.setup();
    render(<FormularioLogin />);

    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(screen.getByText("El correo es obligatorio.")).toBeInTheDocument();
    expect(screen.getByText("La contraseña es obligatoria.")).toBeInTheDocument();
  });

  test("rechaza un correo con dominio no permitido", async () => {
    const usuario = userEvent.setup();
    render(<FormularioLogin />);

    await usuario.type(screen.getByLabelText("Correo"), "laura@hotmail.com");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(
      screen.getByText("Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com."),
    ).toBeInTheDocument();
  });

  test("con datos correctos muestra el mensaje de bienvenida", async () => {
    const usuario = userEvent.setup();
    render(<FormularioLogin />);

    await usuario.type(screen.getByLabelText("Correo"), "laura@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(screen.getByText("Inicio de sesión simulado exitoso. ¡Bienvenido/a!")).toBeInTheDocument();
  });
});
