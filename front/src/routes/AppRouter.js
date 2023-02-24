import { Route, Routes } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import Checkout from '../components/Checkout/Checkout';
import CartContainer from '../components/CartContainer/CartContainer';
<<<<<<< HEAD
import Login from '../components/Login/Login';
=======
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
const AppRouter = ()=>{
    return(
        <Routes>
            
            <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
            <Route path='/category/:categoryId' element={<ItemListContainer/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
            <Route path='/cart' element={<CartContainer/>} />
            <Route path='/checkout' element={<Checkout/>} />
<<<<<<< HEAD
            <Route path='/login' element={<Login/>} />
=======
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
        </Routes>
    )
}

export default AppRouter;