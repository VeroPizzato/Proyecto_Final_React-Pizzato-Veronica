import Papelera from "../img/borrar.png" 
import { useContext } from "react";
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, clear, removeItem, totalItems, totalMonto } = useContext(CartContext);

    if (totalItems() === 0) {
        return (
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col text-center">
                        <div className="alert alert-warning my-2" role="alert"> 
                            <h1>No hay productos en el carrito</h1>   
                            <p><Link to="/" className="btn btn-secondary btnCambioColor text-center my-2">Volver a HOME</Link></p>                                                  
                        </div>                                          
                    </div>                    
                </div>                
            </div>
        )
    }

    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col text-center">
                    <h1>Productos Seleccionados</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table">                            
                        <tbody>
                            <tr>
                                <td className="align-middle text-end" colSpan={5} ><button className="btn btn-secondary btnCambioColor my-2" onClick={() => {clear()}} title="Vaciar Carrito">Vaciar Carrito</button></td>
                            </tr> 
                            {
                                cart.map(item => (
                                    <tr>
                                        <td><img src={item.imagen} alt={item.nombre} width={80} /></td>  
                                        <td className="align-middle text-center"><h5>{item.nombre}</h5></td>                                
                                        <td className="align-middle text-center"><h5>{item.quantity} x ${item.precio}</h5></td>
                                        <td className="align-middle text-center"><h5>${item.quantity * item.precio}</h5></td>
                                        <td className="align-middle text-center"><button className="btn btn-secondary my-2" onClick={() => { removeItem(item.id) }} title="Eliminar Producto"><img src={Papelera} alt="Eliminar Producto" width={25} /></button></td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={5} className="align-middle text-end"><h4>Total de la compra: ${totalMonto()}</h4></td>  
                            </tr>
                            <tr>
                                <td className="align-middle text-end" colSpan={5} ><Link to={"/checkout"} className="btn btn-secondary btnCambioColor my-2">Finalizar Compra</Link></td>       
                            </tr> 
                        </tbody>
                    </table>                
                </div>
            </div>
        </div>
    )    
}

export default Cart;