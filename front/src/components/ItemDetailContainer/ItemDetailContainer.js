import { getProductById } from "../../asyncMock";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../Spinner/Spinner'
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = ()=>{
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const { productId } = useParams()
    

    useEffect(() => {
        getProductById(productId).then(response => {
            //console.log(response);
            setProduct(response)
        }).finally(() => {
            setLoading(false)
        })
    }, [productId])
    
    if(loading) {
       return (
            <Spinner/>
        )
    }
    
    return(
        <div className="container">            
            <ItemDetail {...product}/>
        </div>
    )
}

export default ItemDetailContainer;