import { Link } from "react-router-dom";
import SideBarDashboard from "./SideBarDashboard";

const NavbarDashboard = () => {
    return(
        <>
        <header className="navbar navbar-colour sticky-top flex-md-nowrap p-0 shadow">
        <Link to="/" className="navbar-brand text-muted col-md-3 col-lg-2 me-0 px-3 fs-6">
          Mate Cocido
        </Link>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">          
          <span className="navbar-toggler-icon"></span>
        </button>
        <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Buscar" aria-label="Buscar"/>
        <div className="navbar-nav ">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              Tu Usuario
            </a>
          </div>
        </div>
      </header>
      <SideBarDashboard/>
      </>
    )
}
export default NavbarDashboard;