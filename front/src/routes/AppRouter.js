import { Route, Routes } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import Checkout from '../components/Checkout/Checkout';
import CartContainer from '../components/CartContainer/CartContainer';
import Login from '../components/Login/Login';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer/Footer';
import Dashboard from '../components/Dashboard/Dashboard';

const AppRouter = ()=>{
    const { user } = useAuth();
    //console.log(user);
    return(
        <>
        {
            !user 
            ? 
            (
                <>
                <Navbar/>
                <Routes>                
                    <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
                    <Route path='/category/:categoryId' element={<ItemListContainer/>} />
                    <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
                    <Route path='/cart' element={<CartContainer/>} />
                    <Route path='/checkout' element={<Checkout/>} />
                    <Route path='/login' element={<Login/>} />
                </Routes>
                <Footer/>
                </>
            ) 
            : 
            (
                <Routes>                
                    <Route path='/' element={<Dashboard/>} />
                    <Route path='/mi-sitio' element={
                                                        <>
                                                            <Navbar/>
                                                            <ItemListContainer greeting={"Todas nuestras piezas"}/>
                                                            <Footer/>
                                                        </>
                                                    } />
                </Routes>
            )
        }
        </>
    )
}

export default AppRouter;