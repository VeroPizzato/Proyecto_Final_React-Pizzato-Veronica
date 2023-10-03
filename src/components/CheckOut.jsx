import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { collection, getFirestore, addDoc, doc, updateDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const emailValido = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const CheckOut = () => {
    const { cart, totalMonto, clear } = useContext(CartContext);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");    
    const [orderId, setOrderId] = useState("");

    const generarOrden = () => {

        const nombreDeUsuario = document.getElementById('usuario');  
        const numeroDeTelefono = document.getElementById('tel');
        const direccionEmail = document.getElementById('dire');

        if (usuario.value === "") {  // nombre.length === 0
            Swal.fire({
                title: 'Por favor, ingrese su nombre.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })           
            usuario.focus();
            return false;
        }
        else if (!/^[a-z A-Z]+$/.test(nombreDeUsuario.value)){
            Swal.fire({
                title: 'Por favor, ingrese un nombre válido.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })        
            usuario.focus();
            return false;
        }

        if (tel.value === "") {  // telefono.length === 0
            Swal.fire({
                title: 'Por favor, ingrese un numero de telefono.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })             
            tel.focus();
            return false;
        }
        else {
            if (isNaN(numeroDeTelefono.value)){
                Swal.fire({
                    title: 'Por favor, ingrese un numero de telefono válido.',                           
                    icon: 'warning',  
                    confirmButtonColor: '#a52a2a',                               
                    confirmButtonText: 'Aceptar',
                })                 
                tel.focus();
                return false;
            }
        }
        
        if (dire.value === "") {  // email.length === 0
            Swal.fire({
                title: 'Por favor, ingrese su correo electrónico.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })              
            dire.focus();
            return false;
        }
        else if (!emailValido(direccionEmail.value)) {
            Swal.fire({
                title: 'Por favor, ingrese un correo electrónico válido.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })              
            dire.focus();
            return false;
        }

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
                            <input type="text" required id="usuario" className="form-control my-2" placeholder="Nombre y Apellido" onInput={(e) => { setNombre(e.target.value) }} />
                        </div>
                        <div>
                            <label for="email" className="form-label"><b>E-mail</b> </label> 
                            <input type="text" required id="dire" className="form-control my-2" placeholder="Email" onInput={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div>
                            <label for="telefono" className="form-label"><b>Teléfono</b> </label> 
                            <input type="text" required id="tel" className="form-control my-2" placeholder="teléfono" onInput={(e) => { setTelefono(e.target.value) }} />
                        </div>
                        <button type="button" className="btn btn-secondary btnCambioColor my-2" onClick={generarOrden}>Generar Orden</button>
                    </form>
                </div>               
            </div>
            <div className="row">
                <div className="col-text-center">
                    {orderId ? <Navigate to={"/order/" + orderId} /> : ""}
                </div>
            </div>
        </div>
    )
}

export default CheckOut;