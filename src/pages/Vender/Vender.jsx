import Pestanias from "../../Componentes/Pestanias/Pestanias";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Boton from '../../Componentes/Boton/Boton'
import PanelVender from '../../Componentes/Paneles/PanelVender/PanelVender'
import { useState } from "react";
import AgregarProducto from "../../Componentes/Formularios/AgregarProducto/AgregarProducto";
import Modal from "../../Componentes/Modal/Modal";
import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import columnas from "../../Datos_Pruebas/Columnas_Vender.json"
export default function Vender({ }) {

  //MANTIENE ARRAY DE PRODUCTOS Y SU MANEJO
  const [productos, setProductos] = useState([]);

  const manejarAgregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  //CONTROLA MODAL DE AGREGAR NUEVO PRODUCTO
  const [modalAgregarProducto, setModalAgregarProducto] = useState(false);

  const manejaModalAgregarProducto = () => {
    setModalAgregarProducto(!modalAgregarProducto);
  }



  console.log(productos);

  const header = <PanelVender></PanelVender>
  const navigation = <Pestanias></Pestanias>
  const main = <TablaConPaginacion
  columnas={columnas}
  datos={productos}
  itemsPorPagina={6}
  ></TablaConPaginacion>
  const footer = <div style={{ display: "flex" }}>
    <Boton descripcion={"Agregar"} habilitado onClick={manejaModalAgregarProducto}></Boton>
    <Modal visible={modalAgregarProducto} titulo="Agregr al Carrito" anchura="600px" funcion={manejaModalAgregarProducto}>
      <AgregarProducto onGuardar={manejaModalAgregarProducto} onAgregarProducto={manejarAgregarProducto}></AgregarProducto>
    </Modal>

  </div>
  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}