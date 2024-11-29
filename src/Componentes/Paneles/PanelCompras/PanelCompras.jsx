import Selector from '../../Selector/Selector';
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Radio from '../../Radio/Radio'
import './PanelCompras.css'
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import meses from '../../../Datos_Pruebas/Meses.json'
import { useForm, useWatch } from 'react-hook-form';
import { XyzTransition } from "@animxyz/react";
import { useFuncionesPerfil } from '../../../hooks/useFuncionesPerfil';

const PanelCompras = forwardRef(({ onDatosFiltrados, onManejaCargando, proveedores }, ref) => {

    /////////// NAVEGACION A PERFIL O CONFIGURACIONES y CERRAR SESION
    const [opcionesPerfil, setOpcionesPerfil] = useState(false);

    const clickPerfil = () => {
        setOpcionesPerfil(!opcionesPerfil);
    }

    const { irAPerfil, irAConfiguraciones, cerrarSesion } = useFuncionesPerfil(); //HOOK PARA NAVEGAR Y CERRAR SESION


    ///////FUNCION REF DEL PADRE QUE LE INDICA QUE OBTENGA LOS DATOS NUEVAMENTE DEL BACKKEND
    useImperativeHandle(ref, () => ({  //Con este metodo indicamos que metodos o propiedades estaran disponibles a traves del ref
        actualizarDatos: () => {
            obtenerDatosFiltrados();
        }
    }));

    //////////FUNCION PRIMMERA LETRA DE UNA PALABRA EN MAYUSCULAS
    const transformaMayusucula = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };




    ////////// SELECCION DE LA OPCION DEL RADIO
    const [seleccion, setSeleccion] = useState('');//valor por defecto
    const manejarSeleccion = (valor) => { //funcion que se la pasa al input radio 
        setSeleccion(valor);             //el componente radio maneja la eleccion de un elemento y luego la retorna al padre
    };                                  //en este caso esta funcion, para setear la eleccion y tener us solo filtro de fecha activo


    ///////// HOOK FORM

    const { register, control, setValue } = useForm({
        defaultValues: {
            periodo_compras: "Todas las compras", // Valor por defecto
            tipo: "Nombre"

        }
    });

    // Observar en tiempo real el valor del radio button
    const periodoCompras = useWatch({ control, name: "periodo_compras" });


    const obtenerDatosFiltrados = async (data) => { //funcion que hace la consulta dependiendo los filtros
        onManejaCargando(true);
        try {

            const respuestaCompra = await fetch('http://127.0.0.1:8000/api/compra/filtro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });


            const datos = await respuestaCompra.json();

            const datosTransformados = datos.map(item => ({
                id_compra: item.id_compra,
                Proveedor: transformaMayusucula(item.nombreProveedor),
                Producto: transformaMayusucula(item.nombreProducto),
                Cantidad: item.cantidad,
                Fecha: new Date(item.fecha).toLocaleDateString(),
                Correo: item.correo,
                Telefono: item.telefono,
                TOTAL: `$ ${item.total}`
            }));
            onDatosFiltrados(datosTransformados);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            onManejaCargando(false);
        }
    };



    /////////CAPTURAR LOS VALORES DEL FORMULARIO DINAMICAMENTE
    const filtro = useWatch({ control });


    //////PARA DARLE UN TIEMPO A LA BUSQUEDA POR NOMBRE O CODIGO
    const timeOutBusquedaRef = useRef(null);

    useEffect(() => {
        if (filtro?.busqueda) {
            clearTimeout(timeOutBusquedaRef.current);
            timeOutBusquedaRef.current = setTimeout(() => {
                obtenerDatosFiltrados(filtro);
            }, 2000);
        }
        else {
            obtenerDatosFiltrados(filtro);
        }

        return () => clearTimeout(timeOutBusquedaRef.current);

    }, [filtro])







    return (
        <>
            <div className='__panel_compras'>
                <form>
                    <div className='__columna1'>
                        <div className='__col1'>
                            <Tarjeta descripcion="Proveedor" forid="proveedor_panel">
                                <Selector opciones={proveedores.map(prov => ({ label: prov.nombre, value: prov.id_proveedor }))}
                                    id="proveedor_panel"
                                    opcionNula="Todos"
                                    {...register("proveedor")} />
                            </Tarjeta>
                            <Tarjeta descripcion="Buscar Producto" forid="busqueda">
                                <Input tipo="search" placeholder="Buscar" id="busqueda"
                                    {...register("busqueda")}
                                />
                            </Tarjeta>
                        </div>
                        <div className='__col2'>
                            <Tarjeta descripcion="Por Codigo o Nombre" forid="tipo_busqueda">
                                <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]}
                                    id="tipo_busqueda"
                                    opcionDefecto
                                    {...register("tipo")} />
                            </Tarjeta>
                        </div>
                    </div>
                    <div className='__columna2'>
                        <div className='__col1'>
                            <div className='__linea_vertical'></div>
                            <Radio opciones={["Compras del mes de", "Ver compras desde el", "Todas las compras"]}
                                name="periodo_compras"
                                value={periodoCompras}
                                onChange={(valor) => setValue("periodo_compras", valor)} // Actualiza el valor en hook form
                            ></Radio>
                        </div>
                        <div className='__col2'>
                            <div className='__fila1'>
                                <Selector opciones={meses}
                                    id="mes_compra"
                                    deshabilitado={periodoCompras !== "Compras del mes de"}
                                    {...register("mes_compra")}
                                />
                                <Selector opciones={[{ label: "2023", value: "2023" }, { label: "2024", value: "2024" }]}
                                    id="anio_compra"
                                    deshabilitado={periodoCompras !== "Compras del mes de"}
                                    {...register("anio_compra")}
                                />
                            </div>
                            <div className='__fila2'>
                                <Input tipo="date"
                                    id="fecha_desde"
                                    deshabilitado={periodoCompras !== "Ver compras desde el"}
                                    {...register("fecha_desde")}
                                ></Input>
                                <label>al</label>
                                <Input tipo="date"
                                    id="fecha_hasta"
                                    deshabilitado={periodoCompras !== "Ver compras desde el"}
                                    {...register("fecha_hasta")}
                                ></Input>
                            </div>
                        </div>
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
}); export default PanelCompras;