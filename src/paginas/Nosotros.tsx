import MiembroEquipo from "../componentes/moleculas/MiembroEquipo";

function Nosotros() {
  return (
    <div className="container py-4">
      <h2>Nuestra historia</h2>
      <div className="mb-4" style={{ maxWidth: "800px" }}>
        <p>
          <strong>Sonido Vivo</strong> nació hace 11 años en el corazón de Viña del Mar, con la idea simple de acercar
          instrumentos de calidad a músicos de todos los niveles.
        </p>
        <p>
          Desde 2015 hemos ofrecido nuestros servicios de forma presencial a estudiantes, bandas emergentes y
          profesionales de la región de Valparaíso, y ahora, con nuestra tienda online, queremos llegar a todo Chile.
        </p>
        <p>
          Ofrecemos una amplia gama de instrumentos y equipos, además de reparaciones y asesoría técnica para que tu
          música suene siempre al máximo.
        </p>
      </div>

      <h3>Conoce nuestro taller</h3>
      {/* TODO: reemplazar VIDEO_ID por el ID real de un video de YouTube */}
      <div className="ratio ratio-16x9 mb-5">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Video institucional Sonido Vivo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>Equipo de desarrollo</h2>
      <p className="mb-4">Responsables de la plataforma.</p>
      <div className="row row-cols-1 row-cols-md-2 g-4" style={{ maxWidth: "700px" }}>
        <div className="col">
          <MiembroEquipo iniciales="MM" nombre="Mauricio Mateluna" rol="Desarrollo Frontend / HTML / CSS" />
        </div>
        <div className="col">
          <MiembroEquipo iniciales="DM" nombre="Diego Miranda" rol="Desarrollo Frontend / JavaScript" />
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
