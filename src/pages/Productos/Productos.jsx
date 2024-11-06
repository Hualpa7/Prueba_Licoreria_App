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

  const[datos,setDatos] = useState([]);

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/producto')
    .then(respuesta=>respuesta.json())
    .then(datos => {
      const datosTransformados = datos.map(item => ({
        Codigo: item.codigo,
        Nombre: item.producto,
        Stock: item.stock,
        Costo: `$ ${item.costo}`,
        Modificacion: new Date(item.fecha_modificacion).toLocaleDateString(),
        Descuento: `${item.id_descuento || 0} %`,
        Cantidad_minima:item.alerta_minima,
        Categoria: item.id_categoria,
        Marca: item.id_marca,
        id_producto : item.id_producto
      }));
      setDatos(datosTransformados);
    })
    .catch(e =>console.log(e));
  },[]);
  
  


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


  const[elemento,setElemento] = useState(null);

  useEffect(() => { 
    if (elementoSeleccionado) 
      { fetch(`http://127.0.0.1:8000/api/producto/${elementoSeleccionado.id_producto}`) 
    .then(respuesta => respuesta.json())
     .then(datos => setElemento(datos)) 
     .catch(e => console.log(e)); 
    } }, [elementoSeleccionado]);

  
    
    {elemento  && console.log('Elemento seleccionado!:', elemento)}

///////////////////////////////////////////////////////////////////

  const header = <PanelProductos></PanelProductos>


  const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={6} itemsPorPaginaOpcional onElementoSeleccionado={manejarSeleccion}></TablaConPaginacion>

  const navigation = <Pestanias></Pestanias>

  const footer = <div style={{display:"flex"}}>
    <Boton descripcion={"NUEVO"} onClick={manejaModalNuevoProducto} habilitado></Boton>
    <Boton descripcion={"VER"} onClick={manejaModifProducto} habilitado={elementoSeleccionado}></Boton>
    <Boton descripcion={"ELIMINAR"}></Boton>
    <Modal visible={modalModifProducto} titulo="Detalles del Producto" funcion={manejaModifProducto} anchura={"800px"} >
      <ModificarProducto autocompletar={elemento} onGuardar={manejaModifProducto}></ModificarProducto>
    </Modal>
    <Modal visible={modalNuevoProducto} titulo="Cargar Nuevo Producto" funcion={manejaModalNuevoProducto} anchura={"800px"} >
        <NuevoProducto></NuevoProducto>
      </Modal>
  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}