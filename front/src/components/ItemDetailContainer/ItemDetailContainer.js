import { useParams } from "react-router-dom";
import Spinner from '../Spinner/Spinner'
import ItemDetail from "../ItemDetail/ItemDetail";
import { useAsync } from "../../hooks/useAsync";
import { getProductById,getProductByCode } from "../../services/firebase/firestore/products";
import { notificationModal } from "../../notification/NotificationService";

const ItemDetailContainer = ()=>{    
    //console.log(getProductsDB());
    const { productCode } = useParams()
    
    // const productById = () => getProductById(productId);    
    // const {data:product,error,loading} = useAsync(productById,[productId]);
    
    const productByCode = () => getProductByCode(productCode);
    
    const {data:product,error,loading} = useAsync(productByCode,[productCode]);
    
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