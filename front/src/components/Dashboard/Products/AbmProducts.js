import { useEffect, useState } from 'react'
const AbmProducts = () => {
    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_url_server_local;
    useEffect(() => {
        fetch(`${url}productos`)
          .then(
            response => response.json()
            )
          .then(
                data => {
                    console.log(data.content);
            //setData(data);
            });
      }, []);
    return(
        <h1>ESTAMOS EN PRODUCTOS</h1>
    )
}

export default AbmProducts;