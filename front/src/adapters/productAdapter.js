export const createAdaptedProductFromFirestore = ( doc ) => {
    const data = doc.data();

    const productAdapted = {
        id: doc.id,
        name: data.name,
        img: data.img,
        imagenes:data.imagenes,
        price: data.price,
        category: data.category,
        description: data.description,
        stock: data.stock
    }
    return productAdapted;
}