import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import './NuevaMarca.css'
import { useState } from 'react'

export default function NuevaMarca({ onGuardar}) {

  /////// HOOK FORM
  const { register, handleSubmit, formState: { errors }, reset } = useForm({

  });

  /////// CREACION POST DE MARCA
  const onSubmit = async (data) => {
    setCargando(true);
    try {
      const respuesta = await fetch('http://127.0.0.1:8000/api/marca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (respuesta.ok) {
        reset();
        onGuardar();
        const marcaCreada = await respuesta.json();
        console.log('Marca creada:', marcaCreada);
      } else {
        console.error('Error al crear la marca');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }finally{
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
      <Tarjeta descripcion="Nueva Marca" forid="marca" mensajeError={errors.marca?.message} >
        <Input
          tipo="text"
          id="marca"
          {...register("nombre_marca", { required: { value: true, message: "Ingrese nueva Marca" } })}
        />
      </Tarjeta>
      <Boton descripcion='Crear' habilitado submit></Boton>
    </form>
    </>

  )

}