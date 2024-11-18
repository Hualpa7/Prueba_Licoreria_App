import NuevoProveedor from "../../../Componentes/Formularios/NuevoProveedor/NuevoProveedor";
import PestaniasConfiguraciones from "../../../Componentes/PestaniasConfiguraciones/PestaniasConfiguraciones";
import Boton from '../../../Componentes/Boton/Boton';
import Modal from '../../../Componentes/Modal/Modal';
import PlantillaConfiguraciones from '../../../Componentes/PlantillaConfiguraciones/PlantillaConfiguraciones';
import { useState,useEffect } from 'react';
import editar from '../../../assets/editar.png'
import mas from '../../../assets/mas.png'
import './Proveedores.css'

export default function Proveedores(){


    ////////OBTENER LISTA DE PROVEEDORES
    const [proveedores, setProveedores] = useState([]);
    const obtenerDatos = () => {
        fetch('http://127.0.0.1:8000/api/proveedor')
            .then(respuesta => respuesta.json())
            .then(datos => setProveedores(datos))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    /////////MODAL NUEVO PROVEEDOR

    const [modalNuevoProveedor, setModalNuevoProveedor] = useState(false); 
    const manejaModalNuevoProveedor = () => {
        if (modalNuevoProveedor) {
            obtenerDatos();
        }
        setModalNuevoProveedor(!modalNuevoProveedor);
    };

    ////////MODAL MODIFICA PROVEEDOR
    const [modalModificaProveedor, setModalModificaProveedor] = useState(false); 
    const manejaModalModificaProveedor =() => {
        if (modalModificaProveedor) {
            obtenerDatos();
        }
        setModalModificaProveedor(!modalModificaProveedor);
    };

    /////////LAYOUT

    const navigation = <PestaniasConfiguraciones></PestaniasConfiguraciones>

    const main = <div className='__cuerpo_proveedores'>
        <div className='__cabecera_proveedores'>
            <h1>Proveedores</h1>
            <Boton icono={mas} habilitado onClick={manejaModalNuevoProveedor}></Boton>
        </div>
        <div className='__lista_proveedores'>
            {proveedores.map((item, index) => (
                <div className="__proveedor_item" key={index}>
                    <span className='__proveedor_categoria'>{`${item.nombre} - ${item.telefono} - ${item.correo}`}</span>
                    <Boton icono={editar} habilitado onClick={manejaModalModificaProveedor}></Boton>
                </div>

            ))}

        </div>
            <Modal visible={modalNuevoProveedor} funcion={manejaModalNuevoProveedor} titulo="Nueva Proveedor" anchura="500px">
                <NuevoProveedor onGuardar={manejaModalNuevoProveedor}></NuevoProveedor>
            </Modal>
            <Modal visible={modalModificaProveedor} funcion={manejaModalModificaProveedor} titulo="Modificar Proveedor" anchura="500px">
                
            </Modal>


    </div>


    return <PlantillaConfiguraciones navigation={navigation} main={main} />;
}