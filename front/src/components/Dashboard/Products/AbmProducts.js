import { useEffect,useRef,useState } from "react";
import { Link,useLocation,useNavigate,useParams } from "react-router-dom";
import { notificationModal } from "../../../notification/NotificationService";
import './Products.css';

const AbmProducts = () => {
    const { codProd } = useParams();
    const { state } = useLocation();
    const producto = state;
    const fileInput = useRef(null);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const url = process.env.REACT_APP_url_server_local;
    const [categorias, setCategorias] = useState([]);
    const [colores, setColores] = useState([]);
    const [formValues, setFormValues] = useState({
        codigoProd: producto ? producto.codigo : '',
        nombre:producto ? producto.nombre : '',
        descripcion:producto ? producto.descripcion : "",
        precio:producto ? producto.precio : '',
        stock:producto ? producto.stock : '',
        codigoColor:producto ? producto.colores.map(color=>color.codigo) : [],
        codigoCategoria:producto ? producto.categorias.map(categ=> categ.codigo) : [],
        imagenes: producto ? arrayDeImagenes(producto.imagenes) : []
    });

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
    
    const handleSelect = (event,attr) => {
        const opcion = event.target;
        const cod = opcion.value;
       
        setFormValues(prev => {
            if (opcion.checked) {
              
              const nuevasOpciones = [...prev[attr], cod];
              return {...prev, [attr]: nuevasOpciones};
            } else {
              
              const opcionesActualizadas = prev[attr].filter(attr => attr !== cod);
              return {...prev, [attr]: opcionesActualizadas};
            }
        });
    };
      
    const handleUploadImage = (event) => {
        const filesUpload = event.target.files
        const newImages = Array.from(filesUpload).filter(file => !formValues.imagenes.some(image => image.name === file.name));
        const imgsRepet = Array.from(filesUpload).filter(file => formValues.imagenes.some(image => image.name === file.name));
        if(imgsRepet.length > 0){
            notificationModal(`Estas intentando subir imágenes que ya elegiste: ${imgsRepet.map(image => image.name).join(', ')}`);
        }        
        setFormValues(prev=> {
            const imagenes = [...prev.imagenes,...newImages]
            actualizarInputImg(imagenes);
            return {...prev,imagenes:imagenes}            
        })
    };

    const deleteImagen = (fileToDel) =>{
        setFormValues(prev=> {
            const imagenesActualizadas = prev.imagenes.filter(file => file.name !== fileToDel)
            actualizarInputImg(imagenesActualizadas);
            return {...prev,imagenes:imagenesActualizadas}            
        })
    }

    function arrayDeImagenes(array){
        const arImgs = []
        array.forEach(async(img) => {            
            const file = await getFileFromUrl(`${process.env.REACT_APP_url_server_local}${img.path_img}`,img.nombre)
            arImgs.push(file)            
        })
        
        return arImgs
    }

    async function getFileFromUrl(url, name){
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], name, {
          type: 'image/jpeg',
        });
    }
    
    function actualizarInputImg(array){
        const dataTransfer = new DataTransfer();        
        array.forEach(file =>{
            dataTransfer.items.add(file);
        })
        fileInput.current.files = dataTransfer.files;
    }

    const editarProducto = async(event) =>{
        event.preventDefault();
        //console.log('editando');
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
        
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        
        try {
            const res =  await fetch(`${url}productos/editar-producto/${codProd}`,options)
            const response = await res.json();
            
            if(response.isOk === false){
                notificationModal('Ocurrió un error al editar el producto.','','error');
                resetForm();
                return
            }
            notificationModal("Tu producto fue editado.","Producto editado.","success");
            resetForm();
    
        } catch (error) {        
            console.error(error);
        }
    }
    
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
        
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        
        try {
            const res =  await fetch(`${url}productos/nuevo-producto`,options)
            const response = await res.json();
            
            if(response.isOk === false){
                notificationModal('Ocurrió un error al dar el alta del producto.','','error');
                resetForm();
                navigate("/backoffice/productos");
                return
            }
            notificationModal("Tu producto fue dado de alta.","Producto creado.","success");
            resetForm();
    
        } catch (error) {        
            console.error(error);
        }
    }
    
    const resetForm = () =>{
        formRef.current.reset();
        setFormValues({codigoProd:'',
                nombre:'',
                descripcion:"",
                precio:'',
                stock:'',
                codigoColor:[],
                codigoCategoria:[],
                imagenes:[]}
            )        
    }
    
    return(
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">{codProd ? 'Editar producto' : 'Alta de producto'}</h1>
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
                    <form className="form-signin p-3" onSubmit={codProd ? editarProducto : crearProducto} ref={formRef}>
                        <h1  className="h3 mb-3 text-start font-weight-normal">{codProd ? 'Edite el producto' : 'Cargue los datos del nuevo producto'}</h1>

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
                                        {
                                            producto
                                            ?
                                            categorias.map(cat =>
                                                <li key={cat.codigo} className="list-group-item">
                                                    <input className="form-check-input me-2" type="checkbox" value={cat.codigo} onChange={(event)=>handleSelect(event,'codigoCategoria')} checked={formValues.codigoCategoria.some(prodCateg => prodCateg === cat.codigo)}></input>
                                                    {cat.nombre}
                                                </li>
                                            )
                                            :
                                            categorias.map(cat =>
                                                <li key={cat.codigo} className="list-group-item">
                                                    <input className="form-check-input me-2" type="checkbox" value={cat.codigo} onChange={(event)=>handleSelect(event,'codigoCategoria')}></input>
                                                    {cat.nombre}
                                                </li>
                                            )
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
                                        producto
                                        ?
                                        colores.map( color =>
                                            <li key={color.codigo} className="list-group-item">
                                                <input className="form-check-input me-2" type="checkbox" value={color.codigo} onChange={(event)=>handleSelect(event,'codigoColor')} checked={formValues.codigoColor.some(codColor => codColor === color.codigo)}></input>
                                                {color.nombre}                                            
                                                <img className="ps-2" src={color.path_img} alt={`color_${color.nombre}`}/>                                            
                                            </li>
                                        )
                                        :
                                        colores.map( color =>
                                            <li key={color.codigo} className="list-group-item">
                                                <input className="form-check-input me-2" type="checkbox" value={color.codigo} onChange={(event)=>handleSelect(event,'codigoColor')}></input>
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
                                    
                            {
                                formValues.imagenes.map(file => (
                                   
                                    <div key={`${file.name}-div`} className="col mt-2 position-relative">
                                        <button key={`${file.name}-btn`} type="button" className="btn-close position-absolute top-0" aria-label="Close" onClick={() => deleteImagen(file.name)}></button>
                                        <img key={`${file.name}-img`} className="rounded" width="100" height="100" src={URL.createObjectURL(file)} alt="img"/>
                                    </div>
                                ))
                            }                           
                        </div>

                        <button className="btn btn-dark btn-block mt-2 m-2" type="submit">{codProd ? 'Editar el producto':'Crear el Producto'}</button>
                    </form>
                </div>
            </div>
        </div>

        </div>
    )
}

export default AbmProducts;