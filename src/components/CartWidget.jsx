import Carrito from "../img/carrito.png"
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const CartWidget = () => {
    const { totalItems } = useContext(CartContext);

    return (      
        (totalItems() > 0) ?           
            <Link to={"/cart"} className="btn btn-ligth position-relative mx-2">
                <img src={Carrito} alt="Logo de carrito de compras" width="32" />
                <span id="cantidadProdu" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{totalItems()}</span>            
            </Link>                  
        : ""    
    )}

export default CartWidget;