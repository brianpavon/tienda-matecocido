//import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';

function App() {
  
  return (
    <div className="App">
      
      <CartProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppRouter/>            
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
       
    </div>
  );
}

export default App;
