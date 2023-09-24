import { Link, useParams } from "react-router-dom";

const Order = () => {
    const {orderId} = useParams();
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col text-center">
                    <div className="alert alert-light my-3" role="alert">
                        <h1>GRACIAS POR TU COMPRA!!</h1>
                        <h3>Tu Orden de Compra es {orderId}.</h3>
                        <p><Link to="/" className="btn btn-secondary btnCambioColor text-center my-2">Volver a HOME</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;