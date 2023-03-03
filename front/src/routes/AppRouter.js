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
import OrdersCustomers from '../components/Dashboard/OdersCustomers/OrdersCustomers';
import Customers from '../components/Dashboard/Customers/Customers';
import Reports from '../components/Dashboard/Reports/Reports';
import Sections from '../components/Dashboard/Sections/Sections';

const AppRouter = ()=>{
    //const { user } = useAuth();
    const location = useLocation();
    
    return(
        <>
        { location.pathname.startsWith('/backoffice') ? <NavigationDashboard/> : <Navbar/>}
        
        <Routes>                
            
            <Route path='/backoffice/' element={<DashboardGuard/>}>
                <Route path='' element={<Dashboard/>}/>
                <Route path='productos' element={<AbmProducts/>}/>
                <Route path='ordenes-compra' element={<OrdersCustomers/>}/>
                <Route path='clientes' element={<Customers/>}/>
                <Route path='reportes' element={<Reports/>}/>
                <Route path='secciones-pagina' element={<Sections/>}/>
            </Route>
            
            <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
            <Route path='/category/:categoryId' element={<ItemListContainer/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
            {/* <Route path='/cart' element={<CartContainer/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/login' element={<Login/>} /> */}
        </Routes>
        { location.pathname.startsWith('/backoffice') ? '' : <Footer/>}
        
        </>
    )
}

export default AppRouter;