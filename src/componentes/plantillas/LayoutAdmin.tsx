import { Outlet } from "react-router-dom";
import NavbarAdmin from "../organismos/NavbarAdmin";
import Footer from "../organismos/Footer";

function LayoutAdmin() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutAdmin;
