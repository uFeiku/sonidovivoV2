import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminProductos from "../paginas/AdminProductos";

// Cada prueba parte de la semilla: el admin lee el repositorio, y el repositorio lee localStorage.
beforeEach(() => {
  localStorage.clear();
});

async function crearProductoDePrueba() {
  const usuario = userEvent.setup();
  await usuario.type(screen.getByLabelText("Código de producto"), "ZZ999");
  await usuario.selectOptions(screen.getByLabelText("Categoría"), "Baterías");
  await usuario.type(screen.getByLabelText("Nombre del producto"), "Producto de prueba");
  await usuario.type(screen.getByLabelText("URL de imagen (opcional)"), "/img/prueba.png");
  await usuario.type(screen.getByLabelText("Precio (CLP)"), "1000");
  await usuario.type(screen.getByLabelText("Stock"), "3");
  await usuario.click(screen.getByRole("button", { name: "Guardar producto" }));
}

describe("admin de productos", () => {
  test("crear un producto muestra la fila en la tabla", async () => {
    render(<AdminProductos />);

    await crearProductoDePrueba();

    expect(screen.getByRole("row", { name: /Producto de prueba/ })).toBeInTheDocument();
  });

  test("editar cambia el nombre en la tabla", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    await usuario.click(screen.getAllByRole("button", { name: "Editar" })[0]);
    const nombre = screen.getByLabelText("Nombre del producto");
    await usuario.clear(nombre);
    await usuario.type(nombre, "Guitarra editada");
    await usuario.click(screen.getByRole("button", { name: "Guardar producto" }));

    expect(screen.getByRole("row", { name: /Guitarra editada/ })).toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /Guitarra Acústica Folk/ })).not.toBeInTheDocument();
  });

  test("eliminar quita la fila de la tabla", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    const fila = screen.getByRole("row", { name: /Guitarra Acústica Folk/ });
    await usuario.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);

    expect(fila).not.toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /Guitarra Acústica Folk/ })).not.toBeInTheDocument();
  });
});
