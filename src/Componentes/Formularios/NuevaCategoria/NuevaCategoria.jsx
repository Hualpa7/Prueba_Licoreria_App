import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import '../NuevaMarca/NuevaMarca.css'

export default function NuevaCategoria({ }) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    //constante que devuleve todo lo del form

  });

  const onSubmit = async (data) => {
    try {
      const respuesta = await fetch('http://127.0.0.1:8000/api/categoria', { //solicitud POST a mi API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //config header
        },
        body: JSON.stringify(data), //se crea el JSON con los datos del formulario
      });

      if (respuesta.ok) { //Si esta todo bien se resetea el fomrulario
        reset();
        const categoriaCreada = await respuesta.json();//promesa devuelve el JSON creado y lo muestro
        console.log('Categoría creada:', categoriaCreada);
      } else {
        console.error('Error al crear la categoría'); //Si ocurre un error, manejado en en backend
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);// si ocurre un problema al no conectarse a la API
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="__form_nueva_marca_categoria">
      <Tarjeta descripcion="Nueva Categoria" forid="categoria" mensajeError={errors.categoria?.message} >
        <Input
          tipo="text"
          id="categoria"
          {...register("nombre_categoria", { required: { value: true, message: "Ingrese nueva Categoria" } })}
        />
      </Tarjeta>
      <Boton descripcion='Crear' habilitado submit></Boton>
    </form>

  )

}