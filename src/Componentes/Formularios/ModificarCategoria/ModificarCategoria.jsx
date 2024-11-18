import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import '../NuevaMarca/NuevaMarca.css'
import { useState } from 'react'


export default function ModificarCategoria({ onGuardar, id_categoria }) {

    /////// HOOK FORM
    const { register, handleSubmit, formState: { errors } } = useForm({

    });

    /////// CREACION PUT DE CATEGORIA
    const onSubmit = async (data) => {
        setCargando(true);
        const route = `http://127.0.0.1:8000/api/categoria/${id_categoria}`
        try {
            const respuesta = await fetch(route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!respuesta.ok) {
                console.error('Error al modificar la categoria');


            }
            const categoriaCreada = await respuesta.json();
            console.log('Categoria Modificada:', categoriaCreada);
            onGuardar();

        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            setCargando(false);
        }
    };


    /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
    const [cargando, setCargando] = useState(false);

    ////// LAYOUT
    return (
        <>
            {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            <form onSubmit={handleSubmit(onSubmit)} className="__form_nueva_marca_categoria">
                <Tarjeta descripcion="Modificar Categoria" forid="categoria" mensajeError={errors.nombre_categoria?.message} >
                    <Input
                        tipo="text"
                        id="categoria"
                        {...register("nombre_categoria", { required: { value: true, message: "Ingrese nueva Categoria" } })}
                    />
                </Tarjeta>
                <Boton descripcion='Modificar' habilitado submit></Boton>
            </form>
        </>

    )

}