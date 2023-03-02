import './Footer.css';
const Footer = ()=>{
    return(
        <>
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-3 border-top">
                <p className="col-md-4 mb-0 text-muted">&copy; Mate Cocido Cerámica</p>

                <ul className="nav col-md-4 justify-content-end">
                    
                    {/* <li className="nav-item">
                        <a className="nav-link px-2 text-muted">
                            Recomendaciones y cuidados
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link px-2 text-muted">
                            Sobre Mí
                        </a>
                    </li> */}

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
                    
                </ul>
            </footer>
        </div>
        </>
    )
}

export default Footer;