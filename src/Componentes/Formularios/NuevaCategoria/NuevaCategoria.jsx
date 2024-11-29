import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import '../NuevaMarca/NuevaMarca.css'
import { useState } from 'react'
import { toast } from "sonner";

//PASO LA REFERENCIA PARA EJECUTAR LA FUNCION ACTUALIZAR MARCAS Y CATEGORIAS, ASI SE ACTUALIZA EN PRODUCTOS.JSX Y SE LA PASA NUEVOPRDUCTO.JSX SIMULTANEAMNETE
export default function NuevaCategoria({ onGuardar,actualizarCategoriasYMarcas }) {

  ////////HOOK FORM
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
  });

  /////// CREACION POST DE CATEGORIA
  const onSubmit = async (data) => {
    setCargando(true);
    try {
      const respuesta = await fetch('http://127.0.0.1:8000/api/categoria', { //solicitud POST a mi API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //config header
        },
        body: JSON.stringify(data), //se crea el JSON con los datos del formulario
      });

      if (respuesta.ok) { //Si esta todo bien se resetea el fomrulario
        toast.success("Categoria creada correctamente.",{className:"__toaster_success"});
        reset();
        actualizarCategoriasYMarcas.current(); //LLAMA A LA FUNCION PARA ACTUALIZAR LUEGO DE QUE SE AGREGO LA NUEVA CATEGORIA
        onGuardar();
        const categoriaCreada = await respuesta.json();//promesa devuelve el JSON creado y lo muestro
        console.log('Categoría creada:', categoriaCreada);
      } else {
        console.error('Error al crear la categoría'); //Si ocurre un error, manejado en en backend
        toast.error("Error al crear la categoria.",{className:"__toaster_error"});
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);// si ocurre un problema al no conectarse a la API
      toast.error("Error inesperado al crear la categoria.",{className:"__toaster_error"});
    }finally{
      setCargando(false);
    } 
  };

  /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
  const [cargando, setCargando] = useState(false);

  ///////// LAYOUT


  return (<>
    {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}

    <form onSubmit={handleSubmit(onSubmit)} className="__form_nueva_marca_categoria">
      <Tarjeta descripcion="Nueva Categoria" forid="categoria" mensajeError={errors.nombre_categoria?.message} >
        <Input
          tipo="text"
          id="categoria"
          {...register("nombre_categoria", { required: { value: true, message: "Ingrese nueva Categoria" } })}
        />
      </Tarjeta>
      <Boton descripcion='Crear' habilitado submit></Boton>
    </form>
  </>

  )

}