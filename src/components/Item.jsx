import { Link } from "react-router-dom";

const Item = ({ item }) => {
    return (
        // col-md-3: 4 columnas   
        <div className="col-md-3 my-2">
            <div className="card">
                <Link to={"/item/" + item.id}>
                    <img src={item.imagen} className="cardImagen card-img-top" alt={item.nombre} />
                </Link>
                <div className="card-body">
                    <h6 className="card-text text-center">{item.nombre}</h6> 
                    <h3 className="text-center">${item.precio}</h3>
                </div>
                <Link to={"/item/" + item.id} className="btn btn-secondary text-decoration-none text-center btnDetalle">
                    Ver detalle
                </Link>
            </div>
        </div>
    )
}

export default Item;