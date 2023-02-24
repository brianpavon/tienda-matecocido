<<<<<<< HEAD
import { collection, writeBatch, addDoc} from "firebase/firestore";
=======
import { collection, query, where, documentId, getDocs, writeBatch, addDoc} from "firebase/firestore";
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
import { db } from "../firebaseConfig";
import { CartContext } from "../../../context/CartContext";
import { useContext } from "react";
import { getProductsByIds } from "./products";

export const OrdersFirestore = ()  =>{
<<<<<<< HEAD
    const { cart, total, buyerData } = useContext(CartContext);
=======
    const { cart, total,clearCart, buyerData } = useContext(CartContext);
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
    
    const createOrder = async () => {
        try {
            
            const objOrder = {
              buyer: {...buyerData },
              items: cart,          
              total,
            };
            
            const batch = writeBatch(db);
      
            //obtener ids de los productos que tengo que traer de firestore
            const ids = cart.map((prod) => prod.id);

            const docs = await getProductsByIds(ids);
            
            const outOfStock = [];
            //comienzo a validar stocks
            
            docs.forEach((doc) => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;
                
                const productAddedToCart = cart.find((prod) => prod.id === doc.id);
                const prodQuantity = productAddedToCart.quantity;
        
                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({id: doc.id, ...dataDoc } );
                }
            });
      
            if (outOfStock.length === 0) {                
                const id = await createNewOrder(objOrder);
                //actualizo el stock
                await batch.commit();
                return { response :'orderCreated',id:id}
            } else {
                return { response: 'outOfStock',productsOutStock : outOfStock}
            }

          } catch (error) {
            return error;
          } 
    }

    const createNewOrder = (objOrder) => {
        return new Promise((resolve, reject) =>{
            
            const orderRef = collection(db, "orders");
    
            addDoc(orderRef, objOrder).then( resp => {
                const {id} = resp
                resolve(id)
            }).catch(error => {
                reject(error);
            })
        })
    }

    return{
        createOrder
    }
}
