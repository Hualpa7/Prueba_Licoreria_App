import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import '../NuevaMarca/NuevaMarca.css'
import { useState } from 'react'
import { toast } from "sonner";


export default function ModificarMarca({ onGuardar, id_marca }) {

    /////// HOOK FORM
    const { register, handleSubmit, formState: { errors } } = useForm({

    });

    /////// MODIICACION PUT DE MARCA
    const onSubmit = async (data) => {
        setCargando(true);
        const route = `http://127.0.0.1:8000/api/marca/${id_marca}`
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
                console.error('Error al modificar la marca');
                toast.error("Error al modificar la marca.",{className:"__toaster_error"});

            }
            const marcaCreada = await respuesta.json();
            console.log('Marca Modificada:', marcaCreada);
            toast.success("Marca modificada correctamente.",{className:"__toaster_success"});
            onGuardar();

        } catch (error) {
            console.error('Error en la solicitud:', error);
            toast.error("Error inesperado al modificar la marca.",{className:"__toaster_error"});
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
                <Tarjeta descripcion="Modificar Marca" forid="marca" mensajeError={errors.nombre_marca?.message} >
                    <Input
                        tipo="text"
                        id="marca"
                        {...register("nombre_marca", { required: { value: true, message: "Ingrese nueva Marca" } })}
                    />
                </Tarjeta>
                <Boton descripcion='Modificar' habilitado submit></Boton>
            </form>
        </>

    )

}