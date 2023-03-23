import { useEffect, useState } from 'react'
import TableRender from '../../../shared/TableRender/TableRender';
import { Link } from 'react-router-dom';
import { notificationModal } from '../../../notification/NotificationService';

const ProductsPrincipal = () => {
    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_url_server_local;

    const loadProducts = () =>{
      fetch(`${url}productos`)
        .then(
          response => response.json()
          )
        .then(
              data => {
                  //console.log(data.content);
                  setData(data.content);
        });      
    }
    
    useEffect(() => {
      loadProducts();
    }, []);

    const deleteProduct = async(cod) => {
      const options = {
          method: "DELETE"
      };
      
      try {
          const res =  await fetch(`${url}productos/eliminar-producto/${cod}`,options)
          const response = await res.json();
          
          if(response.isOk === false){
              notificationModal('Ocurrió un error al intentar borrar el producto.','','error');
              return
          }
          notificationModal("","Producto borrado.","success");
          loadProducts();
  
      } catch (error) {        
          console.error(error);
      }
    }
    
    
    return(
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* <h2 className='mt-3'>Productos</h2> */}
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Gestión de Productos</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <Link to="/backoffice/productos/nuevo-producto" className="btn btn-sm btn-outline-success">                    
                    Nuevo Producto
                  </Link>
                </div>                
              </div>
            </div>
            { (data.length > 0) ?<TableRender element="prod" key="table-products" elements={data} haveActions={true} functionToDelete={deleteProduct}/> : ''}
        </div>
    )
}

export default ProductsPrincipal;