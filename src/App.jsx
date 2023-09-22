import './styles/App.css'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';

function App() { 
  return (    
      <div>
        <BrowserRouter>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<ItemListContainer />} />
              <Route exact path="/category/:nombreCategoria" element={<ItemListContainer />} />
              <Route exact path="/item/:idItem" element={<ItemDetailContainer />} />            
            </Routes> 
          </CartProvider>         
        </BrowserRouter>
      </div> 
  )
}

export default App;
