interface EtiquetaProps {
  paraId: string; // id del campo al que pertenece (atributo htmlFor)
  texto: string;
}

function Etiqueta({ paraId, texto }: EtiquetaProps) {
  return (
    <label htmlFor={paraId} className="form-label">
      {texto}
    </label>
  );
}

export default Etiqueta;
