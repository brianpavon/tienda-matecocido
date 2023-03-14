import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { useAsync } from "../../hooks/useAsync";
import { getProducts } from "../../services/firebase/firestore/products";
import { notificationModal } from "../../notification/NotificationService";

const ItemListContainer = ({greeting}) => {
    
    const { categoryId } = useParams()
    const categoria = categoryId ? categoryId.replace('-',' & ') : '';

    const getProductsWithCategory = () => getProducts(categoryId);
    const { data:products,error,loading} = useAsync(getProductsWithCategory, [categoryId] );

    if(loading) {
       return (
        
            <Spinner/>            
        )
    }
    if(error){        
        notificationModal('','Ha ocurrido un error','error');
    }
    return(        
        <>       
        <h3 className={categoryId ? 'mt-3 mb-2 text-capitalize' : 'mt-3 mb-2'}>{!categoryId ? greeting : categoria}</h3>
        <div className="container">
            <ItemList products={products}/>
        </div>
        </>
    
    )
}

export default ItemListContainer;