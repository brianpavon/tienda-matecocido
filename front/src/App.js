//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      
      <CartProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* <Navbar /> */}
              <AppRouter/>
              {/* <Footer/> */}
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
       
    </div>
  );
}

export default App;
