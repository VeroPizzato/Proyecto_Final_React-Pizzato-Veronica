import { useContext, useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ItemDetail = ({producto}) => {
    const [item, setItem] = useState({});
    const {addItem} = useContext(CartContext);
    const [cantidad, setCantidad] = useState(0);
    const [stockDisponible, setStockDisponible]  = useState(producto.stock);

    const onAdd = (quantity) => {       
        addItem(item, quantity);
        setCantidad(quantity);
        setStockDisponible(stockDisponible - quantity);
    };

    useEffect(() => {
        setItem(producto);
    }, [producto]);

    return (      
        // col-md-5:2 columnas
        <div className="container my-4">                  
            <div className="row align-items-center align-self-center">                            
                <div className="col-md-5 offset-md-1">                    
                    <img src={item.imagen} alt={item.nombre} className="img-fluid"/>
                </div>
                <div className="col-md-5 text-center">
                    <h2>{item.nombre}</h2>
                    <p>{item.descripcion}</p>
                    <h3>${item.precio}</h3>   
                    <h5>Stock Disponible: {stockDisponible}</h5>                                                                                
                    {cantidad>0 ? <Link to={"/cart"} className="btn btn-secondary btnCambioColor">Finalizar Compra</Link> : <ItemCount cantidadInicial={0} stock={producto.stock} onAdd={onAdd}/>}                                      
                </div>
            </div>         
        </div>
    )        
}

export default ItemDetail;
