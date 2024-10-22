import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PanelVentas from '../../Componentes/Paneles/PanelVentas/PanelVentas'
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import { useState } from 'react'
import columnas from '../../Datos_Pruebas/Columnas_Ventas.json'
import datos from '../../Datos_Pruebas/Datos_Ventas.json'
import Modal from '../../Componentes/Modal/Modal'



export default function Ventas({ }) {
  const [modalDetallesVenta, setModalDetallesVenta] = useState(false); // Abre o cierra el modal nueva sucursal
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
    
  
  //////////////SE ENCARGA DE LA SELECCION DE UN PORDCUTO EN LA TABLA Y DE HABILITAR EL BOTON PARA Visualizar
  
    const manejaVerDetalles = () => {
      setModalDetallesVenta(!modalDetallesVenta);
  
      if (modalDetallesVenta) {  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
        setElementoSeleccionado(null);
      }
    };
  
    const manejarSeleccion = (elemento) => {
      setElementoSeleccionado(elemento);
    };

    const obtenerColumnas = (datos) => { //La funcion sirve para obtener las columnas de los Datos de Venta. Es decir los prodcutos individuales
      if (datos && datos.length > 0) {
        return Object.keys(datos[0]); //Objetct.keys me devuelve un array con todos las claves/propiedades del objeto, en mi caso las keys son las columnas
      }                               //de datos de la venta.
      return [];
    }

  ///////////////////////////////////////////////////////////////////
  
    const header = <PanelVentas></PanelVentas>
  
  
    const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={5} itemsPorPaginaOpcional onElementoSeleccionado={manejarSeleccion}></TablaConPaginacion>
  
    const navigation = <Pestanias></Pestanias>
  
    const footer = <div style={{display:"flex"}}>
      <Boton descripcion={"Ver Detalles"} onClick={manejaVerDetalles} habilitado={elementoSeleccionado}></Boton>
      <Modal visible={modalDetallesVenta} titulo="Detalles de la Venta" funcion={manejaVerDetalles} anchura={"800px"} >
      <TablaConPaginacion columnas={obtenerColumnas(elementoSeleccionado?.Datos)} datos={elementoSeleccionado?.Datos} itemsPorPagina={5}></TablaConPaginacion>
    </Modal>
      
      
    </div>
  
    return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
  }
