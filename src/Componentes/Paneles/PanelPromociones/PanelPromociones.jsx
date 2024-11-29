import Selector from '../../Selector/Selector';
import './PanelPromociones.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { XyzTransition } from "@animxyz/react";
import { useForm, useWatch } from 'react-hook-form';
import { useFuncionesPerfil } from '../../../hooks/useFuncionesPerfil';
import { toast } from 'sonner';


//4º ESTABLECEMOS COMO forwardRef, permitiendo al componente recibir una ref como segundo parametro
const PanelPromociones = forwardRef(({ onTipoOferta, onDatosFiltradosDescuentos, onDatosFiltradosCombos, onManejaCargando, ...props }, ref) => {


    /////5º EXPONEMOS EL METODO ACTUALIZAR REF PARA QUE LO VEA EL PADRE

    useImperativeHandle(ref, () => ({  //Con este metodo indicamos que metodos o propiedades estaran disponibles a traves del ref
        actualizarDatos: () => {
            tipoOferta === 'Descuento' ? obtenerDatosDescuentos() : obtenerDatosCombos();
            
        }
    }));

    /////////// NAVEGACION A PERFIL O CONFIGURACIONES y CERRAR SESION
    const [opcionesPerfil, setOpcionesPerfil] = useState(false);

    const clickPerfil = () => {
        setOpcionesPerfil(!opcionesPerfil);
    }

    const { irAPerfil, irAConfiguraciones, cerrarSesion } = useFuncionesPerfil(); //HOOK PARA NAVEGAR Y CERRAR SESION

    //////////FUNCION PRIMMERA LETRA DE UNA PALABRA EN MAYUSCULAS
    const transformaMayusucula = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    //////////HOOK FORM
    const { register, control, setValue } = useForm({
        defaultValues: {
            oferta: "Descuento"

        }
    });

    /////////CAPTURAR LOS VALORES DEL FORMULARIO DINAMICAMENTE
    const filtro = useWatch({ control });

    // Observar en tiempo real el valor del selector de OFERT
    const tipoOferta = useWatch({ control, name: "oferta" });



    // Enviar `tipoOferta` al componente padre cada vez que cambie
    useEffect(() => {
        if (onTipoOferta) {
            onTipoOferta(tipoOferta); // Llama a la función del padre pasando el valor de `tipoOferta`
        }
    }, [tipoOferta, onTipoOferta]);


    //////PARA DARLE UN TIEMPO A LA BUSQUEDA POR NOMBRE O CODIGO
    const timeOutBusquedaRef = useRef(null);

    useEffect(() => {
        if (filtro?.busqueda) {
            clearTimeout(timeOutBusquedaRef.current);
            timeOutBusquedaRef.current = setTimeout(() => {
                tipoOferta === 'Combo' ? obtenerDatosCombos(filtro) : obtenerDatosDescuentos(filtro);
            }, 2000);
        }
        else {
            tipoOferta === 'Combo' ? obtenerDatosCombos(filtro) : obtenerDatosDescuentos(filtro);
        }

        return () => clearTimeout(timeOutBusquedaRef.current);

    }, [filtro, tipoOferta])


    /////////TRAEMOS LOS DATOS FILTRADOS DE DESCUENTOS

    const obtenerDatosDescuentos = async (data) => { //funcion que hace la consulta dependiendo los filtros
        onManejaCargando(true);

        try {
            if (filtro.tipo !== "Combo" ) {

                const respuestaOferta = await fetch('http://127.0.0.1:8000/api/descuento/filtro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const datos = await respuestaOferta.json();

                const datosTransformados = datos.map(item => ({
                    Codigo: item.id_descuento,
                    Producto: transformaMayusucula(item.producto),
                    Costo: `$ ${item.costo.replace('.', ',')}`,
                    Porcentaje_Desc: `${item.porcentaje} %`,
                    Costo_Descuento_Aplicado: `$ ${(
                        parseFloat(item.costo.replace(',', '.')) * (1 - item.porcentaje / 100)
                    ).toFixed(2).replace('.', ',')}`,
                    Duracion: item.duracion

                }));
                onDatosFiltradosDescuentos(datosTransformados);
            }
            else {
                onDatosFiltradosDescuentos([]);
                toast.info("Cambie la opcion de Busqueda a Producto.", { className: "__toaster_info" });
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            onManejaCargando(false);
        }

    };



    /////////TRAEMOS LOS DATOS FILTRADOS DE COMBOS

    const obtenerDatosCombos = async (data) => { //funcion que hace la consulta dependiendo los filtros
        onManejaCargando(true);
        try {
            if (filtro.tipo !== "Producto") {
                const respuestaOferta = await fetch('http://127.0.0.1:8000/api/combo/filtro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                const datos = await respuestaOferta.json();
    
                const datosTransformados = datos.map(item => ({
                    id_combo: item.id_combo,
                    Nombre_Combo: transformaMayusucula(item.nombre),
                    Descripcion: item.productos,
                    Costo_Combo: `$ ${item.costo.replace('.', ',')}`,
                    Duracion: new Date(item.duracion).toLocaleDateString(),
                }));
                onDatosFiltradosCombos(datosTransformados);
            }
            else{
                onDatosFiltradosCombos([]);
                toast.info("Cambie la opcion de Busqueda a Combo.", { className: "__toaster_info" });
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            onManejaCargando(false);
        }
    };






    //////////LAYOUT
    return (
        <>
            <div className='__panel_promociones'>
                <form>
                    <div className='__columna1'>
                        <div className='__col1'>
                            <Tarjeta descripcion="Tipo de Oferta" forid="oferta">
                                <Selector opciones={[{ label: "Combos", value: "Combo" }, { label: "Descuentos", value: "Descuento" }]}
                                    id="oferta"
                                    opcionDefecto
                                    {...register("oferta")}
                                />
                            </Tarjeta>
                            <Tarjeta descripcion="Buscar Producto/Combo" forid="busqueda">
                                <Input tipo="search" placeholder="Buscar" id="busqueda"
                                    {...register("busqueda")}
                                />
                            </Tarjeta>
                        </div>
                        <div className='__col2'>
                            <Tarjeta descripcion="Por Producto o Combo" forid="tipo_busqueda">
                                <Selector opciones={[{ label: "Producto", value: "Producto" }, { label: "Combo", value: "Combo" }]}
                                    id="tipo_busqueda"
                                    opcionDefecto
                                    {...register("tipo")}
                                />
                            </Tarjeta>
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


});

export default PanelPromociones;