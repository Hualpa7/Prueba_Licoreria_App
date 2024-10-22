import Selector from '../../Selector/Selector';
import './PanelVentas.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Boton from '../../Boton/Boton';
import Radio from '../../Radio/Radio'
import { useState } from 'react';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';


export default function PanelVentas({ }) {

    const [seleccion, setSeleccion] = useState('');//valor por defecto

    const manejarSeleccion = (valor) => { 
        setSeleccion(valor);             
    };                                  


    return (
        <>
            <div className='__panel_ventas'>
                <div className='__columna1'>
                    <Tarjeta descripcion="Metodo de Pago" forid="metodo_pago">
                        <Selector opciones={["Efectivo", "Transferencia"]} id="metodo_pago" />
                    </Tarjeta>
                </div>
                <div className='__columna2'>
                <div className='__linea_vertical'></div>
                    <Radio opciones={["Ventas del mes de", "Ver ventas desde el", "Todas las ventas"]} name="periodo_ventas" onFuncion={manejarSeleccion} ></Radio>
                </div>
                <div className='__columna3'>
                    <div className='__fila1'>
                        <Selector 
                        opciones={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]} 
                        id="mes_venta" 
                        deshabilitado={seleccion !== "Ventas del mes de"}
                        />
                        <Selector opciones={["2020", "2021", "2022", "2023", "2024"]} 
                        id="anio_venta" 
                        deshabilitado={seleccion !== "Ventas del mes de"}
                        />
                    </div>
                    <div className='__fila2'>
                        <Input tipo="date" 
                        id="fecha_desde"
                        deshabilitado={seleccion !== "Ver ventas desde el"}
                        ></Input>
                        <label>al</label>
                        <Input tipo="date" 
                        id="fecha_hasta"
                        deshabilitado={seleccion !== "Ver ventas desde el"}
                        ></Input>
                    </div>
                </div>
                <div className='__columna4'>
                    <Boton habilitado descripcion="Generar Informe"></Boton>
                </div>
                <div className='__columna5'>
                    <BotonPerfil></BotonPerfil>
                </div>
            </div>
        </>
    )
}