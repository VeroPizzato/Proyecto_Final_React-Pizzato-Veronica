import { useContext, useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ItemDetail = ({producto}) => {    
    const {addItem, getItem} = useContext(CartContext);
    const [cantidad, setCantidad] = useState(0);
    const [stockDisponible, setStockDisponible]  = useState(producto.stock);

    const onAdd = (quantity) => {      
      
        addItem(producto, quantity);
        setCantidad(quantity);
        setStockDisponible(stockDisponible - quantity);
    };

    function actualizarStock(itemId){
        const item = getItem(itemId); 
        if (item){
            setStockDisponible(stockDisponible - item.quantity)
        }
    }

    useEffect(() => {
        actualizarStock(producto.id);
    }, []);    

    return (      
        // col-md-5:2 columnas
        <div className="container my-4">                  
            <div className="row align-items-center align-self-center">                            
                <div className="col-md-5 offset-md-1">                    
                    <img src={producto.imagen} alt={producto.nombre} className="img-fluid"/>
                </div>
                <div className="col-md-5 text-center">
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <h3>$ {producto.precio.toLocaleString()}</h3>   
                    <h5>Stock Disponible: {stockDisponible}</h5>                                                                                
                    {cantidad>0 ? <Link to={"/cart"} className="btn btn-secondary btnCambioColor">Finalizar Compra</Link> : <ItemCount cantidadInicial={0} stock={stockDisponible} onAdd={onAdd}/>}                                      
                </div>
            </div>         
        </div>
    )        
}

export default ItemDetail;
