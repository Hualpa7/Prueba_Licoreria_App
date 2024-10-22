import { useState } from 'react'

import Boton from './Componentes/Boton/Boton'; //Importo mi componente boton

import Input from './Componentes/Input/Input';


import PanelProductos from './Componentes/Paneles/PanelProductos/PanelProductos';
import Modal from './Componentes/Modal/Modal';

import TablaConPaginacion from './Componentes/TablaConPaginacion/TablaConPaginacion';

import Tabla from './Componentes/Tabla/Tabla';
import Tarjeta from './Componentes/ComponentesFormulario/Tarjeta/Tarjeta';
import NuevoProducto from './Componentes/Formularios/NuevoProducto/NuevoProducto';
import Radio from './Componentes/Radio/Radio';
import AgregarCarrito from './Componentes/Formularios/AgregarCarrito/AgregarCarrito';
import NuevaOferta from './Componentes/Formularios/NuevaOferta/NuevaOferta';
import Compra from './Componentes/Formularios/Compra/Compra';
import RegistroUsuario from './Componentes/Formularios/RegistroUsuario/RegistroUsuario';
import NuevaSucursal from './Componentes/Formularios/NuevaSucursal/NuevaSucursal';

import NuevaCategoria from './Componentes/Formularios/NuevaCategoria/NuevaCategoria';
import ModificarProducto from './Componentes/Formularios/ModificarProducto/ModificarProducto';


