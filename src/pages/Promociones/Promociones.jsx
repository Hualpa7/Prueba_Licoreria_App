import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PanelPromociones from "../../Componentes/Paneles/PanelPromociones/PanelPromociones";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import { useState } from 'react'
import columnasCombo from '../../Datos_Pruebas/Columnas_Combo.json'
import datosCombo from '../../Datos_Pruebas/Datos_Combo.json'
import columnasDescuento from '../../Datos_Pruebas/Columnas_Descuentos.json'
import datosDescuento from '../../Datos_Pruebas/Datos_Descuentos.json'
import Modal from "../../Componentes/Modal/Modal";
import FormularioCombo from "../../Componentes/Formularios/NuevoCombo/FormularioCombo";
import FormularioDescuento from "../../Componentes/Formularios/NuevoDescuento/FormularioDescuento";
import ModificarDescuento from "../../Componentes/Formularios/ModificarDescuento/ModificarDescuento";


export default function Promociones({ }) {
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState('Combo'); //Estado que determina si esta seleccionado COMBO o DESCUENTO
  const [modalModifOferta, setModifiOferta] = useState(false);  //Estado que controla la visualizacion del modal MODIFICACION  
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null); //Estado que determina un elemento seleccionado de la tabla
  const [modalNuevo, setModalNuevo] = useState(false); //Estado que controla la visualizacion del modal NUEVO COMBO o DESCUENTO


  const manejaCambiooferta = (nuevaOferta) => {
    setOfertaSeleccionada(nuevaOferta);
  };


  const manejaModifiOferta = () => {
    setModifiOferta(!modalModifOferta);

    if (modalModifOferta) {  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
      setElementoSeleccionado(null);
    }
  };

  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
  };

  const manejaModalNuevo = () => {
    setModalNuevo(!modalNuevo);
  };




  ///////////////////////////////////////////////////////////////////

  const header = <PanelPromociones onTipoOferta={manejaCambiooferta}></PanelPromociones>


  const main = <TablaConPaginacion
    columnas={ofertaSeleccionada === 'Combo' ? columnasCombo : columnasDescuento}
    datos={ofertaSeleccionada === 'Combo' ? datosCombo : datosDescuento}
    itemsPorPagina={5}
    itemsPorPaginaOpcional
    onElementoSeleccionado={manejarSeleccion}>

  </TablaConPaginacion>

  const navigation = <Pestanias></Pestanias>

  const footer = <div style={{ display: "flex" }}>
    <Boton descripcion={"Nuevo"} onClick={manejaModalNuevo} habilitado></Boton>
    <Boton descripcion={"Ver"} onClick={manejaModifiOferta} habilitado={elementoSeleccionado}></Boton>
    <Boton descripcion={"Eliminar"}></Boton>
    <Modal visible={modalNuevo} titulo={`Cargar Nuevo ${ofertaSeleccionada}`} funcion={manejaModalNuevo} anchura={"600px"} >
      {ofertaSeleccionada === 'Combo' ? <FormularioCombo /> : <FormularioDescuento />}
    </Modal>

    <Modal visible={modalModifOferta} titulo={`Detalles del ${ofertaSeleccionada}`} funcion={manejaModifiOferta} anchura={"600px"} >
      {ofertaSeleccionada === 'Combo' ? '' : <ModificarDescuento autocompletar={elementoSeleccionado} />}
    </Modal>

  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}