import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CarritoProvider } from "../contexto/CarritoContext";
import DetalleProducto from "../paginas/DetalleProducto";
import { productos } from "../datos/productos";

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

  test("si el id no existe muestra un mensaje", () => {
    visitar("/producto/9999");
    expect(screen.getByText("Producto no encontrado.")).toBeInTheDocument();
  });
});
