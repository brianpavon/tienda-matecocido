import { Link } from "react-router-dom";

const SideBarDashboard = () => {
    return(
        <div className="container-fluid text-start">
        <div className="row">
        <nav id="sidebarMenu" className="navbar-colour col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to={'/backoffice'}>
                  <img src="../../images/home-dashboard.png" alt="img_home" width="24" height="24" className="feather feather-file align-text-bottom"/>                    
                    Panel de Control
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/backoffice/ordenes-compra'}>                    
                    <img src="../../images/orders.png" alt="img_orders" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Órdenes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/backoffice/productos'}>
                    <img src="../../images/prods.png" alt="img_ordenes" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/backoffice/clientes'}>
                    <img src="../../images/customer.png" alt="img_clientes" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Clientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/backoffice/reportes'}>                  
                    <img src="../../images/reports.png" alt="img_reportes" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Reportes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/backoffice/secciones-pagina'}>
                  <img src="../../images/sections.png" alt="img_secciones" width="24" height="24" className="feather feather-file align-text-bottom"/>
                    Secciones
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          </div>
      </div>
    )
}
export default SideBarDashboard;