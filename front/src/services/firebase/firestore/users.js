import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"


export const useUsers = () => {
    const createNewUser = async (id,dataUser) =>{
        try {
            const userRef = doc(db,"users",id);
            await setDoc(userRef,dataUser,{merge:true});
            const user = await getDoc(userRef);
            //console.log(user);
            return user.data();
        } catch (error) {
            console.log(error);
        }

    }

    const updateUser = async (id,data) => {
        try {
            const userRef = doc(db,"users",id);
            await updateDoc(userRef,data);
            const user = await getDoc(userRef);
            return user.data();
        } catch (error) {
            console.log(error);
        }

    }

    const formatUser = (userNoFormated) => {
        return{
            uid: userNoFormated.uid,
            email: userNoFormated.email,
            name: userNoFormated.displayName,
            profilePhoto: userNoFormated.photoURL,
            token: userNoFormated.accessToken,
            auth: userNoFormated.providerData[0].providerId
        }
    }

    return {
        createNewUser,
        updateUser,
        formatUser
    }
}