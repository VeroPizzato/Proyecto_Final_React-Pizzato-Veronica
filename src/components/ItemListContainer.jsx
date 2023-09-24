import {  useEffect, useState } from "react";
import ItemList from "./ItemList";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { collection, getFirestore, getDocs, query, where } from "firebase/firestore";


const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(true);
    const {nombreCategoria} = useParams();

    // Acceder a una colleccion de documentos desde firestore
    useEffect(() => {
        const db = getFirestore(); 
        const itemsCollection = collection(db, "productos");
        const q = nombreCategoria ? query(itemsCollection, where("categoria", "==", nombreCategoria)) : itemsCollection;
        getDocs(q).then(resultado => {
            if (resultado.size === 0) {
                console.log("No hay productos en la coleccion");
            } else {
                setItems(resultado.docs.map(producto => ({ id: producto.id, ...producto.data() })));
                setCargando(false);
            }
        });
    }, [nombreCategoria]);

    if (cargando) return <Loading texto={"Cargando Productos.."} /> 

    return (      
        // my: margin-top y margin-bottom
        // mx: margin-left y margin-right
        <div className="my-2 mx-4">
            <div className="row">         
                 <ItemList items={items} />
            </div>
        </div>
    );            
}

export default ItemListContainer; 