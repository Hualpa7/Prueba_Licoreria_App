import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import '../NuevaMarca/NuevaMarca.css'

export default function NuevaCategoria({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        //constante que devuleve todo lo del form

    });


    return (
        <form onSubmit={handleSubmit((data) => {
            reset();
            console.log(data);
        })} className="__form_nueva_marca_categoria">
                    <Tarjeta descripcion="Nueva Categoria" forid="categoria" mensajeError={errors.categoria?.message} >
                        <Input
                            tipo="text"
                            id="categoria"
                            {...register("categoria", { required: { value: true, message: "Ingrese nueva Categoria" } })}
                        />
                    </Tarjeta>
                            <Boton descripcion='Crear' habilitado submit></Boton>
        </form>

    )

}