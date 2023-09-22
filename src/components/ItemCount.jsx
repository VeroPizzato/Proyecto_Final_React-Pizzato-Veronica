import { useEffect, useState } from 'react';

const ItemCount = ({cantidadInicial, stock}) => {
    const [itemsStock, setItemsStock]  = useState(stock);
    const [cant, setCant] = useState(cantidadInicial);

    function onAdd() {
        if (cant <= itemsStock){
            setItemsStock(itemsStock - cant);
            setCant(0); // reinicio el contador
        }
    }
    
    const onIncrease = () => {
        if (cant < itemsStock){
            setCant(cant + 1);
        }       
    }

    const onDecrease = () => {
        if (cant > 0){
            setCant(cant - 1)
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
                        <button type="button" className="btn btn-light mx-2">{cant}</button>
                        <button type="button" className="btn btn-light mx-2" onClick={onIncrease}>+</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-secondary btnDetalle" onClick={() => onAdd()}>Agregar al carrito</button>
                </div>
            </div>
        </div>        
    )
}

export default ItemCount;