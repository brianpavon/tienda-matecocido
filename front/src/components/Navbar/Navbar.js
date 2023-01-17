import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-colour">
            
            <div className="container-fluid">
                
                <Link to='/' className="navbar-brand">Mate Cocido</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/category/tazas' className="nav-link active">Tazas</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/category/hogar-deco' className="nav-link active">Hogar & Deco</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/category/combos' className="nav-link active" aria-current="page" href="#">Combos</Link>
                        </li>                        
                         
                        
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Productos</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Productos
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Tazas</a></li>
                                <li><a className="dropdown-item" href="#">Bowls</a></li>
                                <li><a className="dropdown-item" href="#">Combos</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Hornitos</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li> */}
                    </ul>
                    <CartWidget/>                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar