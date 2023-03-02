import { Route, Routes } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


const AppRouter = ()=>{
    
    //console.log(user);
    return(
        <>
        <Navbar/>
        <Routes>            
            <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
            <Route path='/category/:categoryId' element={<ItemListContainer/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
        </Routes>
        <Footer/>
        </>
    )
}

export default AppRouter;