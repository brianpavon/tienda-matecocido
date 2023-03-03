import { Link } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
  return (
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

      <div className="container-fluid text-start">
        <div className="row">
          <nav id="sidebarMenu" className="navbar-colour col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page">
                  <img src="../images/home-dashboard.png" alt="img_home" width="24" height="24" className="feather feather-file align-text-bottom"/>                    
                    Panel de Control
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">                    
                    <img src="../images/orders.png" alt="img_orders" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Órdenes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">
                    <img src="../images/prods.png" alt="img_ordenes" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">
                    <img src="../images/customer.png" alt="img_clientes" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Clientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="#">                  
                    <img src="../images/reports.png" alt="img_reportes" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Reportes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">
                  <img src="../images/sections.png" alt="img_secciones" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Secciones
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Panel de Control</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Compartir
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Exportar
                  </button>
                </div>
                {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar" className="align-text-bottom"></span>
                        This week
                    </button> */}
              </div>
            </div>

            {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

            
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
