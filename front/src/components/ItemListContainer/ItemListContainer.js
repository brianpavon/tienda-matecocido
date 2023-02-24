import ItemList from "../ItemList/ItemList";
import { getProducts, getProductsByCategory } from "../../asyncMock";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()
    const categoria = categoryId ? categoryId.replace('-',' & ') : ''

    useEffect(() => {
        setLoading(true)
        
        const asyncFunction = categoryId ? getProductsByCategory : getProducts
        asyncFunction(categoryId).then(response => {
            setProducts(response)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })          
    }, [categoryId])

    if(loading) {
        //return <h1>Cargando productos...</h1>

       return (
            <Spinner/>            
        )
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