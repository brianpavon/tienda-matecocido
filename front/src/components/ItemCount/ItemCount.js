import { useState } from "react";
import './ItemCount.css';


const ItemCount = ({stock}) =>{
    const [count,setCount] = useState(0);
    
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

    const onAdd = () =>{
        console.log(`agregando productos, total: ${count}`);
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
                <button type="button" className="btn btnSumarRestar" onClick={count > 0 ? decrement : reset}>
                    <img src="../images/minus.png" alt="img_minus" className="imgIcons"/>
                </button>                
                <input onChange={handleChange} className="input-count text-center" value={count}/>
                <button type="button" className="btn btnSumarRestar" onClick={increment}>
                    <img src="../images/plus.png" alt="img_plus" className="imgIcons"/>
                </button>
            </div>        
            <div className="mt-4">                        
                <button className={ count > 0 ? 'btn btn-detalle' : 'btn btn-detalle disabled'} onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemCount;