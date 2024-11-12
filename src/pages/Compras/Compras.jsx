import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import { useState, useEffect } from 'react'
import columnas from '../../Datos_Pruebas/Columnas_Compras.json'
import Compra from '../../Componentes/Formularios/Compra/Compra'
import Modal from '../../Componentes/Modal/Modal'
import PanelCompras from "../../Componentes/Paneles/PanelCompras/PanelCompras";


export default function Compras({ }) {

  ////////MANEJA MODAL NUEVA COMPRA
  const [modalNuevaCompra, setModalNuevaCompra] = useState(false); // Abre o cierra el modal nuevo prodcuto
  const manejaModalNuevaCompra = () => {
    setModalNuevaCompra(!modalNuevaCompra);
  };


  const [datos, setDatos] = useState([]);
  const obtieneDatosFiltrados = (datosFiltrados) => {
    setDatos(datosFiltrados);
  };

  /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
  const [cargando, setCargando] = useState(false);

  const manejaCargando = ((valor) => {
    setCargando(valor);
  });

  const header = <PanelCompras onDatosFiltrados={obtieneDatosFiltrados} onManejaCargando={manejaCargando}></PanelCompras>


  const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={5} itemsPorPaginaOpcional
    cargando={cargando}
  ></TablaConPaginacion>

  const navigation = <Pestanias></Pestanias>

  const footer = <div style={{ display: "flex" }}>
    <Boton descripcion={"NUEVA"} onClick={manejaModalNuevaCompra} habilitado></Boton>
    <Modal visible={modalNuevaCompra} titulo="Nueva Compra" funcion={manejaModalNuevaCompra} anchura={"800px"} >
      <Compra onGuardar={manejaModalNuevaCompra}></Compra>
    </Modal>
  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}
