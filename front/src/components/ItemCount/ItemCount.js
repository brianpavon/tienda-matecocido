import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import './ItemCount.css';


const ItemCount = ({id,stock,onAdd}) =>{
    const [count,setCount] = useState(0);
    
    
    const { isInCart } = useContext(CartContext);

    const decrement = ()=>{    
        setCount(prev => prev - 1);
    }

    const increment = ()=>{
        if(count < stock) {
            setCount(prev => prev +1)
        }
    }

    const reset = () =>{
        setCount(0);
    }

    

    const handleChange = (e) => {
        let value = e.target.value;
        
        if(value <= stock && !isNaN(value)) {
            //console.log(e.target.value);
            setCount(e.target.value)
        }
    }

    return (
        <div className="justify-content-center">
            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                <button type="button" className={!isInCart(id) ? 'btn btnSumarRestar' : 'btn btnSumarRestar disabled'} onClick={count > 0 ? decrement : reset}>
                    <img src="../images/minus.png" alt="img_minus" className="imgIcons"/>
                </button>                
                <input onChange={handleChange} className="input-count text-center" value={count} readOnly={isInCart(id)}/>
                <button type="button" className={!isInCart(id) ? 'btn btnSumarRestar' : 'btn btnSumarRestar disabled'} onClick={increment}>
                    <img src="../images/plus.png" alt="img_plus" className="imgIcons"/>
                </button>
            </div>        
            <div className="mt-4">
                {
                    isInCart(id) ?
                    (    
                        <Link to='/cart' className='btn btn-finalizar'>
                            Finalizar compra
                        </Link>
                    ) : 
                    (
                        <button className={ count > 0 ? 'btn btn-detalle' : 'btn btn-detalle disabled'} onClick={() => onAdd(count)}>
                            Agregar al carrito
                        </button>                        
                    )
                }
            </div>
        </div>
    )
}

export default ItemCount;