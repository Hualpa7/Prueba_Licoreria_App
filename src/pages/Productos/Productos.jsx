import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PanelProductos from '../../Componentes/Paneles/PanelProductos/PanelProductos'
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import ModificarProducto from "../../Componentes/Formularios/ModificarProducto/ModificarProducto";
import Modal from "../../Componentes/Modal/Modal";
import NuevoProducto from "../../Componentes/Formularios/NuevoProducto/NuevoProducto";
import { useEffect, useState } from 'react'
import columnas from '../../Datos_Pruebas/Columnas_Productos.json'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";



export default function Productos({ }) {

  const token = localStorage.getItem("authToken");
  const navegarHacia = useNavigate();
  
  if (!token) {
    alert("No puede acceder. Inicie Sesion.")
    navegarHacia('/inicioSesion');
  }
 
    //////////// BUSCA CATEGORIAS Y MARCAS EN EL BACKEND
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);

    const obtenerDatos = () => {
      fetch('http://127.0.0.1:8000/api/categoria')
        .then(respuesta => respuesta.json())
        .then(datos => setCategorias(datos))
        .catch(e => console.log(e));
      fetch('http://127.0.0.1:8000/api/marca')
        .then(respuesta => respuesta.json())
        .then(datos => setMarcas(datos))
        .catch(e => console.log(e));
    };

    useEffect(() => {
      obtenerDatos();
    }, []);


    /////// FUNCION QUE SE LE PASA AL PANEL PARA RECUPERAR LOS DATOS FILTRADOS
    const [datos, setDatos] = useState([]);
    const obtieneDatosFiltrados = (datosFiltrados) => {
      setDatos(datosFiltrados);
    };

    /////////////////////////MODAL NUEVO PRODUCTO
    const [modalNuevoProducto, setModalNuevoProducto] = useState(false); // Abre o cierra el modal nuevo prodcuto

    const manejaModalNuevoProducto = () => {
      setModalNuevoProducto(!modalNuevoProducto);
      if (modalNuevoProducto) {
        obtenerDatos();
        actualizarDatos();
      }
    };


    //////////////SELECCION DE PRODUCTO Y MODAL MODIFICAR PRODUCTO
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
    const manejarSeleccion = (elemento) => {
      setElementoSeleccionado(elemento);
    };

    const [modalModifProducto, setModifProducto] = useState(false); // Abre o cierra el modal nueva sucursal
    const manejaModifProducto = () => {
      setModifProducto(!modalModifProducto);

      if (modalModifProducto) {  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
        setElementoSeleccionado(null);
        actualizarDatos();
      }
    };

    ///////////////BUSCA EN BACKEND ELEMENTO SELECCIONADO
    const [elemento, setElemento] = useState(null);

    useEffect(() => {
      if (elementoSeleccionado) {
        fetch(`http://127.0.0.1:8000/api/producto/${elementoSeleccionado.id_producto}`)
          .then(respuesta => respuesta.json())
          .then(datos => setElemento(datos))
          .catch(e => console.log(e));
      }
    }, [elementoSeleccionado]);//Cuando cambie elementoSeleccionado se ejecuta el efecto



    ////REFERENCIA A PANEL PRODUCTOS

    const panelProductosRef = useRef();

    const actualizarDatos = () => {
      if (panelProductosRef.current) {
        panelProductosRef.current.actualizarDatos();
      }
    }




    ////////SE CREA OBJETO PUNTERO TIPO USEREF PARA PASARLE LA FUNCION DE OBTENER MARCAS Y CATEGORIAS A SUS HIJOS
    const actualizarCategoriasYMarcas = useRef(() => {
      obtenerDatos(); //los hijs al ejecutar actualizarCategoriasYMarcas, ejecutaran obtenerDatos()
    })



    /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
    const [cargando, setCargando] = useState(false);

    const manejaCargando = ((valor) => {
      setCargando(valor);
    });

    //LAYOUT

    const header = <PanelProductos
      ref={panelProductosRef}
      categorias={categorias}
      marcas={marcas}
      onDatosFiltrados={obtieneDatosFiltrados}
      onManejaCargando={manejaCargando}>
    </PanelProductos>


    const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={6}
      itemsPorPaginaOpcional onElementoSeleccionado={manejarSeleccion} cargando={cargando}>
    </TablaConPaginacion>

    const navigation = <Pestanias></Pestanias>

    const footer = <div style={{ display: "flex" }}>
      <Boton descripcion={"NUEVO"} onClick={manejaModalNuevoProducto} habilitado></Boton>
      <Boton descripcion={"VER"} onClick={manejaModifProducto} habilitado={elementoSeleccionado}></Boton>
      <Boton descripcion={"ELIMINAR"}></Boton>
      <Modal visible={modalModifProducto} titulo="Detalles del Producto" funcion={manejaModifProducto} anchura={"800px"} >
        <ModificarProducto autocompletar={elemento} onGuardar={manejaModifProducto} categorias={categorias} marcas={marcas}></ModificarProducto>
      </Modal>
      <Modal visible={modalNuevoProducto} titulo="Cargar Nuevo Producto" funcion={manejaModalNuevoProducto} anchura={"800px"} >
        <NuevoProducto categorias={categorias}
          onGuardar={manejaModalNuevoProducto}
          marcas={marcas}
          actualizarCategoriasYMarcas={actualizarCategoriasYMarcas} //paso la fucnion referencia
        ></NuevoProducto>
      </Modal>
    </div>

    return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;

  




}