import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";
import { useContext,useState } from "react";


const ItemDetail = ({id,name, img, price,description,stock}) =>{
    const [quantity,setQuantity] = useState(0);
    
    const {addItem} = useContext(CartContext);
    
    const handleOnAdd = (quantity) =>{
        setQuantity(quantity);        
        addItem({id,name,price,img,quantity});
    }

    return(
            
        <>   
       
        <div className="container-fluid mt-4 p-4 d-flex justify-content-center">

            <div className="card mb-3" style={{maxWidth:'50vw'}}>
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src={img} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-6 p-4 mt-4">
                        <div className="card-body p-4">
                            <h3 className="card-title mt-4 mb-4">{name}</h3>
                            <p className="card-text mt-4 mb-4">{description}</p>
                            <h5 className="card-title mt-4">${price}</h5>
                        </div>
                        {/* <>
                          <ItemCount id={id} stock={stock} onAdd={handleOnAdd}/>
                        </>                         */}
                    </div>                    
                </div>
            </div>
        </div>
      
      </>
        
    )
}
export default ItemDetail