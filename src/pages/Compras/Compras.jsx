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
    const [modalNuevaCompra, setModalNuevaCompra] = useState(false); // Abre o cierra el modal nuevo prodcuto
    const [datos, setDatos] = useState([]);

    const manejaModalNuevaCompra = () => {
        setModalNuevaCompra(!modalNuevaCompra);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/compra')
          .then(respuesta => respuesta.json())
          .then(datos => {
            const datosTransformados = datos.map(item => ({
              Proveedor: item.nombreProveedor,
              Producto: item.nombreProducto,
              Cantidad: item.cantidad,
              Fecha: new Date(item.fecha).toLocaleDateString(),
              Correo: item.correo,
              Telefono: item.telefono,
              TOTAL: `$ ${item.total}`
            }));
            setDatos(datosTransformados);
          })
          .catch(e => console.log(e));
      }, []);


    const header = <PanelCompras></PanelCompras>


    const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={6} itemsPorPaginaOpcional ></TablaConPaginacion>

    const navigation = <Pestanias></Pestanias>

    const footer = <div style={{ display: "flex" }}>
        <Boton descripcion={"NUEVA"} onClick={manejaModalNuevaCompra} habilitado></Boton>
        <Modal visible={modalNuevaCompra} titulo="Nueva Compra" funcion={manejaModalNuevaCompra} anchura={"800px"} >
            <Compra></Compra>
        </Modal>
    </div>

    return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}
