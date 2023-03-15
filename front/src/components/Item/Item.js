import './Item.css'
import { Link } from 'react-router-dom';
import Carrousel from '../Carrousel/Carrousel';

const Item = ({codigo, nombre, imagenes, precio})=>{
    return(
        <div className="col">
            <div className="card h-100">
                {
                    imagenes.length > 1
                    ?
                    (
                        <Carrousel imagenes={imagenes} className="card-img-top"/>
                    )
                    :
                    (
                        <img src={`${process.env.REACT_APP_url_server_local}${imagenes[0].path_img}`} className="card-img-top" alt={`${nombre}-img`}/>
                    )
                }
                
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">${precio}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/detalle/${codigo}`} className="btn btn-detalle">Ver detalle</Link>
                </div>
            </div>
        </div>        
    )
}

export default Item;