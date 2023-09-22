import Carrito from "../img/carrito.png"
import { Link } from "react-router-dom";

const CartWidget = () => {
    return (
        <div>
            <Link to={"/"} className="btn btn-ligth">
                <button type="button" className="btn btn-ligth position-relative">
                    <img src={Carrito} alt="Logo de carrito de compras" width="32" />
                    <span id="cantidadProdu" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
                </button>
            </Link>
        </div>
    )
}

export default CartWidget;