import { useParams } from "react-router-dom";
import Spinner from '../Spinner/Spinner'
import ItemDetail from "../ItemDetail/ItemDetail";
import { useAsync } from "../../hooks/useAsync";
import { getProductById,getProductsDB } from "../../services/firebase/firestore/products";
import { notificationModal } from "../../notification/NotificationService";

const ItemDetailContainer = ()=>{    
    //console.log(getProductsDB());
    const { productId } = useParams()
    //const productsDB = () => getProductsDB();
    const productById = () => getProductById(productId);
    //const {data:product,error,loading} = useAsync(productsDB,[]);
    const {data:product,error,loading} = useAsync(productById,[productId]);
    //console.log(data);
    if(loading) {
       return (
            <Spinner/>
        )
    }

    if(error){
        notificationModal('','Ha ocurrido un error','error');
    }
    
    return(
        <div className="container">            
            <ItemDetail {...product}/>
        </div>
    )
}

export default ItemDetailContainer;