import { Link } from "react-router-dom";

const Item = ({ item }) => {
  
    const myStyle = {       
        height: '600px'
    };

    return (
        // col-md-3: 4 columnas   
        <div className="col-md-3 my-2">
            <div className="card" style={myStyle}>
                <Link to={"/item/" + item.id}>
                    <img src={item.imagen} className="cardImagen card-img-top" alt={item.nombre} />
                </Link>
                <div className="card-body">
                    <h6 className="card-text text-center">{item.nombre}</h6> 
                    <h3 className="text-center">$ {item.precio.toLocaleString()}</h3>
                </div>
                <Link to={"/item/" + item.id} className="btn btn-secondary btnCambioColor text-center">
                    Ver detalle
                </Link>
            </div>
        </div>          
    )
}

export default Item;