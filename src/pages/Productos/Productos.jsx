import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PanelProductos from '../../Componentes/Paneles/PanelProductos/PanelProductos'
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import ModificarProducto from "../../Componentes/Formularios/ModificarProducto/ModificarProducto";
import Modal from "../../Componentes/Modal/Modal";
import NuevoProducto from "../../Componentes/Formularios/NuevoProducto/NuevoProducto";
import { useState } from 'react'
import columnas from '../../Datos_Pruebas/Columnas_Productos.json'
import datos from '../../Datos_Pruebas/Datos_Productos.json'


export default function Productos({ }) {
  


  /////////////////////////ABRE MODAL DE PARA CREAR NUEVO PRODUCTO
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false); // Abre o cierra el modal nuevo prodcuto

  const manejaModalNuevoProducto = () => {
    setModalNuevoProducto(!modalNuevoProducto); 
  };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////SE ENCARGA DE LA SELECCION DE UN PORDCUTO EN LA TABLA Y DE HABILITAR EL BOTON PARA MODIFICAR
  const [modalModifProducto, setModifProducto] = useState(false); // Abre o cierra el modal nueva sucursal

  const manejaModifProducto = () => {
    setModifProducto(!modalModifProducto);

    if (modalModifProducto) {  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
      setElementoSeleccionado(null);
    }
  };

  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
  };
///////////////////////////////////////////////////////////////////

  const header = <PanelProductos></PanelProductos>


  const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={5} itemsPorPaginaOpcional onElementoSeleccionado={manejarSeleccion}></TablaConPaginacion>

  const navigation = <Pestanias></Pestanias>

  const footer = <div style={{display:"flex"}}>
    <Boton descripcion={"Nuevo"} onClick={manejaModalNuevoProducto} habilitado></Boton>
    <Boton descripcion={"Ver"} onClick={manejaModifProducto} habilitado={elementoSeleccionado}></Boton>
    <Boton descripcion={"Eliminar"}></Boton>
    <Modal visible={modalModifProducto} titulo="Detalles del Producto" funcion={manejaModifProducto} anchura={"800px"} >
      <ModificarProducto autocompletar={elementoSeleccionado}></ModificarProducto>
    </Modal>
    <Modal visible={modalNuevoProducto} titulo="Cargar Nuevo Producto" funcion={manejaModalNuevoProducto} anchura={"800px"} >
        <NuevoProducto></NuevoProducto>
      </Modal>
  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}