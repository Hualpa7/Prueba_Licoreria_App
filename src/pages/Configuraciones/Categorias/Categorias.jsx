import Boton from '../../../Componentes/Boton/Boton';
import NuevaCategoria from '../../../Componentes/Formularios/NuevaCategoria/NuevaCategoria';
import Modal from '../../../Componentes/Modal/Modal';
import PestaniasConfiguraciones from '../../../Componentes/PestaniasConfiguraciones/PestaniasConfiguraciones';
import PlantillaConfiguraciones from '../../../Componentes/PlantillaConfiguraciones/PlantillaConfiguraciones';
import { useState,useEffect } from 'react';
import editar from '../../../assets/editar.png'
import mas from '../../../assets/mas.png'
import './Categorias.css'
import ModificarCategoria from '../../../Componentes/Formularios/ModificarCategoria/ModificarCategoria';

export default function Categorias({ }) {

    ////////OBTENER LISTA DE CATEGORIAS
    const [categorias, setCategorias] = useState([]);
    const obtenerDatos = () => {
        fetch('http://127.0.0.1:8000/api/categoria')
            .then(respuesta => respuesta.json())
            .then(datos => setCategorias(datos))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    /////////MODAL NUEVA CATEGORIA

    const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false); 
    const manejaModalNuevaCategoria = () => {
        if (modalNuevaCategoria) {
            obtenerDatos();
        }
        setModalNuevaCategoria(!modalNuevaCategoria);
    };

    ////////MODAL MODIFICA CATEGORIA
    const [modalModificaCategoria, setModalModificaCategoria] = useState(false); 
    const manejaModalModificaCategoria =() => {
        if (modalModificaCategoria) {
            obtenerDatos();
        }
        setModalModificaCategoria(!modalModificaCategoria);
    };


    //////MANEJA SELECCION
    const [seleccionado, setSeleccionado] = useState('');
    const manejaSeleccion = (id_categoria) =>{
           setSeleccionado(id_categoria);
           manejaModalModificaCategoria();
    }

    

    /////////LAYOUT

    const navigation = <PestaniasConfiguraciones></PestaniasConfiguraciones>

    const main = <div className='__cuerpo_categorias'>
        <div className='__cabecera_categorias'>
            <h1>Categorias</h1>
            <Boton icono={mas} habilitado onClick={manejaModalNuevaCategoria}></Boton>
        </div>
        <div className='__lista_categorias'>
            {categorias.map((item, index) => (
                <div className="__categoria_item" key={index}>
                    <span className='__nombre_categoria'>{item.nombre_categoria}</span>
                    <Boton icono={editar} habilitado onClick={()=> manejaSeleccion(item.id_categoria)}></Boton>
                </div>

            ))}

        </div>
            <Modal visible={modalNuevaCategoria} funcion={manejaModalNuevaCategoria} titulo="Nueva Categoria" anchura="500px">
                <NuevaCategoria onGuardar={manejaModalNuevaCategoria}></NuevaCategoria>
            </Modal>
            <Modal visible={modalModificaCategoria} funcion={manejaModalModificaCategoria} titulo="Modificar Categoria" anchura="500px">
                <ModificarCategoria onGuardar={manejaModalModificaCategoria} id_categoria={seleccionado}></ModificarCategoria>
            </Modal>


    </div>


    return <PlantillaConfiguraciones navigation={navigation} main={main} />;
}
