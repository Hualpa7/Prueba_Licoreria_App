import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";



export default function FormularioDescuento({ seleccion }) {

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
                    <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto_descuento?.message}>
                        <Input
                            tipo="search"
                            id="producto"
                            placeholder="Buscar"
                            deshabilitado={seleccion !== "Descuento"}
                            {...register("producto_descuento", { required: { value: true, message: "Ingrese nombre o codigo del Producto" } })}
                        />
                    </Tarjeta>
                    <Tarjeta >
                    <Selector opciones={["Codigo", "Producto"]} id="tipoBusqueda" deshabilitado={seleccion !== "Descuento"}/>
                    </Tarjeta>
                    <Tarjeta descripcion="Porcentaje a Aplicar" forid="porcentaje" mensajeError={errors.porcentaje_descuento?.message}>
                        <Input
                            tipo="porcentaje"
                            id="porcentaje"
                            deshabilitado={seleccion !== "Descuento"}
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
                    <Tarjeta descripcion="Duracion" forid="duracion_descuento" mensajeError={errors.duracion_descuento?.message}>
                        <Input
                            tipo="date"
                            id="duracion_descuento"
                            deshabilitado={seleccion !== "Descuento"}
                            {...register("duracion_descuento", {
                                required: { value: true, message: "Ingrese fecha limite del descuento" },
                                validate: (value) => {
                                    const fechaDescuento = new Date(value);
                                    const fechaActual = new Date();
                                    if (fechaDescuento>fechaActual) return true;
                                    else return "Ingrese una fecha posterior al dia de hoy";
                                }
                            })}
                        />
                    </Tarjeta>
                </div>
                <div className="__boton_descuento">
                    <Boton descripcion='Agregar' habilitado={seleccion === 'Descuento'} submit></Boton>
                </div>
            </form>
        </>

    )
}