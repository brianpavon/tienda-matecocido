import './Footer.css'
const Footer = ()=>{
    return(
        <>

        <div className="container">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-evenly border-top border-bottom p-3 mb-2">
                    <li className="nav-item">
                        <a target="_blank" href="https://www.instagram.com/matecocido.ceramica/" className="nav-link px-2 text-muted">
                            <img className="imgRedes" src="../images/instagram.png" alt="logoInstagram"/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a target="_blank" href="https://www.facebook.com/matecocido.ceramica" className="nav-link px-2 text-muted">                        
                            <img className="imgRedes" src="../images/facebook.png" alt="logoFacebook"/>                            
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">Pricing</a>
                    </li> */}
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">Cuidados</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">Sobre mí</a>
                    </li>
                </ul>
                <p className="text-center text-muted">&copy; Tienda Mate Cocido</p>
            </footer>
        </div>
        
        </>
    )
}

export default Footer;