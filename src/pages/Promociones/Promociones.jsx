import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PanelPromociones from "../../Componentes/Paneles/PanelPromociones/PanelPromociones";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import { useState, useEffect, useRef } from 'react'
import columnasCombo from '../../Datos_Pruebas/Columnas_Combo.json'
import columnasDescuento from '../../Datos_Pruebas/Columnas_Descuentos.json'
import Modal from "../../Componentes/Modal/Modal";
import FormularioCombo from "../../Componentes/Formularios/NuevoCombo/FormularioCombo";
import FormularioDescuento from "../../Componentes/Formularios/NuevoDescuento/FormularioDescuento";
import ModificarDescuento from "../../Componentes/Formularios/ModificarDescuento/ModificarDescuento";
import ModificarCombo from "../../Componentes/Formularios/ModificarCombo/ModificarCombo";


export default function Promociones({ }) {

  //MANEJA CAMBIO DE OFERTAS
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState('Combo'); //Estado que determina si esta seleccionado COMBO o DESCUENTO
  const manejaCambiooferta = (nuevaOferta) => {
    setOfertaSeleccionada(nuevaOferta);
  };

  //MANEJA MODAL DE MODIFICACION 
  const [modalModifOferta, setModifiOferta] = useState(false);  //Estado que controla la visualizacion del modal MODIFICACION  


  const manejaModifiOferta = () => {
    setModifiOferta(!modalModifOferta);

    if (modalModifOferta) {  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
      setElementoSeleccionado(null);
      actualizarDatos();//acutaliza datos despues de cerrarse el modal
    }
  };

  //MANEJA ELIMINACION DE COMBO O DESCUENTO
  const [modalEliminafOferta, setEliminaOferta] = useState(false);  //Estado que controla la visualizacion del modal ELIMINACION
  const manejaEliminacionOferta = () => {
    setEliminaOferta(!modalEliminafOferta);

    if (modalEliminafOferta) {  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
      setElementoSeleccionado(null);
      actualizarDatos();//acutaliza datos despues de cerrarse el modal
    }
  }

  //MANEJA NUEVO COMBO O DESCUENTO
  const [modalNuevo, setModalNuevo] = useState(false); //Estado que controla la visualizacion del modal NUEVO COMBO o DESCUENTO

  const manejaModalNuevo = () => {
    setModalNuevo(!modalNuevo);
    if (modalNuevo) {
      actualizarDatos();//acutaliza datos despues de cerrarse el modal
    }
  };

  /////// FUNCION QUE SE LE PASA AL PANEL PARA RECUPERAR LOS DATOS FILTRADOS DE DESCUENTOS
  const [datosDescuento, setDatosDescuento] = useState([]);
  const obtieneDatosFiltradosDescuento = (datosFiltrados) => {
    setDatosDescuento(datosFiltrados);
  };

  /////// FUNCION QUE SE LE PASA AL PANEL PARA RECUPERAR LOS DATOS FILTRADOS DE COMBOS
  const [datosCombo, setDatosCombo] = useState([]);
  const obtieneDatosFiltradosCombo = (datosFiltrados) => {
    setDatosCombo(datosFiltrados);
  };


  //FUNCION PARA ELIMINAR DESCUENTO


  const eliminaDescuento = async () => {
    setCargando(true);
    const id = elementoSeleccionado.Codigo;

    try {
      const productoUrl = `http://127.0.0.1:8000/api/descuento/${id}`;

      const respuesta = await fetch(productoUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if (!respuesta.ok) {
        console.error('Error al eliminar el descuento');
        return;
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setCargando(false);
      manejaEliminacionOferta();

    }
  };

  ///////SELECCION DE ELEMENTO GENERAL
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null); //Estado que determina un elemento seleccionado de la tabla

  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
  };
  

  ///////SELECCION ELEMENTO TIPO DESCUENTO
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState();

  useEffect(() => {
    if (elementoSeleccionado && ofertaSeleccionada==='Descuento') {
      fetch(`http://127.0.0.1:8000/api/descuento/${elementoSeleccionado.Codigo}`)
        .then(respuesta => respuesta.json())
        .then(datos => setDescuentoSeleccionado(datos))
        .catch(e => console.log(e));
    }
  }, [elementoSeleccionado]);//Cuando cambie elementoSeleccionado se ejecuta el efecto


   ///////SELECCION ELEMENTO TIPO DESCUENTO
   const [comboSeleccionado, setComboSeleccionado] = useState();
  
  useEffect(() => {
    if (elementoSeleccionado && ofertaSeleccionada==='Combo') {
      fetch(`http://127.0.0.1:8000/api/combo/${elementoSeleccionado.id_combo}`)
        .then(respuesta => respuesta.json())
        .then(datos => setComboSeleccionado(datos))
        .catch(e => console.log(e));
    }
  }, [elementoSeleccionado]);//Cuando cambie elementoSeleccionado se ejecuta el efecto

  console.log(comboSeleccionado);

  ////ACTUALIZACION DE DATOS USANDO REF PARA INDICARLE AL COMPONENTE DE PANEL PRODUCTOS QUE ACTUALICE LA BUSQUEDA DESPUES DE CADA CRUD

  const panelPromocionesRef = useRef(); // 1º objeto puntero que usamos para acceder al componente HIJO
  
  const actualizarDatos = () => { // 2º funcion que actualiza los datos
    if (panelPromocionesRef.current) { //current en un principi podria ser null, si no lo esta lo accede
      panelPromocionesRef.current.actualizarDatos();
    }
  };

  /*FLUJO:
  Usuario hace una acción (agregar/modificar/eliminar)
Se cierra el modal
Se llama a actualizarDatos()
actualizarDatos() accede al componente PanelPromociones a través de panelPromocionesRef.current
Se ejecuta el método actualizarDatos definido en PanelPromociones
PanelPromociones obtiene los datos actualizados del backend
Los nuevos datos se muestran en la tabla*/


  /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
  const [cargando, setCargando] = useState(false);
  const manejaCargando = ((valor) => {
    setCargando(valor);
  });




  /////LAYOUT

  const header = <PanelPromociones
    ref={panelPromocionesRef} //3º Se pasa la referencia al componente HIJO. Enlazamos asi el puntero con su hijo
    onTipoOferta={manejaCambiooferta}
    onDatosFiltradosDescuentos={obtieneDatosFiltradosDescuento}
    onDatosFiltradosCombos={obtieneDatosFiltradosCombo}
    onManejaCargando={manejaCargando}
  ></PanelPromociones>


  const main = <TablaConPaginacion
    columnas={ofertaSeleccionada === 'Combo' ? columnasCombo : columnasDescuento}
    datos={ofertaSeleccionada === 'Combo' ? datosCombo : datosDescuento}
    itemsPorPagina={6}
    itemsPorPaginaOpcional
    onElementoSeleccionado={manejarSeleccion}
    cargando={cargando}
  >

  </TablaConPaginacion>

  const navigation = <Pestanias></Pestanias>

  const footer = <div style={{ display: "flex" }}>
    <Boton descripcion={"NUEVO"} onClick={manejaModalNuevo} habilitado></Boton>
    <Boton descripcion={"VER"} onClick={manejaModifiOferta} habilitado={elementoSeleccionado}></Boton>
    <Boton descripcion={"ELIMINAR"} onClick={manejaEliminacionOferta} habilitado={elementoSeleccionado}></Boton>

    <Modal visible={modalNuevo} titulo={`Cargar Nuevo ${ofertaSeleccionada}`} funcion={manejaModalNuevo} anchura={ofertaSeleccionada === 'Combo' ? "900px" : "600px"} >
      {ofertaSeleccionada === 'Combo' ? <FormularioCombo onGuardar={manejaModalNuevo}/> : <FormularioDescuento onGuardar={manejaModalNuevo} />}
    </Modal>

    <Modal visible={modalModifOferta} titulo={`Detalles del ${ofertaSeleccionada}`} funcion={manejaModifiOferta} anchura={ofertaSeleccionada === 'Combo' ? "900px" : "600px"} >
      {ofertaSeleccionada === 'Combo' ? 
      <ModificarCombo autocompletar={comboSeleccionado} onGuardar={manejaModifiOferta}/> : 
      <ModificarDescuento autocompletar={descuentoSeleccionado} onGuardar={manejaModifiOferta} />}
    </Modal>

    <Modal visible={modalEliminafOferta} titulo={`Eliminar ${ofertaSeleccionada}?`} funcion={manejaEliminacionOferta} anchura={"500px"} >
      <div style={{ display: "flex", justifyContent: "space-around" }}>

        <Boton descripcion={"ELIMINAR"} onClick={eliminaDescuento} habilitado></Boton>{/*Solo esta implemetado ELIMIACNION DE DESCUENTO*/}
        <Boton descripcion={"CANCELAR"} onClick={manejaEliminacionOferta} habilitado></Boton>
      </div>
    </Modal>

  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;





}