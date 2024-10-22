import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import './FormularioDescuento.css'


export default function FormularioDescuento({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        //constante que devuleve todo lo del form

    });

    return (
        <>
            {/* Formulario de descuento */}
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_descuento">
                <div className="__cuerpo_descuento">
                    <div className="__columna1">
                        <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto_descuento?.message}>
                            <Input
                                tipo="search"
                                id="producto"
                                placeholder="Buscar"
                                {...register("producto_descuento", { required: { value: true, message: "Ingrese nombre o codigo" } })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Porcentaje a Aplicar" forid="porcentaje" mensajeError={errors.porcentaje_descuento?.message}>
                            <Input
                                tipo="porcentaje"
                                id="porcentaje"
                                {...register("porcentaje_descuento", {
                                    required: {
                                        value: true,
                                        message: "Ingrese porcentaje del Descuento"
                                    },
                                    validate: (value) => {
                                        if (value >= 0 && value <= 100) return true;
                                        else return "Ingrese un porcentaje entre '0%' y '100%' ";
                                    },
                                })}
                            />
                        </Tarjeta>

                    </div>
                    <div className="__columna2">

                        <Tarjeta descripcion="Buscar por">
                            <Selector opciones={["Codigo", "Producto"]} id="tipoBusqueda" />
                        </Tarjeta>
                    <Tarjeta descripcion="Duracion" forid="duracion_descuento" mensajeError={errors.duracion_descuento?.message}>
                        <Input
                            tipo="date"
                            id="duracion_descuento"
                            {...register("duracion_descuento", {
                                required: { value: true, message: "Ingrese fecha limite del descuento" },
                                validate: (value) => {
                                    const fechaDescuento = new Date(value);
                                    const fechaActual = new Date();
                                    if (fechaDescuento > fechaActual) return true;
                                    else return "Ingrese una fecha posterior al dia de hoy";
                                }
                            })}
                        />
                    </Tarjeta>
                    </div>
                </div>
                <div className="__boton_descuento">
                    <Boton descripcion='Agregar' habilitado submit></Boton>
                </div>
            </form>
        </>

    )
}