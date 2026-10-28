import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "../tipos";

// El carrito se guarda con la MISMA clave que usaba la versión HTML.
export const CLAVE_CARRITO = "carritoSonidoVivo";

interface CarritoContextoTipo {
  items: ItemCarrito[];
  totalItems: number; // número que se ve en el menú: Carrito (3)
  total: number; // suma de precio x cantidad
  agregar: (producto: Producto) => void;
  eliminar: (id: number) => void;
}

// Un "contexto" es una caja global: cualquier componente puede leerla sin pasar props de uno en uno.
const CarritoContexto = createContext<CarritoContextoTipo | undefined>(undefined);

function leerCarritoGuardado(): ItemCarrito[] {
  try {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return datos ? (JSON.parse(datos) as ItemCarrito[]) : [];
  } catch {
    return []; // si el JSON está dañado, partimos con un carrito vacío
  }
}

export function CarritoProvider({ children }: { children: ReactNode }) {
  // useState con función: se lee localStorage solo UNA vez, al crear el componente.
  const [items, setItems] = useState<ItemCarrito[]>(leerCarritoGuardado);

  // Cada vez que "items" cambia, lo guardamos en localStorage (equivale a guardarCarrito()).
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  }, [items]);

  const agregar = (producto: Producto) => {
    setItems((anteriores) => {
      const existe = anteriores.find((item) => item.id === producto.id);
      if (existe) {
        // Ya estaba: creamos un arreglo NUEVO sumando 1 a la cantidad (no se modifica el original).
        return anteriores.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }
      return [
        ...anteriores,
        { id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: 1 },
      ];
    });
  };

  const eliminar = (id: number) => {
    setItems((anteriores) => anteriores.filter((item) => item.id !== id));
  };

  const totalItems = items.reduce((suma, item) => suma + item.cantidad, 0);
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <CarritoContexto.Provider value={{ items, totalItems, total, agregar, eliminar }}>
      {children}
    </CarritoContexto.Provider>
  );
}

// Hook personalizado: así los componentes solo escriben useCarrito()
export function useCarrito(): CarritoContextoTipo {
  const contexto = useContext(CarritoContexto);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return contexto;
}
