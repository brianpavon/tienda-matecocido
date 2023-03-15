import { Route, Routes, useLocation } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import Checkout from '../components/Checkout/Checkout';
import CartContainer from '../components/CartContainer/CartContainer';

const AppRouter = ()=>{
    //const { user } = useAuth();
    const location = useLocation();
    
    return(
        <>
        { location.pathname.startsWith('/backoffice') ? <NavigationDashboard/> : <Navbar/>}
        
        <Routes>                
            
            <Route path='/backoffice/' element={<DashboardGuard/>}>
                <Route path='' element={<Dashboard/>}/>
                <Route path='productos/nuevo-producto' element={<AbmProducts/>}/>
                <Route path='productos' element={<ProductsPrincipal/>}/>
                <Route path='ordenes-compra' element={<OrdersCustomers/>}/>
                <Route path='clientes' element={<Customers/>}/>
                <Route path='reportes' element={<Reports/>}/>
                <Route path='secciones-pagina' element={<Sections/>}/>
            </Route>
            
            <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
            <Route path='/categorias/:codCateg' element={<ItemListContainer/>} />
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