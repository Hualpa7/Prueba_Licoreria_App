import Selector from '../../Selector/Selector';
import './PanelVender.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { useNavigate } from 'react-router-dom';

export default function PanelVender() {

    const navegarHacia = useNavigate();

    const clickPerfil = () =>{
    
       navegarHacia('/datosPerfil');
    }

    return (
        <>
        <div className='__panel_vender'>
            <div className='__columna1'>
                <div className='__col1'>
                    <Tarjeta descripcion="Fecha" forid="fecha">
                    <Input tipo="text" placeholder="24/10/2024" id="fecha"  deshabilitado/>
                    </Tarjeta>
                    <Tarjeta descripcion="Vendedor" forid="vendedor">
                    <Input tipo="text" placeholder="Gaston" id="vendedor"  deshabilitado/>
                    </Tarjeta>
                </div>
                <div className='__col2'>
                    <Tarjeta descripcion="Metodo de Pago" forid="metodo_pago">
                        <Selector opciones={["Efectivo", "Transferencia"]} id="metodo_pago" />
                    </Tarjeta>
                </div>
            </div>
            <div className='__columna2'>
            <div className='__col1'>
                    <Tarjeta descripcion="Venta Nº" forid="venta">
                    <Input tipo="text" placeholder="125-5457" id="venta"  deshabilitado/>
                    </Tarjeta>
                </div>
                <div className='__col2'>
                   <BotonPerfil onClick={clickPerfil}/>
                </div>
            </div>
        </div>
    </>

    )


}