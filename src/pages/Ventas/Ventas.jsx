import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PanelVentas from '../../Componentes/Paneles/PanelVentas/PanelVentas'
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import { useState, useEffect } from 'react'
import columnas from '../../Datos_Pruebas/Columnas_Ventas.json'
import columnasVenta from '../../Datos_Pruebas/Columnas_Unica_Venta.json'
import Modal from '../../Componentes/Modal/Modal'
import './Ventas.css'


export default function Ventas({ }) {

  ////////MANEJA MODAL DE DETALLES

  const [modalDetallesVenta, setModalDetallesVenta] = useState(false);

  const manejaVerDetalles = () => {
    setModalDetallesVenta(!modalDetallesVenta);
    if (modalDetallesVenta) {
      setElementoSeleccionado(null);
    }
  };



  /////// FUNCION QUE SE LE PASA AL PANEL PARA RECUPERAR LOS DATOS FILTRADOS
  const [datos, setDatos] = useState([]);
  const obtieneDatosFiltrados = (datosFiltrados) => {
    setDatos(datosFiltrados);
  };

  console.log(datos);
  /*
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/venta')
        .then(respuesta => respuesta.json())
        .then(datos => {
          const datosTransformados = datos.map(item => ({
            Numero_Venta: item.id_venta,
            Total: `$ ${item.total}`,
            Fecha: new Date(item.fecha).toLocaleDateString(),
            Descuento_Gral: `${item.descuento_gral || 0} %`,
            Neto: `$ ${(
              parseFloat(item.total.replace(',', '.')) * (1 - item.descuento_gral / 100)
            ).toFixed(2).replace('.', ',')}`, //arreglado
  
            Vendedor: `${item.usuario.nombre} ${item.usuario.apellido}`,
          }));
          setDatos(datosTransformados);
        })
        .catch(e => console.log(e));
    }, []);*/

  /////////SE ENCARGA DE LA SELECCION DE UNA VENTA EN LA TABLA Y DE HABILITAR EL BOTON PARA Visualizar

  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
  };



  const [venta, setVenta] = useState(null);

  useEffect(() => {
    if (elementoSeleccionado) {
      fetch(`http://127.0.0.1:8000/api/venta/${elementoSeleccionado.Numero_Venta}`)
        .then(respuesta => respuesta.json())
        .then(venta => {
          const datosVentaTransformados = venta.productos.map(item => ({
            Codigo: item.codigo,
            Producto: item.producto,
            Cantidad: item.cantidad,
            Subtotal: `$ ${(parseFloat(item.costo.replace(',', '.')) * item.cantidad).toFixed(2).replace('.', ',')}`,
            IVA: `${item.iva} %`,
            Descuento: `${item.descuento_porcentaje === null ? 0 : item.descuento_porcentaje} %`,
            TOTAL: `$ ${(
              (parseFloat(item.costo.replace(',', '.')) *
              (1 + item.iva / 100) * // Agrega el IVA
              (1 - (item.descuento_porcentaje === null ? 0 : item.descuento_porcentaje / 100))) * // Aplica el descuento 
              item.cantidad).toFixed(2).replace('.', ',')}`

          }));
          setVenta(datosVentaTransformados);
        })
        .catch(e => console.log(e));
    }
  }, [elementoSeleccionado]);

  //console.log(elementoSeleccionado);

  /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
  const [cargando, setCargando] = useState(false);

  const manejaCargando = ((valor) => {
    setCargando(valor);
  });


  //////LAYOUT

  const header = <PanelVentas onDatosFiltrados={obtieneDatosFiltrados} onManejaCargando={manejaCargando}></PanelVentas>


  const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={5}
    itemsPorPaginaOpcional onElementoSeleccionado={manejarSeleccion} cargando={cargando}>

  </TablaConPaginacion>

  const navigation = <Pestanias></Pestanias>

  const footer = <div className="__footer_ventas">
    <Boton descripcion={"VER"} onClick={manejaVerDetalles} habilitado={elementoSeleccionado}></Boton>
    <Modal visible={modalDetallesVenta} titulo="Detalles de la Venta" funcion={manejaVerDetalles} anchura={"800px"} >
      <TablaConPaginacion columnas={columnasVenta} datos={venta} itemsPorPagina={5}></TablaConPaginacion>
    </Modal>


  </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}
