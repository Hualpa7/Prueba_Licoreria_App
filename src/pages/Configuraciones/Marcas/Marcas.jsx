import Boton from '../../../Componentes/Boton/Boton';
import NuevaMarca from '../../../Componentes/Formularios/NuevaMarca/NuevaMarca';
import Modal from '../../../Componentes/Modal/Modal';
import PestaniasConfiguraciones from '../../../Componentes/PestaniasConfiguraciones/PestaniasConfiguraciones';
import PlantillaConfiguraciones from '../../../Componentes/PlantillaConfiguraciones/PlantillaConfiguraciones';
import { useState } from 'react';


export default function Marcas({ }) {

    const marcas = [
        "Quilmes", "Coca Cola","Manaos","Secco","Paso de los Toros","Salta","Smirnoff","Branca"
    ]
    const [modalNuevaMarca, setmodalNuevaMarca] = useState(false); // Abre o cierra el modal nuevo prodcuto

    const manejamodalNuevaMarca = () => {
        setmodalNuevaMarca(!modalNuevaMarca);
    };

    const navigation = <PestaniasConfiguraciones></PestaniasConfiguraciones>

    const main = <>
        <Boton descripcion="Nueva Marca" habilitado onClick={manejamodalNuevaMarca}></Boton>
        <Modal visible={modalNuevaMarca} titulo="Nueva Marca" anchura="600px">
            <NuevaMarca></NuevaMarca>
        </Modal>
        <h1>Marcas</h1>
        {marcas.map((item,index) => (
            <div key={index}>{item}</div>
          ))}

    </>


    return <PlantillaConfiguraciones navigation={navigation} main={main} />;
}
