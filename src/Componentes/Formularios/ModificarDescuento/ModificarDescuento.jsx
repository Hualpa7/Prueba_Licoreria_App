import { useForm } from "react-hook-form"
import { useState } from 'react'
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Boton from "../../Boton/Boton";
import '../NuevoDescuento/FormularioDescuento.css'

export default function ModificarDescuento({ autocompletar, onGuardar }) {

    const [modificar, setModificar] = useState(false); // Estado que Habilita la modificacion del descuento

    const manejaModificacion = () => {
        setModificar(!modificar);
    };


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            porcentaje: autocompletar.porcentaje,
            duracion: (autocompletar.duracion).split(' ')[0] //se convierte para separar fecha de hora asi me figura como relleno

        }

    });

    //////////ACTUALIZAR DESCUENTO

    const onSubmit = async(data) => {
        setCargando(true);
       
        try {
            const descuentoUrl = `http://127.0.0.1:8000/api/descuento/${autocompletar.id_descuento}`;
        
            const respuestaDescuento = await fetch(descuentoUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!respuestaDescuento.ok) {
                console.error('Error al modificar el descuento');
                return;
            }


            const descuentoModificado = await respuestaDescuento.json();
            console.log('Descuento modificado:', descuentoModificado);


            onGuardar();

        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally{
            setCargando(false);
        }
    }


      /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTA MODIFICANDO)
      const [cargando, setCargando] = useState(false);



    return (
        <>
          
            {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            <form onSubmit={handleSubmit(onSubmit)} className="__formulario_descuento">
                <div className="__cuerpo_descuento">
                    <div className="__columna1">
                        <Tarjeta descripcion="Producto" forid="producto" >
                            <Input
                                tipo="input"
                                id="producto"
                                deshabilitado
                                placeholder={autocompletar.producto}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Porcentaje a Aplicar" forid="porcentaje" mensajeError={errors.porcentaje?.message}>
                            <Input
                                tipo="porcentaje"
                                id="porcentaje"
                                deshabilitado={!modificar}
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
                        <Tarjeta descripcion="Codigo del Descuento" forid="codigo" >
                            <Input
                                tipo="input"
                                id="producto"
                                deshabilitado
                                placeholder={autocompletar.id_descuento}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Duracion" forid="duracion" mensajeError={errors.duracion?.message}>
                            <Input
                                tipo="date"
                                deshabilitado={!modificar}

                                id="duracion"
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
                    <Boton descripcion='Modificar' habilitado={!modificar} onClick={manejaModificacion}></Boton>
                    <Boton descripcion='Guardar' habilitado={modificar} submit></Boton>
                </div>
            </form>
        </>

    )
}