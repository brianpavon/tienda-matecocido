//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import AppRouter from './routes/AppRouter';
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
=======
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777

function App() {
  
  return (
<<<<<<< HEAD
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
              <AppRouter/>
            <Footer/>
          </AuthProvider>
=======
    <div className="App">      
      <CartProvider>
        <BrowserRouter>
          <Navbar />
            <AppRouter/>
          <Footer/>
>>>>>>> 8896f7c6732e5cf4ecc4ca23a9b151fdc1172777
        </BrowserRouter>
      </CartProvider>
       
    </div>
  );
}

export default App;
