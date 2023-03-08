import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react'
import TableRender from '../../../shared/TableRender/TableRender';

const ProductsPrincipal = () => {
    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_url_server_local;
    useEffect(() => {
        fetch(`${url}productos`)
          .then(
            response => response.json()
            )
          .then(
                data => {
                    //console.log(data.content);
                    setData(data.content);
            });
      }, []);
    const test = [{"id":1,"name":"test","apellido":"tester"},{"id":2,"name":"test2","apellido":"tester2"}];
    console.log(data);
    return(
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h2 className='mt-3'>Productos</h2>
            { (data.length > 0) ?<TableRender element="prod" key="table-products" elements={data} haveActions={true}/> : ''}
        </div>
    )
}

export default ProductsPrincipal;