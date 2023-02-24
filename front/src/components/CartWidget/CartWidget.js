
const CartWidget = ({totalProducts}) =>{
    return(
        <div className="d-flex justify-content-center">
            <div>
                <img src="../images/shopping_cart.png" alt="img_cart"/>
            </div>
            <div className="mt-2 ms-3 me-3">
                {totalProducts}
            </div>
        </div>
    )
}

export default CartWidget;