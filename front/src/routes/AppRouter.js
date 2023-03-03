import { Route, Routes, useLocation } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import Checkout from '../components/Checkout/Checkout';
import CartContainer from '../components/CartContainer/CartContainer';
import Login from '../components/Login/Login';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer/Footer';
import Dashboard from '../components/Dashboard/Panel/Dashboard';
import AbmProducts from '../components/Dashboard/Products/AbmProducts';
import DashboardGuard from '../guards/Dashboard-guard';
import NavigationDashboard from '../components/Dashboard/NavigationDashboard/NavigationDashboard';

const AppRouter = ()=>{
    //const { user } = useAuth();
    const location = useLocation();
    
    return(
        <>
        { location.pathname.startsWith('/dashb') ? <NavigationDashboard/> : <Navbar/>}
        
        <Routes>                
            
            <Route path='/dashboard/' element={<DashboardGuard/>}>
                <Route path='' element={<Dashboard/>}/>
                <Route path='products' element={<AbmProducts/>}/>
            </Route>
            
            <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
            <Route path='/category/:categoryId' element={<ItemListContainer/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
            {/* <Route path='/cart' element={<CartContainer/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/login' element={<Login/>} /> */}
        </Routes>
        { location.pathname.startsWith('/dashb') ? '' : <Footer/>}
        
        </>
    )
}

export default AppRouter;