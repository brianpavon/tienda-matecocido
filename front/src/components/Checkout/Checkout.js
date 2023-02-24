// import { collection, query, where, documentId, getDocs, writeBatch, addDoc} from "firebase/firestore";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import DetailCheckout from "../DetailCheckout/DetailCheckout";
import FormCheckout from "../FormCheckout/FormCheckout";
import { BtnGoHome } from "../Buttons/Buttons";
import Spinner from "../Spinner/Spinner";
import { OrdersFirestore } from "../../services/firebase/firestore/orders";
import { notificationModal } from "../../notification/NotificationService";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { cart, total, clearCart,totalProducts } = useContext(CartContext);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const { createOrder } = OrdersFirestore()

  const handleNewOrder = () =>{
    setLoading(true);
    createOrder().then( resp => {
      if(resp.response === 'orderCreated'){

        setOrderId(resp.id);
        clearCart();        
        setTimeout(() => {
          navigate("/");
        }, 4500);
      }
      if(resp.response === 'outOfStock'){
        const productsOfStock = resp.outOfStock;
        const names  = productsOfStock.map((prod) => prod.name)        
        notificationModal(`${names}`,'Productos sin stock','warning')
      }
    }).catch(error => {
      console.log(error);
    }).finally( () =>{
      setLoading(false);
    })
  }


  if(loading){    
    return(
      <Spinner message={'Creando orden de compra...'}/>
    )
  }

  if(orderId){    
    return(
      <div className="container-fluid">
          <div className="py-5 text-center">
              <h2>El código de tu orden de compra es: <span className="text-muted"> {orderId} </span></h2>
              <p className="text-center text-muted">Gracias por tu compra!</p>
          </div>
          <BtnGoHome/>            
      </div>
    )
  }

  if(cart.length === 0){
      return(
        <div className="container-fluid">
            <div className="py-5 text-center">
                <h2>Aún no tenes productos seleccionados</h2>
            </div>
            <BtnGoHome/>            
        </div>
      )
  }

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Completá tus datos para generar la orden de compra</h2>
      </div>

      <div className="row g-5">
        <DetailCheckout cart={cart} total={total} totalProducts={totalProducts}/>
        
        <div className="col-md-7 col-lg-8">
          <FormCheckout createOrder={handleNewOrder}/>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
