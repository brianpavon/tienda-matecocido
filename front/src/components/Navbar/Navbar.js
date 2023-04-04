import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const {totalProducts} = useContext(CartContext);
    const {user, closeSession} = useAuth();
    const [categoriasDB, setCategoriasDB] = useState([]);
    const url = process.env.REACT_APP_url_server_local;
    useEffect(() => {
        fetch(`${url}categorias`)
          .then(
            response => response.json()
            )
          .then(
                data => {
                    //console.log(data.content);
                    setCategoriasDB(data.content);
            });
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-colour">
            
            <div className="container-fluid">
                
                <Link to='/' className="navbar-brand link-logo">Mate Cocido</Link>
                <div className="col-sm-6 d-block d-sm-none">
                    <Link className="link-navbar" to='/cart'> <CartWidget totalProducts={totalProducts}/></Link>
                </div>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {categoriasDB.map(categ => <Link key={categ.codigo} to={`categorias/${categ.codigo}`} className="nav-link active">{categ.nombre}</Link>)}
                    </ul>
                    {
                        // !user ?
                        // (
                            <Link to='/login' className="me-4 btn btn-outline-dark">Login</Link>
                        // )                            
                        // :
                        // (
                        //     <ul className="navbar-nav">
                        //         <img className="img-navbar" src={user.profilePhoto ? user.profilePhoto : '../images/user.png'}/>
                        //         <li className="nav-item dropdown">
                        //             <a className="nav-link dropdown-toggle"role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        //                 {user.name ? user.name : user.email}
                        //             </a>
                        //             <ul className="dropdown-menu navbar-colour">
                        //                 <li>
                        //                     <Link className="dropdown-item" to='/orders'>Mis pedidos</Link>
                        //                 </li>
                        //                 <li><hr className="dropdown-divider"/></li>
                        //                 <li>
                        //                     <button className="dropdown-item" onClick={closeSession}>Salir</button>
                        //                 </li>                                        
                        //             </ul>
                        //         </li>
                        //     </ul>
                        // )
                    }
                    <Link className="link-navbar d-none d-sm-block" to='/cart'> <CartWidget totalProducts={totalProducts}/></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar