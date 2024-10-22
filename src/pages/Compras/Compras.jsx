import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Pestanias from "../../Componentes/Pestanias/Pestanias";
import Boton from "../../Componentes/Boton/Boton";
import { useState } from 'react'
import columnas from '../../Datos_Pruebas/Columnas_Compras.json'
import datos from '../../Datos_Pruebas/Datos_Compras.json'
import Compra from '../../Componentes/Formularios/Compra/Compra'
import Modal from '../../Componentes/Modal/Modal'
import PanelCompras from "../../Componentes/Paneles/PanelCompras/PanelCompras";


export default function Compras({ }) {
    const [modalNuevaCompra, setModalNuevaCompra] = useState(false); // Abre o cierra el modal nuevo prodcuto

    const manejaModalNuevaCompra = () => {
        setModalNuevaCompra(!modalNuevaCompra);
    };



    const header = <PanelCompras></PanelCompras>


    const main = <TablaConPaginacion columnas={columnas} datos={datos} itemsPorPagina={5} itemsPorPaginaOpcional ></TablaConPaginacion>

    const navigation = <Pestanias></Pestanias>

    const footer = <div style={{ display: "flex" }}>
        <Boton descripcion={"Nueva Compra"} onClick={manejaModalNuevaCompra} habilitado></Boton>
        <Modal visible={modalNuevaCompra} titulo="Nueva Compra" funcion={manejaModalNuevaCompra} anchura={"800px"} >
            <Compra></Compra>
        </Modal>
    </div>

    return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}
