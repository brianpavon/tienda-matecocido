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
                    {/* <Link className="link-navbar" to='/cart'> <CartWidget totalProducts={totalProducts}/></Link> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar