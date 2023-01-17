const products = [
    { 
        id: '1',
        name: 'Taza Peperina',
        price: 1600,
        category: 'tazas',
        img:'../images/products/taza_peperina.jpg',
        stock: 25,
        description:'Taza de 250 cc, 4 asas de colores'
    },
    { 
        id: '2', 
        name: 'Taza Jengibre', 
        price: 1800, 
        category: 'tazas', 
        img:'../images/products/taza_jengibre.jpg', 
        stock: 16, 
        description:'Taza de 300 cc, 2 colores disponibles'
    },
    { 
        id: '3', 
        name: 'Taza Cafecitas con Plato', 
        price: 1200, 
        category: 'combos', 
        img:'../images/products/tazas_cafecitas.jpg', 
        stock: 10, 
        description:'Tazas para café con plato, se pueden elegir el color de las asas. Se venden en pares.'
    },
    { 
        id: '4', 
        name: 'Florero Pequeño', 
        price: 1200, 
        category: 'hogar-deco', 
        img:'../images/products/florero_chico.jpg', 
        stock: 10, 
        description:'Florero chico, ideal para ambientar los espacios interiores.'
    },
    { 
        id: '5', 
        name: 'Taza Mate Cocido', 
        price: 1600, 
        category: 'tazas', 
        img:'../images/products/tazas_matecocido.jpg', 
        stock: 10, 
        description:'Tazas de 250 cc, 2 colores disponibles.'
    },
    { 
        id: '6', 
        name: 'Jarra Menta', 
        price: 2000, 
        category: 'hogar-deco', 
        img:'../images/products/jarra_menta.jpg', 
        stock: 10, 
        description:'Jarra ideal para las limonadas de verano.'
    }
]


export const getProducts = () => {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 800)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 800)
    })
}

export const getProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 800)
    })
}