import './styles/App.css'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";

function App() { 
  return (    
      <div>
        <CartProvider>
          <BrowserRouter>          
            <Navbar />
            <Routes>
              <Route exact path="/" element={<ItemListContainer />} />
              <Route exact path="/category/:nombreCategoria" element={<ItemListContainer />} />
              <Route exact path="/item/:idItem" element={<ItemDetailContainer />} />    
              <Route exact path={"/cart"} element={<Cart />} />  
              <Route exact path={"/checkout"} element={<CheckOut />} />              
              <Route exact path="/*" element={<h1>Error 404 Not Found</h1>} /> 
            </Routes>                   
          </BrowserRouter>
        </CartProvider> 
      </div> 
  )
}

export default App;
