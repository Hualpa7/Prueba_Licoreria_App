import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import './NuevaMarca.css'

export default function NuevaMarca({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        //constante que devuleve todo lo del form

    });


    return (
        <form onSubmit={handleSubmit((data) => {
            reset();
            console.log(data);
        })} className="__form_nueva_marca_categoria">
                    <Tarjeta descripcion="Nueva Marca" forid="marca" mensajeError={errors.marca?.message} >
                        <Input
                            tipo="text"
                            id="marca"
                            {...register("marca", { required: { value: true, message: "Ingrese nueva Marca" } })}
                        />
                    </Tarjeta>
                            <Boton descripcion='Crear' habilitado submit></Boton>
        </form>

    )

}