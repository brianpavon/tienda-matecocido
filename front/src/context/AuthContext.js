import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { notificationModal } from "../notification/NotificationService";
import { auth } from "../services/firebase/firebaseConfig";
import { useUsers } from "../services/firebase/firestore/users";
import { CartContext } from "./CartContext";

const useProvideAuth = () => {

    const [user,setUser] = useState(null);
    const { createNewUser, formatUser } = useUsers();
    const { clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    //console.log(user);
    const handleUsers = async(userNoFormated) => {
        if(userNoFormated){
            const user = formatUser(userNoFormated);
            const { token, ...userWithoutToken} = user;
            let userCreated = await createNewUser(user.uid,userWithoutToken);
            setUser(userCreated);
            return user;

        }else{
            setUser(null);
            return false;
        }
    }

    const createUserWithEmailPass = async (email,password,callback) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {            
            const user = userCredential.user;
            const userData = await handleUsers(user);
            callback();
            return userData;            
        })
        .catch((error) => {            
            handleErrorRegister(error.code);
        });
    }

    const signInWithEmailPass = async (email,password,callback) => {        
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userData = await handleUsers(user);
            callback();
            return userData;
        })
        .catch((error) => {
            handleErrorLogin(error.code);
        });
    }
    
    const signInWithGoogle = async (callback) =>{
        const provider = new GoogleAuthProvider();        
        signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            
            //const token = credential.accessToken;
            // The signed-in user info.
            const userGoogle = result.user;
            
            const userLogged = await handleUsers(userGoogle);
            callback();
            return userLogged;
            
        }).catch((error) => {
            //console.log(error);
            // Handle Errors here.
            const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            //notificationModal(errorMessage,errorCode,'error');
            handleErrorLogin(errorCode);
            // ...
        });
    }

    const closeSession = () => {
        
        //console.log(auth);
        signOut(auth)
        .then(() => {
            handleUsers(false);
            clearCart();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleErrorRegister = (errorCode) =>{
        switch (errorCode) {
            case 'auth/invalid-email':
                notificationModal('El mail ingresado no tiene un formato válido.','Mail inválido','warning');
                break;
            case 'auth/internal-error':
                notificationModal('Verifique los datos ingresados y reintente.','Error','error');
                break;
            
            case 'auth/email-already-in-use':
                notificationModal('El mail ya está registrado','El usuario ya existe','warning');
                break;
        
            default:
                break;
        }
    }

    const handleErrorLogin = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                notificationModal('El mail ingresado no tiene un formato válido.','Mail inválido','warning');
                break;

            case 'auth/internal-error':
                notificationModal('Verifique los datos ingresados y reintente.','Error','error');
                break;
            
            case 'auth/user-not-found':
                notificationModal('No se encontró un usuario registrado con ese mail.','Usuario no registrado','warning');
                break;
            
            case 'auth/wrong-password':
                notificationModal('','Contraseña incorrecta','error')
                break;
            case 'auth/popup-closed-by-user':
                notificationModal('Cerraste la ventana de verificación de cuenta de Google.','No se pudo conectar con Google','warning')
                break;
        
            default:
                notificationModal(errorCode,'','error');
                break;
        }
    }

    return {
        signInWithGoogle,
        signInWithEmailPass,
        createUserWithEmailPass,
        user,
        closeSession
    }
}

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}