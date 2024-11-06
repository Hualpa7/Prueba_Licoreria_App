import Boton from '../../../Componentes/Boton/Boton';
import NuevaCategoria from '../../../Componentes/Formularios/NuevaCategoria/NuevaCategoria';
import Modal from '../../../Componentes/Modal/Modal';
import PestaniasConfiguraciones from '../../../Componentes/PestaniasConfiguraciones/PestaniasConfiguraciones';
import PlantillaConfiguraciones from '../../../Componentes/PlantillaConfiguraciones/PlantillaConfiguraciones';
import { useState } from 'react';


export default function Categorias({ }) {

    const categorias = [
        "Vinos", "Vodkas","Cervezas","Jugos","Gaseosas","Aguas","Licores","Fernets"
    ]
    const [modalNuevaCategoria, setmodalNuevaCategoria] = useState(false); // Abre o cierra el modal nuevo prodcuto

    const manejamodalNuevaCategoria = () => {
        setmodalNuevaCategoria(!modalNuevaCategoria);
    };

    const navigation = <PestaniasConfiguraciones></PestaniasConfiguraciones>

    const main = <>
        <Boton descripcion="Nueva Categoria" habilitado onClick={manejamodalNuevaCategoria}></Boton>
        <Modal visible={modalNuevaCategoria} titulo="Nueva Categoria" anchura="600px">
            <NuevaCategoria></NuevaCategoria>
        </Modal>
        <h1>Categorias</h1>
        {categorias.map((item,index) => (
            <div key={index}>{item}</div>
          ))}

    </>


    return <PlantillaConfiguraciones navigation={navigation} main={main} />;
}
