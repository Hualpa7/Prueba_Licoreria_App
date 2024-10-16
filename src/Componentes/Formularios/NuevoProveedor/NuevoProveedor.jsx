import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Boton from "../../Boton/Boton";
import './NuevoProveedor.css';
export default function NuevoProveedor({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            id_prov: "777-7777",

        }

    });


    return (
        <>
            {/* Formulario de combo */}
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_proveedor">
                <div className="__cuerpo_proveedor">
                    <div className="__primera_columna">
                        <Tarjeta descripcion="ID Nº" forid="id_prov">
                            <Input
                                tipo="text"
                                id="id_prov"
                                deshabilitado
                                {...register("id_prov")}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Nombre" forid="nombre" mensajeError={errors.nombre?.message}>
                            <Input
                                tipo="text"
                                id="nombre"
                                {...register("nombre", { required: { value: true, message: "Ingrese nombre del Proveedor" } })}
                            />
                        </Tarjeta>
                    </div>
                    <div className="__segunda_columna">
                        <Tarjeta descripcion="Telefono" forid="tel" mensajeError={errors.tel?.message}>
                            <Input
                                tipo="text"
                                id="tel"
                                placeholder = "3878-375270"
                                {...register("tel", { required: { value: true, message: "Ingrese Telefono" },
                                    pattern:{ value:/^\d{3,4}-\d{6,7}$/, message: "Telefono No Valido"}
                                })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Correo" forid="mail" mensajeError={errors.mail?.message}>
                            <Input
                                tipo="text"
                                id="mail"
                                placeholder = "example@gmail.com"
                                {...register("mail", { required: { value: true, message: "Ingrese Correo" },
                                pattern:{ value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/, message: "Correo No Valido"}
                             })}
                            />
                        </Tarjeta>
                    </div>
                </div>
                <div className="__boton_prov">
                    <Boton descripcion='Agregar' habilitado submit></Boton>
                </div>
            </form>
        </>
    )
}