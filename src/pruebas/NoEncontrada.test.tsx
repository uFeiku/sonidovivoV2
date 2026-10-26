import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NoEncontrada from "../paginas/NoEncontrada";

describe("página no encontrada", () => {
  test("muestra el mensaje y un enlace al inicio", () => {
    render(
      <MemoryRouter>
        <NoEncontrada />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "404 - Página no encontrada" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");
  });
});
