import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
<<<<<<< HEAD
import { getAuth } from "firebase/auth"
=======
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);
//es la referencia a la db a la que se va a conectar desde mi aplicación
<<<<<<< HEAD
export const db = getFirestore(app);

export const auth = getAuth(app);
=======
export const db = getFirestore(app);
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
