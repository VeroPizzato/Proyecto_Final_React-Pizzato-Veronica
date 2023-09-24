import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const ItemCount = ({cantidadInicial, stock, onAdd}) => {
    const [itemsStock, setItemsStock]  = useState(stock);
    const [cantidad, setCantidad] = useState(cantidadInicial);
    const [itemAgregado, setitemAgregado] = useState(false);

    const addToCart = () => {
        if (cantidad <= itemsStock) {         
            setItemsStock(itemsStock - cantidad);
            setCantidad(0); // reinicio el contador
            setitemAgregado(true);
            onAdd(cantidad);
        }
    }
    
    const onIncrease = () => {
        if (cantidad < itemsStock){
            setCantidad(cantidad + 1);
        }       
    }

    const onDecrease = () => {
        if (cantidad > 0){
            setCantidad(cantidad - 1)
        }       
    }

    useEffect(() => {
        setItemsStock(stock);
    }, [stock]);

    return ( 
        <div className="container">
            <h5>Stock Disponible: {itemsStock}</h5> 
            <div className="row">
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light mx-2" onClick={onDecrease}>-</button>
                        <button type="button" className="btn btn-light mx-2"><h5>{cantidad}</h5></button>
                        <button type="button" className="btn btn-light mx-2" onClick={onIncrease}>+</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">                
                    {itemAgregado ? <Link to={"/cart"} className="btn btn-secondary btnCambioColor">Terminar mi Compra </Link> : <button type="button" className="btn btn-secondary btnCambioColor" onClick={() => addToCart()}>Agregar Al Carrito</button>}
                </div>
            </div>
        </div>        
    )
}

export default ItemCount;