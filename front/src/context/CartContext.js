import { createContext,useState } from "react";
import { notificationToast } from "../notification/NotificationService";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([]);    
    const [buyerData, setBuyerData] = useState({
        email: '',
        // password: '',
        name: '',
        //lastname: '',
        address: '',
        telephone:''
    })    
   // console.log(buyerData);
    const addItem = (prodToAdd) =>{
        if(!isInCart(prodToAdd.id)){            
            let message = prodToAdd.quantity === 1 ? `Se agregó ${prodToAdd.quantity} producto al carrito` : `Se agregaron ${prodToAdd.quantity} productos al carrito`
            notificationToast(message);
            setCart(prev => [...prev,prodToAdd])
        }else{
            console.log('ya estaba');
        }        
    }

    const removeItem = (id) => {
        const cartUpdated = cart.filter(prod => prod.id !== id );
        setCart(cartUpdated);
        notificationToast('Se eliminó el producto');
    }

    const isInCart = (id) => cart.some(prod => prod.id === id);
    
    const getTotalProducts = () =>{
        let accu = 0;
        cart.forEach(prod => {
            accu += prod.quantity
        });
        return accu;
    }

    const getTotal = ()=>{
        let total = 0;
        cart.forEach(prod => {
            total += prod.quantity * prod.price           
        });
        return total;
    }

    const totalProducts = getTotalProducts();
    const total = getTotal()

    const clearCart = ()=>{
        setCart([]);
    }
   
    return(
        <CartContext.Provider value={{cart,addItem,isInCart,totalProducts,total,clearCart,setBuyerData,buyerData,removeItem}}>
            {children}
        </CartContext.Provider>
    )
}