import ItemCount from "../ItemCount/ItemCount"


const ItemDetail = ({name, img, price,description,stock}) =>{    

    return(
            
        <>   
        {/* <div className="row p-4 justify-content-center">
            <div className="col-3">
                <div className="card h-100">
                    <img src={img} className="card-img-top" alt={img}/>
                    <h5 className="card-title">{name}</h5>
                    <div className="card-body">
                        <p className="card-text">${price}</p>
                        <p className="card-text">{description}</p>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="btn btn-danger">Agregar</a>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="container-fluid mt-4 p-4 d-flex justify-content-center">

            <div className="card mb-3" style={{maxWidth:'50vw'}}>
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src={img} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-6 p-4 mt-4">
                        <div className="card-body p-4">
                            <h3 className="card-title mt-4 mb-4">{name}</h3>
                            <p className="card-text mt-4 mb-4">{description}</p>
                            <h5 className="card-title mt-4">${price}</h5>
                        </div>
                        <>
                          <ItemCount stock={stock}/>  
                        </>
                        
                    </div>                    
                </div>
            </div>
        </div>
      
      </>
        
    )
}
export default ItemDetail