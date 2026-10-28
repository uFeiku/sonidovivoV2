import { productos } from "../datos/productos";
import {
  CLAVE_PRODUCTOS,
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProducto,
} from "../datos/repositorio";

// Cada prueba parte sin datos guardados: listar vuelve a la semilla.
beforeEach(() => {
  localStorage.clear();
});

describe("repositorio de productos", () => {
  it("crear, leer, actualizar y eliminar un producto", () => {
    // El repositorio es el único que habla con localStorage: el espía (spyOn de Jasmine) lo comprueba. Jasmine lo restaura solo al terminar cada prueba.
    // getItem y setItem están en el prototipo. El objeto localStorage no deja reemplazarlos.
    const leer = spyOn(Storage.prototype, "getItem");
    leer.and.callThrough(); // el espía registra las llamadas pero ejecuta el método real
    const guardar = spyOn(Storage.prototype, "setItem");
    guardar.and.callThrough();
    const semilla = productos[0];
    const nuevo = crearProducto({
      codigo: "ZZ999",
      nombre: "Producto de prueba",
      marca: semilla.marca,
      modelo: semilla.modelo,
      precio: semilla.precio,
      categoria: semilla.categoria,
      stock: semilla.stock,
      stockCritico: semilla.stockCritico,
      imagen: semilla.imagen,
      descripcion: semilla.descripcion,
    });

    expect(nuevo.id).toBe(Math.max(...productos.map((producto) => producto.id)) + 1);
    expect(guardar).toHaveBeenCalledWith(CLAVE_PRODUCTOS, jasmine.stringContaining("Producto de prueba"));

    leer.calls.reset();
    expect(obtenerProducto(nuevo.id)?.nombre).toBe("Producto de prueba");
    expect(leer).toHaveBeenCalledWith(CLAVE_PRODUCTOS);
    expect(listarProductos()).toHaveSize(productos.length + 1);

    guardar.calls.reset();
    const actualizado = actualizarProducto(nuevo.id, { nombre: "Producto editado", precio: 1000 });
    expect(actualizado?.nombre).toBe("Producto editado");
    expect(actualizado?.id).toBe(nuevo.id);
    expect(obtenerProducto(nuevo.id)?.precio).toBe(1000);
    expect(guardar).toHaveBeenCalledWith(CLAVE_PRODUCTOS, jasmine.stringContaining("Producto editado"));

    guardar.calls.reset();
    eliminarProducto(nuevo.id);
    expect(obtenerProducto(nuevo.id)).toBeUndefined();
    expect(listarProductos()).toHaveSize(productos.length);
    const ultimaEscritura = guardar.calls.mostRecent().args; // argumentos de la última llamada
    expect(ultimaEscritura[0]).toBe(CLAVE_PRODUCTOS);
    expect(JSON.parse(String(ultimaEscritura[1]))).toHaveSize(productos.length);
  });

  it("un JSON dañado vuelve a la semilla", () => {
    localStorage.setItem(CLAVE_PRODUCTOS, "{esto no es una lista");
    expect(listarProductos()).toHaveSize(productos.length);
  });
});
