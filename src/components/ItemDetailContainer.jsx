import ItemDetail from "./ItemDetail"
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemDetailContainer = () => {
    const [item, setItem] = useState();
    const [cargando, setCargando] = useState(true);
    const {idItem} = useParams();  // el useParam me pasa idItem como string

    useEffect(() => {
        const db = getFirestore();
        const producto = doc(db, "productos", idItem);
        getDoc(producto).then(resultado => {
            if (resultado.exists){
                setItem({id:resultado.id, ...resultado.data()})
                setCargando(false);
            }
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