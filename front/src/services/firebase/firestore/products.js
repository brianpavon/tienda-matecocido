import { db } from "../firebaseConfig";
import { createAdaptedProductFromFirestore } from "../../../adapters/productAdapter";
import { collection, where,query,getDocs, doc, getDoc, documentId } from "firebase/firestore";

export const getProducts = (categoryId) => {
    return new Promise((res,rej) => {
        const collectionRef = categoryId 
                            ? query(collection(db,'products'),where('category','==',categoryId))
                            : collection(db,'products')
        getDocs(collectionRef).then( resp => {            
            const productAdapted = resp.docs.map( doc => {
                return createAdaptedProductFromFirestore(doc);
            });
            res(productAdapted);
        }).catch(error => {
            rej(error);
        });
    })
}

export const getProductsDB = (codCateg) =>{
    return new Promise((res,rej) =>{
        const url = codCateg ? `${process.env.REACT_APP_url_server_local}productos/producto-categoria/${codCateg}` : `${process.env.REACT_APP_url_server_local}productos`;
        //console.log(url);
        fetch(url)
          .then(
            response => response.json()
            )
          .then(
                data => {
                    //console.log(data.content);
                    res(data.content);
            }).catch(error =>{
                console.log(error);
                rej(error)
            })
        });
}

export const getProductByCode = (productCode) => {    
    return new Promise((res,rej) =>{
        const url = `${process.env.REACT_APP_url_server_local}productos/${productCode}`;        
        fetch(url)
          .then(
            response => response.json()
            )
          .then(
                data => {
                    //console.log(data.content);
                    res(data.content);
            }).catch(error =>{
                //console.log(error);
                rej(error)
            })
        });
}

export const getProductById = (productId) => {    
    return new Promise((res,rej) => {

        const docRef = doc(db,'products',productId);

        getDoc(docRef).then( resp => {
            const productAdapted = createAdaptedProductFromFirestore(resp)
            res(productAdapted);
        }).catch(error => {
            rej(error);
        })
    });
}

export const getProductsByIds = (ids) => {
    return new Promise((res,rej) => {
        const producstRef = query(collection(db,'products'),where(documentId(),"in",ids))
        getDocs(producstRef).then( resp => {
            const productsAddated = resp.docs
            res(productsAddated)
        }).catch(error => {
            rej(error);
        })
    })
}