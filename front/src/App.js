//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={"Todas nuestras piezas"}/>} />
          <Route path='/category/:categoryId' element={<ItemListContainer/>} />
          <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
        </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