export default function App2() {


  ///Para probar la tabla creo arrays de encabzados y datos:

  const columnas = [
    'Codigo',
    'Articulo',
    'Stock',
    'Costo',
    'Modificacion',
    'Descuento'
  ];

  const datos = [
    {
      Codigo: "4756",
      Articulo: "Coca cola",
      Stock: 7,
      Costo: 2300,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "0004",
      Articulo: "Quilmes 1Lt",
      Stock: 555,
      Costo: 1800,
      Modificacion: "01/12/2024",
      Descuento: 70
    },
    {
      Codigo: "8888",
      Articulo: "Pepsi",
      Stock: 70,
      Costo: 1700,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "0000",
      Articulo: "Fanta",
      Stock: 80,
      Costo: 2400,
      Modificacion: "01/12/2024",
      Descuento: 20
    },
    {
      Codigo: "7854",
      Articulo: "Salta 1lt",
      Stock: 50,
      Costo: 1200,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "Smirnoff",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "Smirnoff",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "Smirnoff",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "Smirnoff",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "Smirnoff",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "1 Fernet de 1lt + 2 Cocas de 1lt",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    },
    {
      Codigo: "9865",
      Articulo: "Smirnoff",
      Stock: 10,
      Costo: 540,
      Modificacion: "01/12/2024",
      Descuento: 0
    }
  ];

  const autocompletar = {
    Codigo: "9865",
    Articulo: "Smirnoff",
    Stock: 10,
    Costo: 540,
    Modificacion: "01/12/2024",
    Descuento: 0
  };

  const opciones = ["Opcion 1", "Opcion 2", "Opcion 3"];

  /*
  <Tabla columnas={columnas} datos={datos} seleccionable onSeleccionar={manejarSeleccion}></Tabla>
  const manejarSeleccion = (seleccionado) => {
    console.log('Elemento seleccionado:', seleccionado);
  };
  */



  //para manejar el flujo del modal

  const [modalVisible, setModalVisible] = useState(false);// Abre o cierra el modal generico

  const manejaModal = () => {
    setModalVisible(!modalVisible); 
  };

  const [modalNuevoProducto, setModalNuevoProducto] = useState(false); // Abre o cierra el modal nuevo prodcuto

  const manejaModalNuevoProducto = () => {
    setModalNuevoProducto(!modalNuevoProducto); 
  };

  const [modalAgregarCarrito, setModalAgregarCarrito] = useState(false); // Abre o cierra el modal agregar carrito

  const manejaModalAgregarCarrito = () => {
    setModalAgregarCarrito(!modalAgregarCarrito); 
  };

  const [modalNuevaOferta, setModalNuevaOferta] = useState(false); // Abre o cierra el modal nueva oferta

  const manejaModalNuevaOferta = () => {
    setModalNuevaOferta(!modalNuevaOferta); 
  };

  const [modalNuevaCompra, setModalNuevaCompra] = useState(false); // Abre o cierra el modal nueva compra

  const manejaModalNuevaCompra = () => {
    setModalNuevaCompra(!modalNuevaCompra); 
  };

  const [modalNuevoUser, setModalNuevoUser] = useState(false); // Abre o cierra el modal nuevo usuario

  const manejaModalNuevoUser= () => {
    setModalNuevoUser(!modalNuevoUser); 
  };

  const [modalNuevaSucursal, setModalNuevaSucursal] = useState(false); // Abre o cierra el modal nueva sucursal

  const manejaModalNuevaSucursal= () => {
    setModalNuevaSucursal(!modalNuevaSucursal); 
  };

  const [modalNuevaMarca, setNuevaMarca] = useState(false); // Abre o cierra el modal nueva sucursal

  const manejaNuevaMarca= () => {
    setNuevaMarca(!modalNuevaMarca); 
  };
//////////////////ESTO ES PARA ABRIR EL MODAL CON TABLA Y LUEGO TAMBIEN MANEJAR EL SELECCIONADO PARA LUEGO MODIFICARLO
  const [modalModifProducto, setModifProducto] = useState(false); // Abre o cierra el modal nueva sucursal

  const manejaModifProducto= () => {
    setModifProducto(!modalModifProducto); 

    if(modalModifProducto){  //si el modal estaba abierto, al cerrarse se setea a null el elmento seleccionado
      setElementoSeleccionado(null);
    }
  };

  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <Boton descripcion={"Nuevo"} habilitado></Boton>
      <Tabla columnas={columnas} datos={datos}></Tabla>
      <Boton descripcion={"Modificar"} ></Boton>
      <Boton descripcion={"Eliminar"} ></Boton>
      <Boton descripcion={"Abrir modal"} onClick={manejaModal} habilitado></Boton>
      <PanelProductos></PanelProductos>
      <Tarjeta descripcion="Combo o Descuento?" forid="combo_descuento" > <Radio opciones={["Combo", "Descuento"]} name="combo_descuento"></Radio></Tarjeta>
      <Boton descripcion={"Nuevo Producto"} onClick={manejaModalNuevoProducto} habilitado></Boton>
      <Boton descripcion={"Agregar Carrito"} onClick={manejaModalAgregarCarrito} habilitado></Boton>
      <Boton descripcion={"Nueva Oferta"} onClick={manejaModalNuevaOferta} habilitado></Boton>
      <Boton descripcion={"Nueva Compra"} onClick={manejaModalNuevaCompra} habilitado></Boton>
      <Boton descripcion={"Nuevo Usuario"} onClick={manejaModalNuevoUser} habilitado></Boton>
      <Boton descripcion={"Nueva Sucursal"} onClick={manejaModalNuevaSucursal} habilitado></Boton>
      <Boton descripcion={"Nueva Marca"} onClick={manejaNuevaMarca} habilitado></Boton>
      <Tarjeta descripcion="Proveedor" forid="1"><Input id="1" placeholder="Ingrese nombre" tipo="text"></Input></Tarjeta>

      <Modal visible={modalAgregarCarrito} titulo="Agregar al carrito" funcion={manejaModalAgregarCarrito} anchura={"600px"} >
        <AgregarCarrito></AgregarCarrito>
      </Modal>

      <Modal visible={modalNuevaOferta} titulo="Nueva Oferta" funcion={manejaModalNuevaOferta} anchura={"800px"} >
        <NuevaOferta></NuevaOferta>
      </Modal>

      <Modal visible={modalNuevoProducto} titulo="Cargar Nuevo Producto" funcion={manejaModalNuevoProducto} anchura={"800px"} >
        <NuevoProducto autocompletar={autocompletar}></NuevoProducto>
      </Modal>

      <Modal visible={modalNuevaCompra} titulo="Nueva Compra" funcion={manejaModalNuevaCompra} anchura={"800px"} >
        <Compra></Compra>
      </Modal>

      <Modal visible={modalNuevoUser} titulo="Registrar nuevo usuario" funcion={manejaModalNuevoUser} anchura={"650px"} >
        <RegistroUsuario></RegistroUsuario>
      </Modal>

      <Modal visible={modalNuevaSucursal} titulo="Crear Nueva Sucursal" funcion={manejaModalNuevaSucursal} anchura={"550px"} >
        <NuevaSucursal></NuevaSucursal>
      </Modal>

      <Modal visible={modalNuevaMarca} titulo="Crear Nueva Marca" funcion={manejaNuevaMarca} anchura={"500px"} >
        <NuevaCategoria></NuevaCategoria>
      </Modal>



      <Modal visible={modalVisible} titulo="Stock de productos" funcion={manejaModal}>
        <TablaConPaginacion columnas={columnas} datos={datos}  itemsPorPagina={5} itemsPorPaginaOpcional onElementoSeleccionado={manejarSeleccion} />
        <Boton descripcion={"Modificar"} onClick={manejaModifProducto} habilitado={elementoSeleccionado}></Boton>
        <Modal visible={modalModifProducto} titulo="Modificar Producto" funcion={manejaModifProducto} anchura={"800px"} >
        <ModificarProducto autocompletar={elementoSeleccionado}></ModificarProducto>
      </Modal>
      </Modal>


    </>
  )
}

