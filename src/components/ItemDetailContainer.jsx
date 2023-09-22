import productos from "../json/productos.json"
import ItemDetail from "./ItemDetail"
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
    const [item, setItem] = useState();
    const [cargando, setCargando] = useState(true);
    const {idItem} = useParams();  // el useParam me pasa idItem como string

    useEffect(() => {
        const promesa = new Promise((resolve) => {
            setTimeout(() => {
                let producto = productos.find(item => item.id === parseInt(idItem))  
                resolve(producto);
                setCargando(false);
            }, 2000);
           
        });

        promesa.then(data => {
            setItem(data);
        }) 
    }, [idItem]);

    if (cargando) return <Loading texto={"Cargando Producto Seleccionado.."} />   
   
    return (
        <>
            <ItemDetail producto={item} />
        </>
    )        
}

export default ItemDetailContainer;