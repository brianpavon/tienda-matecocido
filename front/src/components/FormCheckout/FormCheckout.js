import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
<<<<<<< HEAD
import { useAuth } from "../../context/AuthContext";
const FormCheckout = ({createOrder}) => {
    const { setBuyerData } = useContext(CartContext);
    const { user } = useAuth();    
   
    return(
        <form>
            <div className="row g-3">
                <div className="col-sm-6">
                    <label htmlFor="name" className="form-label">
                    Nombre y Apellido
                    </label>
                    {
                        user ?
                        (
                            <input type="text" className="form-control" value={user.name} readOnly/>
                        )
                        :
                        (
                            <input type="text" className="form-control" placeholder="Ingresá tu nombre y apellido" required 
                            onChange={({ target }) => setBuyerData(prev => ({...prev,name:target.value}))}/>
                        )
                    }                    
                </div>

                {/* <div className="col-sm-4">                    
=======
const FormCheckout = ({createOrder}) => {
    const { setBuyerData } = useContext(CartContext);
    return(
        <form>
            <div className="row g-3">
                <div className="col-sm-4">
                    <label htmlFor="firstName" className="form-label">
                    Nombre 
                    </label>
                    <input type="text" className="form-control" placeholder="Ingresá tu nombre" required 
                    onChange={({ target }) => setBuyerData(prev => ({...prev,name:target.value}))}/>
                </div>

                <div className="col-sm-4">                    
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
                    <label htmlFor="lastName" className="form-label">
                    Apellido
                    </label>                    
                    <input type="text" className="form-control" placeholder="Ingresá tu apellido" required 
                    onChange={({ target }) => setBuyerData(prev => ({...prev,lastname:target.value}))}/>
<<<<<<< HEAD
                </div> */}

                <div className="col-sm-6">
=======
                </div>

                <div className="col-sm-4">
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
                    <label htmlFor="lastName" className="form-label">
                    Teléfono
                    </label>
                    <input type="text" className="form-control" placeholder="Ingresá tu teléfono" required 
                    onChange={({ target }) => setBuyerData(prev => ({...prev,telephone:target.value}))}/>
                </div>

                <div className="col-sm-6">                    
                    <label htmlFor="email" className="form-label">
                    Email
                    </label>
<<<<<<< HEAD
                    {
                        user ?
                        (
                            <input type="email" className="form-control" value={user.email} readOnly/>
                        )
                        :
                        (
                            <input type="email" className="form-control" placeholder="Ingresá tu email" 
                            onChange={({ target }) => setBuyerData(prev => ({...prev,email:target.value}))}/>
                        )
                    }
=======
                    <input type="email" className="form-control" placeholder="Ingresá tu email" 
                    onChange={({ target }) => setBuyerData(prev => ({...prev,email:target.value}))}/>
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
                </div>

                <div className="col-sm-6">
                    <label htmlFor="address" className="form-label">
                    Dirección
                    </label>
                    <input type="text" className="form-control" placeholder="Ingresá tu dirección" required 
                    onChange={({ target }) => setBuyerData(prev => ({...prev,address:target.value}))}/>
                </div>
            </div>
            <button className="mt-4 btn btn-dark" onClick={() => createOrder()}>
              Generar orden
            </button>
        </form>
    )
}

export default FormCheckout;