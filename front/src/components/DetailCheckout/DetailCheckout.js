import ItemCheckout from "../ItemCheckout/ItemCheckout";

const DetailCheckout = ({cart,total,totalProducts}) =>{
    
    return(

        <div className="col-md-5 col-lg-4 order-md-last">            
            <h4 className="d-flex justify-content-between align-items-center mb-3">                
                <span className="text-dark">Tu carrito</span>
                <span className="badge bg-dark rounded-pill">{ totalProducts }</span>
            </h4>
            <ul className="list-group mb-3">
                {cart.map(prod => <ItemCheckout key={prod.id} {...prod} />)}
                

                <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>${ total }</strong>
                </li>
            </ul>
        </div>
    )
}

export default DetailCheckout;