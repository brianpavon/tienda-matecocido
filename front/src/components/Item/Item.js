import './Item.css'
import { Link } from 'react-router-dom'
import Carrousel from '../Carrousel/Carrousel';

const Item = ({id, name,img ,imagenes, price})=>{

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
                        <img src={img} className="card-img-top" alt={img}/>
                    )
                }
                
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${price}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/detail/${id}`} className="btn btn-detalle">Ver detalle</Link>
                </div>
            </div>
        </div>        
    )
}

export default Item;