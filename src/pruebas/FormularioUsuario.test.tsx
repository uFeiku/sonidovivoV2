import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioUsuario from "../componentes/organismos/FormularioUsuario";

describe("FormularioUsuario", () => {
  test("las comunas dependen de la región elegida", async () => {
    const usuario = userEvent.setup();
    render(<FormularioUsuario tiposPermitidos={["Cliente"]} tipoInicial="Cliente" textoBoton="Registrarme" />);

    // Antes de elegir región solo existe la opción vacía
    expect(screen.queryByRole("option", { name: "Viña del Mar" })).not.toBeInTheDocument();

    await usuario.selectOptions(screen.getByLabelText("Región"), "Región de Valparaíso");

    expect(screen.getByRole("option", { name: "Viña del Mar" })).toBeInTheDocument();
  });

  test("un RUN con dígito verificador incorrecto muestra error", async () => {
    const usuario = userEvent.setup();
    render(<FormularioUsuario tiposPermitidos={["Cliente"]} tipoInicial="Cliente" textoBoton="Registrarme" />);

    await usuario.type(screen.getByLabelText("RUN (sin puntos ni guión)"), "123456786");
    await usuario.click(screen.getByRole("button", { name: "Registrarme" }));

    expect(screen.getByText("El RUN no es válido. Revisa el dígito verificador.")).toBeInTheDocument();
  });

  test("el formulario completo y válido se guarda", async () => {
    const usuario = userEvent.setup();
    render(<FormularioUsuario tiposPermitidos={["Cliente"]} tipoInicial="Cliente" textoBoton="Registrarme" />);

    await usuario.type(screen.getByLabelText("RUN (sin puntos ni guión)"), "123456785");
    await usuario.type(screen.getByLabelText("Nombre"), "Laura");
    await usuario.type(screen.getByLabelText("Apellidos"), "Díaz Pérez");
    await usuario.type(screen.getByLabelText("Correo"), "laura@duoc.cl");
    await usuario.selectOptions(screen.getByLabelText("Región"), "Región de Valparaíso");
    await usuario.selectOptions(screen.getByLabelText("Comuna"), "Viña del Mar");
    await usuario.type(screen.getByLabelText("Dirección"), "Av. Libertad 123");
    await usuario.click(screen.getByRole("button", { name: "Registrarme" }));

    expect(screen.getByText("Usuario guardado correctamente (simulación).")).toBeInTheDocument();
  });
});
