import Item from "../Item/Item";

const ItemList = ({products}) =>{
    return(
        <div className="row row-cols-md-4 justify-content-center g-4 p-4">
            {products.map(prod => <Item key={prod.codigo}{...prod}/>)}
        </div>
    )
}

export default ItemList;