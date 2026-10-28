import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

describe("FormularioLogin", () => {
  it("valida correo y contraseña obligatorios", async () => {
    const usuario = userEvent.setup();
    render(<FormularioLogin />);

    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(screen.getByText("El correo es obligatorio.")).toBeInTheDocument();
    expect(screen.getByText("La contraseña es obligatoria.")).toBeInTheDocument();
  });

  it("con datos correctos muestra el mensaje de bienvenida", async () => {
    const usuario = userEvent.setup();
    render(<FormularioLogin />);

    await usuario.type(screen.getByLabelText("Correo"), "laura@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(screen.getByText("Inicio de sesión simulado exitoso. ¡Bienvenido/a!")).toBeInTheDocument();
  });
});
