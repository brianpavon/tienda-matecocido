import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { BtnGoHome } from "../Buttons/Buttons";
import CartDetail from "../CartDetail/CartDetail";
import "./CartContainer.css";

const CartContainer = () => {
  const { cart } = useContext(CartContext);

  if(cart.length === 0){
    return (
        <div className="px-4 px-lg-0">
            <div className="container pt-3 text-center">
            <h2>No hay productos en el carrito</h2>
            </div>        
            <div className="container">            
                <div className="row">
                    <div className="col-lg-12 p-3 bg-white mb-4">                    
                        <BtnGoHome/>
                    </div>
                </div>
            </div>        
        </div>
    )
  }
  
  return (
    <div className="px-4 px-lg-0">
        <div className="container pt-3 text-center">
          <h2>Tus productos</h2>
        </div>        
        <div className="container">            
            <div className="row">
                <div className="col-lg-12 p-3 bg-white rounded shadow-sm mb-4">
                    <CartDetail cart={cart}/>
                    <Link to='/checkout' className="btn btn-dark rounded-pill py-2 btn-block">Ir a Checkout</Link>
                </div>
            </div>
        </div>        
    </div>
  );
};

export default CartContainer;
