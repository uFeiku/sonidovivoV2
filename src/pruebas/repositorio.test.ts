import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { productos } from "../datos/productos";
import { usuariosEjemplo } from "../datos/usuarios";
import {
  CLAVE_PRODUCTOS,
  CLAVE_USUARIOS,
  actualizarProducto,
  actualizarUsuario,
  crearProducto,
  crearUsuario,
  eliminarProducto,
  eliminarUsuario,
  listarProductos,
  listarUsuarios,
  obtenerProducto,
  obtenerUsuario,
} from "../datos/repositorio";

// Cada prueba parte sin datos guardados: listar vuelve a la semilla.
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("repositorio de productos", () => {
  test("sin datos guardados lista la semilla y no la modifica", () => {
    const largoSemilla = productos.length;

    expect(listarProductos()).toHaveLength(largoSemilla);
    expect(obtenerProducto(1)?.nombre).toBe("Guitarra Acústica Folk");
    expect(productos).toHaveLength(largoSemilla);
  });

  test("crear, leer, actualizar y eliminar un producto", () => {
    // El repositorio es el único que habla con localStorage: el espía lo comprueba.
    // getItem y setItem están en el prototipo. El objeto localStorage no deja reemplazarlos.
    const leer = vi.spyOn(Storage.prototype, "getItem");
    const guardar = vi.spyOn(Storage.prototype, "setItem");
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
    expect(guardar).toHaveBeenCalledWith(CLAVE_PRODUCTOS, expect.stringContaining("Producto de prueba"));

    leer.mockClear();
    expect(obtenerProducto(nuevo.id)?.nombre).toBe("Producto de prueba");
    expect(leer).toHaveBeenCalledWith(CLAVE_PRODUCTOS);
    expect(listarProductos()).toHaveLength(productos.length + 1);

    guardar.mockClear();
    const actualizado = actualizarProducto(nuevo.id, { nombre: "Producto editado", precio: 1000 });
    expect(actualizado?.nombre).toBe("Producto editado");
    expect(actualizado?.id).toBe(nuevo.id);
    expect(obtenerProducto(nuevo.id)?.precio).toBe(1000);
    expect(guardar).toHaveBeenCalledWith(CLAVE_PRODUCTOS, expect.stringContaining("Producto editado"));

    guardar.mockClear();
    eliminarProducto(nuevo.id);
    expect(obtenerProducto(nuevo.id)).toBeUndefined();
    expect(listarProductos()).toHaveLength(productos.length);
    const ultimaEscritura = guardar.mock.calls[guardar.mock.calls.length - 1];
    expect(ultimaEscritura?.[0]).toBe(CLAVE_PRODUCTOS);
    expect(JSON.parse(String(ultimaEscritura?.[1]))).toHaveLength(productos.length);
  });

  test("actualizar o eliminar un id que no existe no rompe la lista", () => {
    expect(actualizarProducto(9999, { nombre: "Nadie" })).toBeUndefined();
    eliminarProducto(9999);
    expect(listarProductos()).toHaveLength(productos.length);
  });

  test("una lista vacía guardada no vuelve a la semilla", () => {
    localStorage.setItem(CLAVE_PRODUCTOS, "[]");
    expect(listarProductos()).toHaveLength(0);
  });

  test("un JSON dañado vuelve a la semilla", () => {
    localStorage.setItem(CLAVE_PRODUCTOS, "{esto no es una lista");
    expect(listarProductos()).toHaveLength(productos.length);
  });
});

describe("repositorio de usuarios", () => {
  test("sin datos guardados lista la semilla", () => {
    expect(listarUsuarios()).toHaveLength(usuariosEjemplo.length);
    expect(obtenerUsuario("123456785")?.nombre).toBe("Juan");
    expect(obtenerUsuario("123456785")?.apellidos).toBe("González");
  });

  test("crear, leer, actualizar y eliminar un usuario", () => {
    const nuevo = crearUsuario({
      run: "190000008",
      nombre: "Ana Soto",
      correo: "ana@duoc.cl",
      tipo: "Cliente",
      region: "Región de Valparaíso",
      comuna: "Viña del Mar",
    });

    expect(nuevo?.run).toBe("190000008");
    expect(listarUsuarios()).toHaveLength(usuariosEjemplo.length + 1);
    expect(JSON.parse(localStorage.getItem(CLAVE_USUARIOS) ?? "[]")).toHaveLength(usuariosEjemplo.length + 1);

    const actualizado = actualizarUsuario("190000008", { nombre: "Ana Soto Pérez", tipo: "Vendedor" });
    expect(actualizado?.nombre).toBe("Ana Soto Pérez");
    expect(actualizado?.run).toBe("190000008");
    expect(obtenerUsuario("190000008")?.tipo).toBe("Vendedor");

    eliminarUsuario("190000008");
    expect(obtenerUsuario("190000008")).toBeUndefined();
    expect(listarUsuarios()).toHaveLength(usuariosEjemplo.length);
  });

  test("no crea un segundo usuario con el mismo RUN", () => {
    const repetido = crearUsuario(usuariosEjemplo[0]);

    expect(repetido).toBeUndefined();
    expect(listarUsuarios()).toHaveLength(usuariosEjemplo.length);
    expect(localStorage.getItem(CLAVE_USUARIOS)).toBeNull();
  });

  test("actualizar un RUN que no existe devuelve undefined", () => {
    expect(actualizarUsuario("000000000", { nombre: "Nadie" })).toBeUndefined();
  });
});
