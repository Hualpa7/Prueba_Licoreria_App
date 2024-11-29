import Boton from '../../../Componentes/Boton/Boton';
import NuevaMarca from '../../../Componentes/Formularios/NuevaMarca/NuevaMarca';
import Modal from '../../../Componentes/Modal/Modal';
import PestaniasConfiguraciones from '../../../Componentes/PestaniasConfiguraciones/PestaniasConfiguraciones';
import PlantillaConfiguraciones from '../../../Componentes/PlantillaConfiguraciones/PlantillaConfiguraciones';
import { useState, useEffect } from 'react';
import './Marcas.css'
import editar from '../../../assets/editar.png'
import mas from '../../../assets/mas.png'
import ModificarMarca from '../../../Componentes/Formularios/ModificarMarca/ModificarMarca';

export default function Marcas({ }) {

    ////////OBTENER LISTA DE MARCAS
    const [marcas, setMarcas] = useState([]);
    const obtenerDatos = () => {
        fetch('http://127.0.0.1:8000/api/marca')
            .then(respuesta => respuesta.json())
            .then(datos => setMarcas(datos))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    /////////MODAL NUEVA MARCA

    const [modalNuevaMarca, setmodalNuevaMarca] = useState(false); // Abre o cierra el modal nuevo marca
    const manejamodalNuevaMarca = () => {
        if (modalNuevaMarca) {
            obtenerDatos();
        }
        setmodalNuevaMarca(!modalNuevaMarca);
    };

    ////////MODAL MODIFICA MARCA
    const [modalModificaMarca, setmodalModificaMarca] = useState(false); // Abre o cierra el modal modifica marca
    const manejamodalModificaMarca = () => {
        if (modalModificaMarca) {
            obtenerDatos();
        }
        setmodalModificaMarca(!modalModificaMarca);
        
    };

    //////MANEJA SELECCION
    const [seleccionado, setSeleccionado] = useState('');
    const manejaSeleccion = (id_marca) =>{
           setSeleccionado(id_marca);
           manejamodalModificaMarca();
    }
    console.log(seleccionado);

    /////////LAYOUT

    const navigation = <PestaniasConfiguraciones></PestaniasConfiguraciones>

    const main = <div className='__cuerpo_marcas'>
        <div className='__cabecera_marcas'>
            <h1 >Marcas</h1>
            <Boton icono={mas} habilitado onClick={manejamodalNuevaMarca}></Boton>
        </div>
        <div className='__lista_marcas'>
            {marcas.map((item, index) => (
                <div className="__marca_item" key={index}>
                    <span className='__nombre_marca'>{item.nombre_marca}</span>
                    <Boton icono={editar} habilitado onClick={()=> manejaSeleccion(item.id_marca)}></Boton>
                </div>

            ))}

        </div>
        <Modal visible={modalNuevaMarca} funcion={manejamodalNuevaMarca} titulo="Nueva Marca" anchura="500px">
            <NuevaMarca onGuardar={manejamodalNuevaMarca}></NuevaMarca>
        </Modal>
        <Modal visible={modalModificaMarca} funcion={manejamodalModificaMarca} titulo="Modificar Marca" anchura="500px">
            <ModificarMarca onGuardar={manejamodalModificaMarca} id_marca={seleccionado} ></ModificarMarca>
        </Modal>


    </div>


    return <PlantillaConfiguraciones navigation={navigation} main={main} />;
}
