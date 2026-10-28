import { render } from "@testing-library/react";
import Contacto from "../paginas/Contacto";

describe("página Contacto", () => {
  // Desafío de la clase: comprobar que Contacto conserva las clases responsivas de Bootstrap.
  it("conserva las clases responsivas col-12, col-md-8 y col-lg-6", () => {
    const { container } = render(<Contacto />);
    const columna = container.querySelector(".col-12.col-md-8.col-lg-6");
    expect(columna).not.toBeNull();
    expect(columna).toHaveClass("col-12", "col-md-8", "col-lg-6");
  });
});
