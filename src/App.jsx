import './styles/App.css'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() { 
  return (    
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ItemListContainer />} />
            <Route exact path="/category/:nombreCategoria" element={<ItemListContainer />} />
            <Route exact path="/item/:idItem" element={<ItemDetailContainer />} />            
          </Routes>          
        </BrowserRouter>
      </div> 
  )
}

export default App;
