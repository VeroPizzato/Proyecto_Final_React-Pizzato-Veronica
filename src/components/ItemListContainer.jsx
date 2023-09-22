import {  useEffect, useState } from "react";
import ItemList from "./ItemList";
import Loading from "./Loading";
import productos from "../json/productos.json"
import { useParams } from "react-router-dom";

const asyncMock= (nombre) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nombre === undefined){
                resolve(productos);
            } else {
                const productosFiltrados = productos.filter(
                    producto => producto.categoria === nombre
                );
                resolve(productosFiltrados);
            }
        }, 2000);
    });
};

const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(true);
    const {nombreCategoria} = useParams();

    useEffect(() => {     
        asyncMock(nombreCategoria).then((data) =>
        {   
            setItems(data)
            setCargando(false);
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