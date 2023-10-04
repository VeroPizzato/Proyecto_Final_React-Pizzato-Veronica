import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { collection, getFirestore, addDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const CheckOut = () => {
    const { cart, totalMonto, clear } = useContext(CartContext);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");    
    const [orderId, setOrderId] = useState("");
    
    const emailValido = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    const validarNombre = nom => {
        const nombreDeUsuario = document.getElementById('usuario');
        if (!/^[a-z A-Z]+$/.test(nom)){
            nombreDeUsuario.classList.add("datoInvalido")        
            nombreDeUsuario.classList.remove("datoValido")           
        }
        else{
            nombreDeUsuario.classList.add("datoValido")  
            nombreDeUsuario.classList.remove("datoInvalido")         
        }
    }
        
    const validarEmail = mail => {
        const direccionEmail = document.getElementById('dire');
        if (!emailValido(mail)) {
            direccionEmail.classList.add("datoInvalido")        
            direccionEmail.classList.remove("datoValido")           
        }
        else{
            direccionEmail.classList.add("datoValido")  
            direccionEmail.classList.remove("datoInvalido")         
        }
    }

    const validarTelefono = nroTel => {
        const numeroDeTelefono = document.getElementById('tel');
        if (isNaN(nroTel)){
            numeroDeTelefono.classList.add("datoInvalido")        
            numeroDeTelefono.classList.remove("datoValido")           
        }
        else{
            numeroDeTelefono.classList.add("datoValido")  
            numeroDeTelefono.classList.remove("datoInvalido")         
        }
    }

    const generarOrden = () => { 
        if (nombre.length === 0) {  
            Swal.fire({
                title: 'Por favor, ingrese su nombre.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })           
            return false;
        }       

        if (telefono.length === 0) { 
            Swal.fire({
                title: 'Por favor, ingrese un numero de telefono.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })        
            return false;
        }        
        
        if (email.length === 0) {  
            Swal.fire({
                title: 'Por favor, ingrese su correo electrónico.',                           
                icon: 'warning',  
                confirmButtonColor: '#a52a2a',                               
                confirmButtonText: 'Aceptar',
            })            
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

    function validarEntradaNombre (e){        
        validarNombre(e.target.value);
        setNombre(e.target.value);
    }

    function validarEntradaEmail (e){        
        validarEmail(e.target.value);
        setEmail(e.target.value);
    }

    function validarEntradaTelefono (e){        
        validarTelefono(e.target.value);
        setTelefono(e.target.value) ;
    }

    if (orderId){
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

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-5">
                    <form>
                        <div>
                            <label className="form-label"><b>Nombre</b></label> 
                            <input type="text" required id="usuario" className="form-control my-2" placeholder="Nombre y Apellido" onChange={(e) => validarEntradaNombre(e) } />
                        </div>
                        <div>
                            <label className="form-label"><b>E-mail</b> </label> 
                            <input type="text" required id="dire" className="form-control my-2" placeholder="Email" onChange={(e) => validarEntradaEmail(e)} />
                        </div>
                        <div>
                            <label className="form-label"><b>Teléfono</b> </label> 
                            <input type="text" required id="tel" className="form-control my-2" placeholder="teléfono" onChange={(e) => validarEntradaTelefono(e) } />
                        </div>
                        <button type="button" className="btn btn-secondary btnCambioColor my-2" onClick={generarOrden}>Generar Orden</button>
                    </form>
                </div>               
            </div>            
        </div>
    )
}

export default CheckOut;