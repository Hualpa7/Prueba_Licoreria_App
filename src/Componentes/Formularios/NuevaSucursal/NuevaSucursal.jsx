
import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import './NuevaSucursal.css';


export default function NuevaSucursal({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        //constante que devuleve todo lo del form

    });

    return (
        <>
            {/* Formulario de descuento */}
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_nueva_sucursal">
                <div className="__cuerpo_nueva_sucursal">
                    <div className="__columna1">
                        <Tarjeta descripcion="Nombre Sucursal" forid="nombre" mensajeError={errors.nombre?.message}>
                            <Input
                                tipo="text"
                                id="nombre"
                                {...register("nombre", { required: { value: true, message: "Ingrese nombre de la sucursal" } })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Provincia" forid="provincia">
                            <Selector opciones={["Salta", "Jujuy", "Cordoba", "Buenos Aires"]} id="provincia"
                                {...register("provincia")}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Imagen" forid="imagen" mensajeError={errors.imagen?.message}>
                            <Input
                                tipo="file"
                                id="imagen"
                                {...register("imagen", { required: { value: true, message: "Ingrese Foto de la Sucursal" } })}
                            />
                        </Tarjeta>
                    </div>
                    <div className="__columna2">
                        <Tarjeta descripcion="Direccion" forid="direccion" mensajeError={errors.direccion?.message}>
                            <Input
                                tipo="text"
                                id="direccion"
                                {...register("direccion", { required: { value: true, message: "Ingrese direccion" } })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Ciudad" forid="ciudad" mensajeError={errors.ciudad?.message}>
                            <Input
                                tipo="text"
                                id="ciudad"
                                {...register("ciudad", { required: { value: true, message: "Ingrese ciudad" } })}
                            />
                        </Tarjeta>
                    </div>
                </div>
                <div className="__boton_nueva_sucursal">
                    <Boton descripcion='Crear' habilitado submit></Boton>
                </div>
            </form>
        </>

    )
}