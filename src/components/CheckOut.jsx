import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { collection, getFirestore, addDoc, doc, updateDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const CheckOut = () => {
    const { cart, totalMonto, clear } = useContext(CartContext);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");    
    const [orderId, setOrderId] = useState("");

    const generarOrden = () => {

        const buyer = {name: nombre, phone: telefono, email: email};
        const productos = cart.map(item => ({id: item.id, title: item.nombre, quantity: item.quantity, price: item.precio}));  
        const fecha = new Date();
        const date = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}`;
        const total = totalMonto();
        const order = {buyer: buyer, productos: productos, date: date, total: total};

        // Insertar un documento en Firestore
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");
        addDoc(ordersCollection, order).then(resultado => {
            setOrderId(resultado.id);  
            clear();          
        }).catch(
            resultado => {
                console.log("Error!! NO SE PUDO COMPLETAR LA COMPRA");
            }
        )       
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-5">
                    <form>
                        <div>
                            <label for="nombre" className="form-label"><b>Nombre</b></label> 
                            <input type="text" className="form-control my-2" placeholder="Nombre y Apellido" onInput={(e) => { setNombre(e.target.value) }} />
                        </div>
                        <div>
                            <label for="email" className="form-label"><b>E-mail</b> </label> 
                            <input type="text" className="form-control my-2" placeholder="Email" onInput={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div>
                            <label for="telefono" className="form-label"><b>Teléfono</b> </label> 
                            <input type="text" className="form-control my-2" placeholder="teléfono" onInput={(e) => { setTelefono(e.target.value) }} />
                        </div>
                        <button type="button" className="btn btn-secondary btnCambioColor my-2" onClick={generarOrden}>Generar Orden</button>
                    </form>
                </div>               
            </div>
            <div className="row">
                <div className="col-text-center">
                    {orderId ? <Navigate to={"/order/" + orderId} /> : ""};
                </div>
            </div>
        </div>
    )
}

export default CheckOut;