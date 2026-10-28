import type { ChangeEvent } from "react";
import CampoFormulario from "./CampoFormulario";
import CampoSelect from "./CampoSelect";

interface FiltroCatalogoProps {
  nombre: string;
  categoria: string;
  categorias: string[];
  onNombre: (evento: ChangeEvent<HTMLInputElement>) => void;
  onCategoria: (evento: ChangeEvent<HTMLSelectElement>) => void;
}

// Molécula: el texto y el selector que achican el catálogo.
function FiltroCatalogo({ nombre, categoria, categorias, onNombre, onCategoria }: FiltroCatalogoProps) {
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <CampoFormulario
          id="filtro-nombre"
          etiqueta="Nombre"
          nombre="nombre"
          valor={nombre}
          onChange={onNombre}
          placeholder="Buscar por nombre"
        />
      </div>
      <div className="col-12 col-md-6">
        <CampoSelect
          id="filtro-categoria"
          etiqueta="Categoría"
          nombre="categoria"
          valor={categoria}
          onChange={onCategoria}
          opciones={categorias.map((c) => ({ valor: c, etiqueta: c }))}
          textoInicial="Todas las categorías"
        />
      </div>
    </div>
  );
}

export default FiltroCatalogo;
