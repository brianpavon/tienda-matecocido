import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner/Spinner";
import "./Login.css";

const Login = () => {
    const { signInWithGoogle, signInWithEmailPass,createUserWithEmailPass } = useAuth();
    const [user,setUser] = useState({
        email: '',
        password: ''
    });
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = () => {
        //console.log('registrar usuario');
        setLoading(true);
        createUserWithEmailPass(user.email,user.password,()=>{
            
            navigate(-1);
        })
        .catch( error => {
            console.log(error);
        })
        .finally(() => {
            //console.log('fin');
            setLoading(false);
        })
    }

    const handleLoginWithEmail = () => {
        //console.log('login con email');
        //console.log(user.email);
        setLoading(true);
        signInWithEmailPass(user.email,user.password,()=>{
            navigate(-1);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
           //console.log('finally');
            setLoading(false);
        })
    }

    const handleLoginWithGoogle = () =>{
        //console.log('login con google');
        setLoading(true);
        signInWithGoogle(() =>{
            //console.log(res);
            navigate(-1)
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            //console.log('finish');
            setLoading(false);
        })
    }

    if(loading) {
        return (
            <div className="loading">
                <Spinner/>
            </div>
        )
    }

    return(        
        <div className="container py-4 mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4 border rounded-3">
                    <form className="form-signin p-3">
                        <h1  className="h3 mb-3 font-weight-normal">Ingreso</h1>

                        <label htmlFor="inputEmail" className="sr-only">Email</label>
                        <input type="email"className="text-center form-control mt-2 mb-2" placeholder="Email" required autoFocus onChange={({target}) => setUser({...user,email:target.value})} />
                    
                        <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
                        <input type="password"  className="text-center form-control mt-2 mb-2" placeholder="Contraseña" required onChange={({target}) => setUser({...user,password:target.value})}/>
                        
                        <button className="btn btn-dark btn-block mt-2 m-2" type="button" onClick={handleLoginWithEmail}>Ingresar</button>
                        <button className="btn btn-outline-dark btn-block mt-2 m-2" type="button" onClick={handleRegister}>Registrarme</button>

                        <div className="row mt-3 border-top p-2">
                            <label>Podes usar tu cuenta de Google</label>
                            <div className="col">                                
                                <button className="btn btn-light m-2" type="button" onClick={handleLoginWithGoogle}>
                                    <img src="../images/google_logo.png" className="me-2" width='20' height='20' alt="logo-google"/>
                                    Continuar con Google
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;