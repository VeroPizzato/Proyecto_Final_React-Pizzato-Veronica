import { useEffect, useState } from 'react';

const ItemCount = ({cantidadInicial, stock, onAdd}) => {
    const [stockDisponible, setStockDisponible]  = useState(stock);
    const [cantidad, setCantidad] = useState(cantidadInicial);    

    const addToCart = () => {
        if (cantidad <= stockDisponible) {         
            setCantidad(0); // reinicio el contador                       
            onAdd(cantidad);
        }
    }
    
    const onIncrease = () => {
        if (cantidad < stockDisponible){
            setCantidad(cantidad + 1);
        }       
    }

    const onDecrease = () => {
        if (cantidad > 0){
            setCantidad(cantidad - 1)
        }       
    }

    useEffect(() => {
        setStockDisponible(stock);
    }, [stock]);

    return ( 
        <div className="container">
            {/* <h5>Stock Disponible: {itemsStock}</h5>  */}
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
                    <button type="button" className="btn btn-secondary btnCambioColor" onClick={() => addToCart()}>Agregar Al Carrito</button>
                </div>
            </div>
        </div>        
    )
}

export default ItemCount;