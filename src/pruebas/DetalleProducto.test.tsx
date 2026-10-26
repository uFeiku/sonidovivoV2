import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CarritoProvider } from "../contexto/CarritoContext";
import DetalleProducto from "../paginas/DetalleProducto";
import { productos } from "../datos/productos";
import { formatearPrecio } from "../utilidades/formato";

// Montamos la ruta dinámica real (/producto/:id) y "visitamos" una URL concreta.
function visitar(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <CarritoProvider>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("DetalleProducto", () => {
  test("muestra el producto que indica el id de la URL", () => {
    const producto = productos[2];
    visitar(`/producto/${producto.id}`);

    expect(screen.getByRole("heading", { name: producto.nombre })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al catálogo" })).toHaveAttribute("href", "/catalogo");
  });

  test("muestra el precio y el botón de agregar", () => {
    const producto = productos[0];
    visitar(`/producto/${producto.id}`);

    expect(screen.getByText(formatearPrecio(producto.precio))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Agregar al carrito" })).toBeInTheDocument();
  });

  test("si el id no existe muestra un mensaje", () => {
    visitar("/producto/9999");
    expect(screen.getByText("Producto no encontrado.")).toBeInTheDocument();
  });
});
