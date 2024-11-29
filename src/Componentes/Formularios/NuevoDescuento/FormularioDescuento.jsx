import { useForm, useWatch } from "react-hook-form"
import { useState } from 'react'
import { useBusqueda } from "../../../hooks/useBusqueda";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import './FormularioDescuento.css';
import { toast } from "sonner";


export default function FormularioDescuento({ onGuardar }) {

    /////HOOK FORM
    const { register, handleSubmit, formState: { errors }, reset,control,setValue } = useForm({
        defaultValues: {
            id_sucursal: "1",
            tipo_busqueda_Producto: "Nombre"
        }

    });

    /////// SE CARGA EL NUEVO DESCUENTO
    const onSubmit = async (data) => {
        setCargando(true);
        try {
            const respuestaDescuento = await fetch('http://127.0.0.1:8000/api/descuento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!respuestaDescuento.ok) {
                console.error('Error al crear el descuento');
                toast.error("Error al crear el descuento.",{className:"__toaster_error"});
                return;
            }

            reset();
            toast.success("Descuento creado correctamente.",{className:"__toaster_success"});
            onGuardar();
            console.log(data);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            toast.error("Error al crear el combo.",{className:"__toaster_success"});
        } finally {
            setCargando(false);
        }
    };

      ////////BUSQUEDA COINCIDENCIAS DE PRODUCTO:
    
    
    ///// Ver el tipo de busqueda para producto
    const tipoBusquedaProducto = useWatch({ control, name: "tipo_busqueda_Producto" });
    
    const { 
        sugerencias: productoSugerencias,
        terminoBusqueda: buscarProducto,
        setTerminoBusqueda: setBuscarProducto,
        seleccionado: productoSeleccionado,
        manejarSeleccion: seleccionarProducto
    } = useBusqueda('producto', tipoBusquedaProducto,setValue);


    /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
    const [cargando, setCargando] = useState(false);


    /////////LAYOUT

    return (
        <>
          {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            {/* Formulario de descuento */}
            <form onSubmit={handleSubmit(onSubmit)}
                className="__formulario_descuento">
                <div className="__cuerpo_descuento">
                    <div className="__columna1">
                        <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto_descuento?.message}>
                        <Input
                                tipo="search"
                                id="producto"
                                placeholder="Buscar"
                                value={productoSeleccionado || buscarProducto}
                                onChange={(e) =>{
                                    setBuscarProducto(e.target.value);
                                    if(productoSeleccionado) seleccionarProducto(null);
                                }}

                            />
                            {productoSugerencias.length > 0 && (
                                <ul className="__sugerencias">
                                    {productoSugerencias.map((producto) => (
                                        <li key={producto.id_producto} onClick={() => seleccionarProducto(producto)}>
                                            {tipoBusquedaProducto === "Nombre" ? producto.producto : producto.codigo}
                                           
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Tarjeta>
                        <Tarjeta descripcion="Porcentaje a Aplicar" forid="porcentaje" mensajeError={errors.porcentaje?.message}>
                            <Input
                                tipo="porcentaje"
                                id="porcentaje"
                                {...register("porcentaje", {
                                    required: {
                                        value: true,
                                        message: "Ingrese porcentaje del Descuento"
                                    },
                                    validate: (value) => {
                                        if (value >= 0 && value <= 100) return true;
                                        else return "Ingrese un porcentaje entre '0%' y '100%' ";
                                    },
                                })}
                            />
                        </Tarjeta>

                    </div>
                    <div className="__columna2">

                        <Tarjeta descripcion="Buscar por">
                            <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]} id="tipoBusqueda"
                            opcionDefecto
                             {...register("tipo_busqueda_Producto")}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Duracion" forid="duracion_descuento" mensajeError={errors.duracion?.message}>
                            <Input
                                tipo="date"
                                id="duracion_descuento"
                                {...register("duracion", {
                                    required: { value: true, message: "Ingrese fecha limite del descuento" },
                                    validate: (value) => {
                                        const fechaDescuento = new Date(value.replace(/-/g, '/'));
                                        const fechaActual = new Date();
                                        if (!isNaN(fechaDescuento) && fechaDescuento > fechaActual) return true;
                                        else return "Ingrese una fecha posterior al dia de hoy";
                                    }
                                })}
                            />
                        </Tarjeta>
                    </div>
                </div>
                <div className="__boton_descuento">
                    <Boton descripcion='Agregar' habilitado submit></Boton>
                </div>
            </form>
        </>

    )
}