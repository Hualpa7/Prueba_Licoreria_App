import Selector from '../../Selector/Selector';
import './PanelVentas.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Boton from '../../Boton/Boton';
import Radio from '../../Radio/Radio'
import { useState, useEffect } from 'react';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import meses from '../../../Datos_Pruebas/Meses.json'
import { XyzTransition } from "@animxyz/react";
import { useFuncionesPerfil } from '../../../hooks/useFuncionesPerfil';

export default function PanelVentas({ onDatosFiltrados, onManejaCargando }) {

     /////////// NAVEGACION A PERFIL O CONFIGURACIONES y CERRAR SESION
     const [opcionesPerfil, setOpcionesPerfil] = useState(false);

     const clickPerfil = () => {
         setOpcionesPerfil(!opcionesPerfil);
     }
     const { irAPerfil, irAConfiguraciones, cerrarSesion } = useFuncionesPerfil(); //HOOK PARA NAVEGAR Y CERRAR SESION


    ////////// SELECCION DE LA OPCION DEL RADIO
    const [seleccion, setSeleccion] = useState('');//valor por defecto
    const manejarSeleccion = (valor) => {
        setSeleccion(valor);
    };

    


    ///////// HOOK FORM

    const { register, control, setValue } = useForm({
        defaultValues: {
            periodo_ventas: "Todas las ventas" // Valor por defecto
        }
    });

    // Observar en tiempo real el valor del radio button
    const periodoVentas = useWatch({
        control,
        name: "periodo_ventas"
    });

    /////////CAPTURAR LOS VALORES DEL FORMULARIO DINAMICAMENTE
    const filtro = useWatch({ control });


    const obtenerDatosFiltrados = async (data) => { //funcion que hace la consulta dependiendo los filtros
        onManejaCargando(true);
        try {

            const respuestaVenta = await fetch('http://127.0.0.1:8000/api/venta/filtro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });


            const datos = await respuestaVenta.json();
            console.log(datos);
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
            onDatosFiltrados(datosTransformados);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            onManejaCargando(false);
        }
    };


    useEffect(() => {
        obtenerDatosFiltrados(filtro);
    }, [filtro])

    console.log(filtro);


    return (
        <>
            <div className='__panel_ventas'>
                <form>
                    <div className='__columna1'>
                        <Tarjeta descripcion="Metodo de Pago" forid="metodo_pago">
                            <Selector opciones={[{ label: "Efectivo", value: "Efectivo" }, { label: "Transferencia", value: "Transferencia" }]}
                                id="metodo_pago"
                                opcionNula="Todos"
                                {...register("metodo_pago")}
                            />
                        </Tarjeta>
                    </div>
                    <div className='__columna2'>
                        <div className='__linea_vertical'></div>
                        <Radio opciones={["Ventas del mes de", "Ver ventas desde el", "Todas las ventas"]}
                            name="periodo_ventas"
                            value={periodoVentas}
                            onChange={(valor) => setValue("periodo_ventas", valor)} // Actualiza el valor en hook form
                        ></Radio>
                    </div>
                    <div className='__columna3'>
                        <div className='__fila1'>
                            <Selector
                                opciones={meses}
                                id="mes_venta"
                                deshabilitado={periodoVentas !== "Ventas del mes de"}
                                {...register("mes_venta")}
                            />
                            <Selector opciones={[{ label: "2023", value: "2023" }, { label: "2024", value: "2024" }]}
                                id="anio_venta"
                                deshabilitado={periodoVentas !== "Ventas del mes de"}
                                {...register("anio_venta")}
                            />
                        </div>
                        <div className='__fila2'>
                            <Input tipo="date"
                                id="fecha_desde"
                                deshabilitado={periodoVentas !== "Ver ventas desde el"}
                                {...register("fecha_desde")}
                            ></Input>
                            <label>al</label>
                            <Input tipo="date"
                                id="fecha_hasta"
                                deshabilitado={periodoVentas !== "Ver ventas desde el"}
                                {...register("fecha_hasta")}
                            ></Input>
                        </div>
                    </div>
                    <div className='__columna4'>
                        <Boton habilitado descripcion="Generar Informe"></Boton>
                    </div>
                </form>
                <div className='__boton_perfil'>
                    <BotonPerfil onClick={clickPerfil}></BotonPerfil>
                   <XyzTransition 
                        xyz="fade small-100% duration-3 origin-top"
                        appear
                    >
                        {opcionesPerfil && (
                            <ul className="__sugerencias">
                                <li onClick={irAPerfil}>Datos</li>
                                <li onClick={irAConfiguraciones}>Configuraciones</li>
                                <li onClick={cerrarSesion}>Cerrar Sesión</li>
                            </ul>
                        )}
                    </XyzTransition>
                </div>
            </div>
        </>
    )
}