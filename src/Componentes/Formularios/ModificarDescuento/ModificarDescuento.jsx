import { useForm } from "react-hook-form"
import { useState } from 'react'
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Boton from "../../Boton/Boton";
import '../NuevoDescuento/FormularioDescuento.css'

export default function ModificarDescuento({autocompletar }) {

    const [modificar, setModificar] = useState(false); // Estado que Habilita la modificacion del descuento

    const manejaModificacion = () => {
        setModificar(!modificar); 
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            porcentaje_descuento:autocompletar.Porcentaje_Desc,
            duracion_descuento: autocompletar.Duracion

        }

    });

    return (
        <>
            {/* Formulario de descuento */}
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_descuento">
                <div className="__cuerpo_descuento">
                    <div className="__columna1">
                        <Tarjeta descripcion="Producto" forid="producto" >
                            <Input
                                tipo="input"
                                id="producto"
                                deshabilitado
                                placeholder = {autocompletar.Producto}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Porcentaje a Aplicar" forid="porcentaje" mensajeError={errors.porcentaje_descuento?.message}>
                            <Input
                                tipo="porcentaje"
                                id="porcentaje"
                                deshabilitado={!modificar}
                                {...register("porcentaje_descuento", {
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
                    <Tarjeta descripcion="Codigo" forid="codigo" >
                            <Input
                                tipo="input"
                                id="producto"
                                deshabilitado
                                placeholder = {autocompletar.Codigo}
                            />
                        </Tarjeta>
                    <Tarjeta descripcion="Duracion" forid="duracion_descuento" mensajeError={errors.duracion_descuento?.message}>
                        <Input
                            tipo="date"
                            deshabilitado={!modificar}
                            id="duracion_descuento"
                            {...register("duracion_descuento", {
                                required: { value: true, message: "Ingrese fecha limite del descuento" },
                                validate: (value) => {
                                    const fechaDescuento = new Date(value);
                                    const fechaActual = new Date();
                                    if (fechaDescuento > fechaActual) return true;
                                    else return "Ingrese una fecha posterior al dia de hoy";
                                }
                            })}
                        />
                    </Tarjeta>
                    </div>
                </div>
                <div className="__boton_descuento">
                <Boton descripcion='Modificar' habilitado ={!modificar} onClick={manejaModificacion}></Boton>
                <Boton descripcion='Guardar' habilitado={modificar} submit></Boton>
                </div>
            </form>
        </>

    )
}