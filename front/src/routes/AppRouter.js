import { Route, Routes } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import Checkout from '../components/Checkout/Checkout';
import CartContainer from '../components/CartContainer/CartContainer';
import Login from '../components/Login/Login';
const AppRouter = ()=>{
    return(
        <Routes>
            
            <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
            <Route path='/category/:categoryId' element={<ItemListContainer/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
            <Route path='/cart' element={<CartContainer/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    )
}

export default AppRouter;