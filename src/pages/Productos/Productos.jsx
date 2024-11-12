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



export default function Productos({ }) {


  //////////// BUSCA CATEGORIAS Y MARCAS EN EL BACKEND
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const obtenerDatos = () => {
    /* fetch('http://127.0.0.1:8000/api/producto')  NO LO USO PORQUE NECESITO QUE SE EJECUTE DEPENDIENDO LOS FILTROS
        .then(respuesta => respuesta.json())
        .then(datos => {
          const datosTransformados = datos.map(item => ({
            Codigo: item.codigo,
            Nombre: item.producto,
            Stock: item.stock,
            Costo: `$ ${item.costo}`,
            Modificacion: new Date(item.fecha_modificacion).toLocaleDateString(),
            Descuento: `${item.id_descuento || 0} %`,
            Cantidad_minima: item.alerta_minima,
            Categoria: item.id_categoria,
            Marca: item.id_marca,
            id_producto: item.id_producto
            }));
            // setDatos(datosTransformados);
            })
            .catch(e => console.log(e));*/

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
      obtenerDatos();
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

  /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
  const [cargando, setCargando] = useState(false);

  const manejaCargando = ((valor) => {
        setCargando(valor);
  });






  //LAYOUT

  const header = <PanelProductos categorias={categorias} marcas={marcas}
    onDatosFiltrados={obtieneDatosFiltrados} onManejaCargando={manejaCargando}>
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
      <NuevoProducto categorias={categorias} onGuardar={manejaModalNuevoProducto} marcas={marcas}></NuevoProducto>
    </Modal>
  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}