// Tipos de los matchers que agrega @testing-library/jasmine-dom (el paquete no trae los suyos).
// Sin esto, TypeScript no reconoce expect(...).toBeInTheDocument() y similares.
declare namespace jasmine {
  interface Matchers<T> {
    toBeInTheDocument(): void;
    toBeVisible(): void;
    toBeDisabled(): void;
    toBeEnabled(): void;
    toBeChecked(): void;
    toBeRequired(): void;
    toBeInvalid(): void;
    toBeValid(): void;
    toBeEmptyDOMElement(): void;
    toHaveAttribute(atributo: string, valor?: unknown): void;
    toHaveClass(...clases: string[]): void;
    toHaveTextContent(texto: string | RegExp, opciones?: { normalizeWhitespace: boolean }): void;
    toHaveValue(valor?: string | string[] | number | null): void;
    toHaveFocus(): void;
    toContainElement(elemento: HTMLElement | null): void;
  }
}

// El paquete tampoco declara su módulo: lo dejamos como "any" para poder importarlo.
declare module "@testing-library/jasmine-dom/dist/index.js";
