import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const {totalProducts} = useContext(CartContext);
    const {user, closeSession} = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-colour">
            
            <div className="container-fluid">
                
                <Link to='/' className="navbar-brand link-logo">Mate Cocido</Link>
                
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
                            <Link to='/category/combos' className="nav-link active">Combos</Link>
                        </li>                        
                    </ul>
                    
                    {
                        !user ?
                        (
                            <Link to='/login' className="me-4 btn btn-outline-dark">Login</Link>
                        )                            
                        :
                        (
                            <ul className="navbar-nav">
                                <img className="img-navbar" src={user.profilePhoto ? user.profilePhoto : '../images/user.png'} alt="img-profile"/>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.name ? user.name : user.email}
                                    </a>
                                    <ul className="dropdown-menu navbar-colour">
                                        <li>
                                            <Link className="dropdown-item" to='/orders'>Mis pedidos</Link>
                                        </li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li>
                                            <button className="dropdown-item" onClick={closeSession}>Salir</button>
                                        </li>                                        
                                    </ul>
                                </li>
                            </ul>
                        )
                    }
                    
                    <Link className="link-navbar" to='/cart'> <CartWidget totalProducts={totalProducts}/></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar