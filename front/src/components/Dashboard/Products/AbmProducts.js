import { useEffect,useRef,useState } from "react";
import { Link } from "react-router-dom";
import { notificationModal, notificationToast } from "../../../notification/NotificationService";
import './Products.css';

const AbmProducts = () => {
    const url = process.env.REACT_APP_url_server_local;
    const [categorias, setCategorias] = useState([]);
    const [colores, setColores] = useState([]);
    const [formValues, setFormValues] = useState({
        codigoProd:'',
        nombre:'',
        descripcion:'',
        precio:'',
        stock:'',
        codigoColor:[],
        codigoCategoria:[],
        imagenes:[]
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [coloresSeleccionados, setColoresSeleccionados] = useState([]);    
    const fileInput = useRef(null);
        
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
    
    const handleChangeValue = (event) => {
        const {name, value} = event.target;        
        setFormValues({...formValues,[name]:value});
    }

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
      
    const handleUploadImage = event => {
        const filesUpload = event.target.files
        const newImages = Array.from(filesUpload).filter(file => !selectedFiles.some(image => image.name === file.name));
        const imgsRepet = Array.from(filesUpload).filter(file => selectedFiles.some(image => image.name === file.name));
        if(imgsRepet.length > 0){

            notificationModal(`Estas intentando subir imágenes que ya elegiste: ${imgsRepet.map(image => image.name).join(', ')}`);
        }
        setSelectedFiles(prev=>[...prev,...newImages]);
    };

    const deleteImagen = (fileToDel) =>{

        const filesUpdated = selectedFiles.filter(file => file.name !== fileToDel)
        setSelectedFiles(filesUpdated);
    }
    
    useEffect(()=>{
        setFormValues(prev=> ({...prev,codigoCategoria:categoriasSeleccionadas,codigoColor:coloresSeleccionados,imagenes:selectedFiles}))
        const dataTransfer = new DataTransfer();
        
        selectedFiles.forEach(file =>{
            dataTransfer.items.add(file);
        })
        fileInput.current.files = dataTransfer.files;
        
    },[categoriasSeleccionadas,coloresSeleccionados,selectedFiles])

    const crearProducto = async(event) => {
        //console.log('en crear el producto');
        event.preventDefault();
        const formData = new FormData();
        
        for (const clave in formValues) {
            if(clave !== 'imagenes'){
                formData.append(clave,formValues[clave]);
            }
        }

        formValues.imagenes.forEach((imagen, index) => {           
            formData.append(`imagenes_${index}`, imagen);
        });

        const options = {
            method: "POST",
            body: formData
        };
        try {
            const res =  await fetch(`${url}productos/nuevo-producto`,options);
            console.log(res);
            // if(!res.ok){           
            //     throw {error: res.status, statusText:res.statusText};
            // }
            // console.log("Se dio de alta correctamente");
            // return await res.json();       
    
        } catch (error) {        
            console.error(error);
        }
    }
    
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
                    <form className="form-signin p-3" onSubmit={crearProducto}>
                        <h1  className="h3 mb-3 text-start font-weight-normal">Cargue los datos del nuevo producto</h1>

                        {/* CODIGO */}
                        <div className="mb-3 row text-end">
                            <label className="col-sm-3 col-form-label">Código del producto:</label>
                            <div className="col-sm-8">
                                <input type="text" name="codigoProd" className="form-control" value={formValues.codigoProd} onChange={handleChangeValue}/>
                                <p className="text-muted">No ingrese espacios, ni carácteres especiales (solo acepta guiones)</p>
                            </div>
                        </div>
                        
                        {/* NOMBRE */}
                        <div className="mb-3 row text-end">
                            <label className="col-sm-3 col-form-label">Nombre del producto:</label>
                            <div className="col-sm-8">
                                <input type="text" name="nombre" className="form-control" value={formValues.nombre} onChange={handleChangeValue}/>
                            </div>
                        </div>
                        
                        {/* DESCRIPCION */}
                        <div className="mb-3 row text-end">
                            <label className="col-sm-3 col-form-label">Descripción del producto:</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" name="descripcion" value={formValues.descripcion} onChange={handleChangeValue}/>
                            </div>
                        </div>
                        
                        {/* PRECIO */}
                        <div className="mb-3 row text-end">
                            <label  className="col-sm-3 col-form-label">Precio:</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" name="precio" value={formValues.precio} onChange={handleChangeValue}/>
                            </div>
                        </div>

                        {/* STOCK */}
                        <div className="mb-3 row text-end">
                            <label className="col-sm-3 col-form-label">Stock:</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" name="stock" value={formValues.stock} onChange={handleChangeValue}/>
                            </div>
                        </div>

                        {/* CATEGORIAS */}
                        <div className="mb-3 row text-end">
                            <label className="col-sm-3 col-form-label">Categorías del producto:</label>
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

                        {/* COLORES */}
                        <div className="mb-3 row ">
                            <label className="text-end col-sm-3 col-form-label">Colores del producto:</label>
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

                        {/* IMAGENES */}            
                        <div className="mb-3 row text-end">
                            <label className="col-sm-3 col-form-label">Imágenes del producto:</label>                        
                            <div className="col-sm-8">
                                <input ref={fileInput} className="form-control" type="file" accept=".png, .jpg, .jpeg" multiple onChange={handleUploadImage}/>                                
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                                    
                            {selectedFiles.map(file => (
                                <div key={`${file.name}-div`} className="col mt-2 position-relative">
                                    <button key={`${file.name}-btn`} type="button" className="btn-close position-absolute top-0" aria-label="Close" onClick={() => deleteImagen(file.name)}></button>
                                    <img key={`${file.name}-img`} className="rounded" width="100" height="100" src={URL.createObjectURL(file)} alt="img"/>
                                </div>
                            ))}                           
                        </div>

                        <button className="btn btn-dark btn-block mt-2 m-2" type="submit">Crear el Producto</button>
                    </form>
                </div>
            </div>
        </div>

        </div>
    )
}

export default AbmProducts;