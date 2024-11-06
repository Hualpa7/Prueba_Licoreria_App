import React, { useState } from 'react';
import CheckBoxes from '../../CheckBoxes/CheckBoxes';
import { useForm } from "react-hook-form"
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Boton from '../../Boton/Boton';
import Input from "../../Input/Input";
import './NuevoRol.css'

export default function NuevoRol({onGuardar}) {


    const { register, handleSubmit, formState: { errors }, reset, setValue,watch } = useForm({ //paso setvalue y watch para sincronizar
        //constante que devuleve todo lo del form                                             //el frmulario con los vlaores seleccionados en checkbox

    });

    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
                onGuardar();
            })} className="__formulario_nuevo_rol">

                <div className="__cuerpo_nuevo_rol">
                    <Tarjeta descripcion="Nombre del Rol" forid="nombre_rol" mensajeError={errors.nombre_rol?.message}>
                        <Input
                            tipo="text"
                            id="nombre_rol"
                            {...register("nombre_rol", { required: { value: true, message: "Ingrese nombre para el Rol" } })}
                        />
                    </Tarjeta>
                    <Tarjeta descripcion="Permisos">
                        <CheckBoxes opciones={["Comprar", "Vender", "Modificar Precio", "Crear Usuario"]}
                            name="permisosRol"
                            setValue={setValue}
                            watch={watch}
                        ></CheckBoxes>
                    </Tarjeta>

                </div>
                <div className='__boton_nuevo_rol'>
                      <Boton descripcion="Crear" submit habilitado></Boton>
                </div>




            </form>
        </>

    )
}
