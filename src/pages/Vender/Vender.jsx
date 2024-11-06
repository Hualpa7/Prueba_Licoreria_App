import Pestanias from "../../Componentes/Pestanias/Pestanias";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Boton from '../../Componentes/Boton/Boton'
import PanelVender from '../../Componentes/Paneles/PanelVender/PanelVender'

export default function Vender({}){
    const header = <PanelVender></PanelVender>
    const navigation = <Pestanias></Pestanias>
    const main = <h1>EJEMPLO VENTA DE PRODUCTOS</h1>
    const footer = <div style={{display:"flex"}}>
    <Boton descripcion={"EJEMPLO"}  habilitado></Boton>
   
  </div>
    return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}