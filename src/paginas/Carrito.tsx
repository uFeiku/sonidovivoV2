import TablaCarrito from "../componentes/organismos/TablaCarrito";

function Carrito() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Tu carrito de compras</h2>
      <TablaCarrito />
    </div>
  );
}

export default Carrito;
