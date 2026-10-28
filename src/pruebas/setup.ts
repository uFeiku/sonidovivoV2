// Se ejecuta antes de las pruebas. Agrega a Jasmine los "matchers" del DOM
// como toBeInTheDocument(), toHaveClass() o toHaveAttribute().
import * as jasmineDom from "@testing-library/jasmine-dom/dist/index.js";

// El paquete viene en formato CommonJS y, al empaquetarlo, el objeto de matchers
// puede quedar envuelto en uno o más ".default". Lo desenvolvemos hasta encontrarlo.
function obtenerMatchers(modulo: unknown): jasmine.CustomMatcherFactories {
  let actual = modulo as Record<string, unknown>;
  while (actual && !("toBeInTheDocument" in actual) && "default" in actual) {
    actual = actual.default as Record<string, unknown>;
  }
  return actual as unknown as jasmine.CustomMatcherFactories;
}

beforeAll(() => {
  jasmine.addMatchers(obtenerMatchers(jasmineDom));
});
