import Selector from '../../Selector/Selector';
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Radio from '../../Radio/Radio'
import { useState } from 'react';
import './PanelCompras.css'
import BotonPerfil from '../../BotonPerfil/BotonPerfil';


export default function PanelCompras({ }) {

    const [seleccion, setSeleccion] = useState('');//valor por defecto

    const manejarSeleccion = (valor) => { //funcion que se la pasa al input radio 
        setSeleccion(valor);             //el componente radio maneja la eleccion de un elemento y luego la retorna al padre
    };                                  //en este caso esta funcion, para setear la eleccion y tener un solo formulario activo a la vez 


    return (
        <>
            <div className='__panel_compras'>
                <div className='__columna1'>
                    <div className='__col1'>
                        <Tarjeta descripcion="Proveedor" forid="proveedor">
                            <Selector opciones={["Distribuidora Norte", "Vinos del Valle", "Bodega del Oeste"]} id="proveedor" />
                        </Tarjeta>
                        <Tarjeta descripcion="Buscar Producto">
                            <Input tipo="search" placeholder="Buscar" id="busqueda" />
                        </Tarjeta>
                    </div>
                    <div className='__col2'>
                        <Tarjeta descripcion="Por Codigo o Nombre" forid="busqueda">
                            <Selector opciones={["Codigo", "Nombre"]} id="busqueda" />
                        </Tarjeta>
                    </div>
                </div>
                <div className='__columna2'>
                    <div className='__col1'>
                        <div className='__linea_vertical'></div>
                        <Radio opciones={["Compras del mes de", "Ver compras desde el", "Todas las compras"]} 
                        name="periodo_compras" 
                        onFuncion={manejarSeleccion}
                        
                        ></Radio>
                    </div>
                    <div className='__col2'>
                        <div className='__fila1'>
                            <Selector opciones={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]} 
                            id="mes_venta"
                            deshabilitado={seleccion !== "Compras del mes de"}
                            />
                            <Selector opciones={["2020", "2021", "2022", "2023", "2024"]} 
                            id="anio_venta"
                            deshabilitado={seleccion !== "Compras del mes de"}
                            />
                        </div>
                        <div className='__fila2'>
                            <Input tipo="date" 
                            id="fecha_desde"
                            deshabilitado={seleccion !== "Ver compras desde el"}
                            ></Input>
                            <label>al</label>
                            <Input tipo="date" 
                            id="fecha_hasta"
                            deshabilitado={seleccion !== "Ver compras desde el"}
                            ></Input>
                        </div>
                    </div>
                    <div className='__col3'>
                        <BotonPerfil></BotonPerfil>

                    </div>
                </div>
            </div >
        </>
    )
}