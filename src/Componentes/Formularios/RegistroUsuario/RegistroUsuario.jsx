import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import './RegistroUsuario.css';


export default function RegistroUsuario({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        //constante que devuleve todo lo del form

    });

    return (
        <>
            {/* Formulario de descuento */}
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_nuevo_usuario">
                <div className="__cuerpo_nuevo_usuario">
                    <div className="__columna1">
                        <Tarjeta descripcion="Nombre" forid="nombre" mensajeError={errors.nombre?.message}>
                            <Input
                                tipo="text"
                                id="nombre"
                                {...register("nombre", { required: { value: true, message: "Ingrese nombre del empleado" } })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Correo" forid="mail" mensajeError={errors.mail?.message}>
                            <Input
                                tipo="text"
                                id="mail"
                                placeholder="example@gmail.com"
                                {...register("mail", {
                                    required: { value: true, message: "Ingrese Correo" },
                                    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/, message: "Correo No Valido" }
                                })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Contraseña" forid="password" mensajeError={errors.password?.message}>
                            <Input
                                tipo="password"
                                id="password"
                                {...register("password", {
                                    required: { value: true, message: "Ingrese Contraseña" },
                                })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Fecha Nacimiento" forid="nacimiento" mensajeError={errors.nacimiento?.message}>
                            <Input
                                tipo="date"
                                id="nacimiento"
                                {...register("nacimiento", {
                                    required: { value: true, message: "Ingrese fecha de nacimiento" },
                                    validate: (value) => {
                                        const fechaNacimiento = new Date(value);
                                        const fechaActual = new Date();
                                        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                                        return  edad >= 18 ||"Debe ser mayor de edad";
                                       
                                    }
                                })}
                            />
                        </Tarjeta>
                    </div>
                    <div className="__columna2">
                        <Tarjeta descripcion="Apellido" forid="apellido" mensajeError={errors.apellido?.message}>
                            <Input
                                tipo="text"
                                id="apellido"
                                {...register("apellido", { required: { value: true, message: "Ingrese apellido del empleado" } })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Rol" forid="rol">
                            <Selector opciones={["Administrador", "Empleado"]} id="rol"
                            {...register("Rol")}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Sucursal" forid="sucursal">
                            <Selector opciones={["San Lorenzo", "Salta Centro", "Salta zona Sur", "Salta zona Norte"]} id="sucursal" 
                            {...register("Sucursal")}
                            />
                        </Tarjeta>
                    </div>
                   
                </div>
                <div className="__boton_registro">
                    <Boton descripcion='Registrar' habilitado submit></Boton>
                </div>
            </form>
        </>

    )
}