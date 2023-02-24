const ItemCheckout = ({name,price,quantity})=>{
    
    return(
        <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 className="my-0">
                    { name }
                    <small className="ms-2 text-muted">${price} x { quantity }</small>
                </h6>
            </div>
            <span className="text-muted">${ price*quantity }</span>
        </li>
    )
}
export default ItemCheckout;