import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import './Products.css';

const AbmProducts = () => {
    const [categorias, setCategorias] = useState([]);
    const [colores, setColores] = useState([]);
    const url = process.env.REACT_APP_url_server_local;
    useEffect(() => {
        fetch(`${url}categorias`)
          .then(
            response => response.json()
            )
          .then(
                data => {
                    
                    const categoriasDB = data.content;
                    const opcionesCategorias = categoriasDB.map(({ codigo, nombre }) => ({ codigo, nombre }))                    
                    setCategorias(opcionesCategorias);
            });
    }, []);

    useEffect(() => {
        fetch(`${url}colores`)
          .then(
            response => response.json()
            )
          .then(
                data => {                    
                    const coloresDB = data.content;                    
                    const opcionesColores = coloresDB.map(({ codigo, nombre,path_img }) => ({ codigo, nombre,path_img }))
                    setColores(opcionesColores);
            });
    }, []);

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [coloresSeleccionados, setColoresSeleccionados] = useState([]);
    //console.log(categoriasSeleccionadas,coloresSeleccionados);

    const handleSelectCategoria = (event) => {
        const opcionCateg = event.target;
        const codCateg = opcionCateg.value;
       
        if(opcionCateg.checked){
            setCategoriasSeleccionadas(prev => [...prev,codCateg])
        }else{
            const selectCategs = categoriasSeleccionadas.filter(categ => categ !== codCateg );
            setCategoriasSeleccionadas(selectCategs);
        }
    };

    const handleSelectColor = (event) => {
        const opcionColor = event.target;
        const codColor = opcionColor.value;
       
        if(opcionColor.checked){
            setColoresSeleccionados(prev => [...prev,codColor])
        }else{
            const selectColores = coloresSeleccionados.filter(color => color !== codColor );
            setColoresSeleccionados(selectColores);
        }
    };

    
    
    return(
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Alta de Producto</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <Link to="/backoffice/productos" className="btn btn-sm btn-dark">                    
                    Volver
                  </Link>                  
                </div>        
              </div>
            </div>
            <div className="container py-4 mt-3">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 border rounded-3">
                    <form className="form-signin p-3">
                        <h1  className="h3 mb-3 text-start font-weight-normal">Cargue los datos del nuevo producto</h1>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código del producto:</label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control"/>
                                <p className="text-muted">No ingrese espacios, ni carácteres especiales (solo acepta guiones)</p>
                            </div>
                        </div>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Nombre del producto:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Descripción del producto:</label>
                            <div className="col-sm-8">
                                <textarea className="form-control"/>
                            </div>
                        </div>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Precio:</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control"/>
                            </div>
                        </div>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Stock:</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control"/>
                            </div>
                        </div>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Categorías del producto:</label>
                            <div className="col-sm-4">
                                <div className="border-bottom">
                                    <ul className="ulCheckbox list-group text-start">
                                        {categorias.map(cat => 
                                            <li key={cat.codigo} className="list-group-item">
                                                <input className="form-check-input me-2" type="checkbox" value={cat.codigo} onChange={handleSelectCategoria}></input>
                                                {cat.nombre}
                                            </li>)
                                        }
                                    </ul>
                                </div>                            
                            </div>
                        </div>

                        <div className="mb-3 row ">
                            <label htmlFor="inputPassword" className="text-end col-sm-3 col-form-label">Colores del producto:</label>
                            <div className="col-sm-4">
                                <div className="border-bottom">
                                    <ul className="list-group text-start align-middle">
                                    {
                                        colores.map( color =>
                                            <li key={color.codigo} className="list-group-item">
                                                <input className="form-check-input me-2" type="checkbox" value={color.codigo} onChange={handleSelectColor}></input>
                                                {color.nombre}                                            
                                                <img className="ps-2" src={color.path_img} alt={`color_${color.nombre}`}/>                                            
                                            </li>
                                            )
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 row text-end">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Imágenes del producto:</label>                        
                            <div className="col-sm-8">
                                <input className="form-control" type="file" id="formFile"/>  
                            </div>
                        </div>

                        <button className="btn btn-dark btn-block mt-2 m-2" type="button">Crear el Producto</button>
                    </form>
                </div>
            </div>
        </div>

        </div>
    )
}

export default AbmProducts;