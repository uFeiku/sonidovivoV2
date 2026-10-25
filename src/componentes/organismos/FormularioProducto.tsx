import { useState, type ChangeEvent, type FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import CampoTextArea from "../moleculas/CampoTextArea";
import Boton from "../atomos/Boton";
import { categorias } from "../../datos/productos";
import { validarProducto, hayErrores, type DatosProducto, type Errores } from "../../utilidades/validaciones";
import type { Producto } from "../../tipos";

interface FormularioProductoProps {
  // Si viene un producto, el formulario se abre con sus datos cargados (modo "Editar").
  producto?: Producto | null;
}

function datosDesdeProducto(producto?: Producto | null): DatosProducto {
  return {
    codigo: producto?.codigo ?? "",
    categoria: producto?.categoria ?? "",
    nombre: producto?.nombre ?? "",
    descripcion: producto?.descripcion ?? "",
    precio: producto ? String(producto.precio) : "",
    imagen: producto?.imagen ?? "",
    stock: producto ? String(producto.stock) : "",
    stockCritico: producto ? String(producto.stockCritico) : "",
  };
}

function FormularioProducto({ producto }: FormularioProductoProps) {
  const [datos, setDatos] = useState<DatosProducto>(() => datosDesdeProducto(producto));
  const [errores, setErrores] = useState<Errores<DatosProducto>>({});
  const [exito, setExito] = useState(false);

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
    setExito(false);
  };

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);
    setExito(!hayErrores(nuevosErrores));
  };

  const limpiar = () => {
    setDatos(datosDesdeProducto(null));
    setErrores({});
    setExito(false);
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {exito && (
        <div className="alert alert-success" role="alert">
          Producto guardado correctamente (simulación).
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            id="prod-codigo"
            etiqueta="Código de producto"
            nombre="codigo"
            valor={datos.codigo}
            onChange={manejarCambio}
            error={errores.codigo}
            placeholder="Ej: GA001"
          />
        </div>
        <div className="col-md-6">
          <CampoSelect
            id="prod-categoria"
            etiqueta="Categoría"
            nombre="categoria"
            valor={datos.categoria}
            onChange={manejarCambio}
            opciones={categorias.map((c) => ({ valor: c, etiqueta: c }))}
            textoInicial="Seleccione..."
            error={errores.categoria}
          />
        </div>
      </div>

      <CampoFormulario
        id="prod-nombre"
        etiqueta="Nombre del producto"
        nombre="nombre"
        valor={datos.nombre}
        onChange={manejarCambio}
        error={errores.nombre}
        placeholder="Nombre"
        maxLength={100}
      />

      <CampoTextArea
        id="prod-descripcion"
        etiqueta="Descripción (opcional)"
        nombre="descripcion"
        valor={datos.descripcion}
        onChange={manejarCambio}
        error={errores.descripcion}
        placeholder="Descripción del producto (máx. 500 caracteres)"
        maxLength={500}
      />

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            id="prod-precio"
            etiqueta="Precio (CLP)"
            nombre="precio"
            tipo="number"
            valor={datos.precio}
            onChange={manejarCambio}
            error={errores.precio}
            placeholder="189990"
            min={0}
            step="0.01"
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            id="prod-imagen"
            etiqueta="URL de imagen (opcional)"
            nombre="imagen"
            valor={datos.imagen}
            onChange={manejarCambio}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            id="prod-stock"
            etiqueta="Stock"
            nombre="stock"
            tipo="number"
            valor={datos.stock}
            onChange={manejarCambio}
            error={errores.stock}
            placeholder="10"
            min={0}
            step={1}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            id="prod-stock-critico"
            etiqueta="Stock crítico (opcional)"
            nombre="stockCritico"
            tipo="number"
            valor={datos.stockCritico}
            onChange={manejarCambio}
            error={errores.stockCritico}
            placeholder="2"
            min={0}
            step={1}
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <Boton type="submit">Guardar producto</Boton>
        <Boton variante="secondary" onClick={limpiar}>
          Limpiar
        </Boton>
      </div>
    </form>
  );
}

export default FormularioProducto;
