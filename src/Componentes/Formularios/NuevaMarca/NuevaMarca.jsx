import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import './NuevaMarca.css'

export default function NuevaMarca({ }) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    //constante que devuleve todo lo del form

  });

  const onSubmit = async (data) => {
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
        const marcaCreada = await respuesta.json();
        console.log('Marca creada:', marcaCreada);
      } else {
        console.error('Error al crear la marca');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
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

  )

}