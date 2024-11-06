import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'

import './AgregarCarrito.css';


export default function AgregarCarrito({ }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        //constante que devuleve todo lo del form

    });


    return (
        <form onSubmit={handleSubmit((data) => {
            reset();
            console.log(data);
        })} className="__form_Agrego_carrito">
            <div className="__cuerpo_agregar_carrito">
                <div className="__columna1">
                    <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto?.message}>
                        <Input
                            tipo="search"
                            id="producto"
                            placeholder="Buscar"
                            {...register("producto", { required: { value: true, message: "Ingrese nombre del Producto" } })}
                        />

                    </Tarjeta>
                    <Tarjeta descripcion="Cantidad" forid="cantidad" mensajeError={errors.cantidad?.message}>
                        <Input
                            tipo="number"
                            id="cantidad"
                            placeholder="0"
                            {...register("cantidad", {
                                required: {
                                    value: true,
                                    message: "Ingrese cantidad del Producto"
                                },
                                validate: (value) => {
                                    if (value >= 0 && value <= 700) return true;
                                    else return "Ingrese una cantidad entre '0' y '700' unidades";
                                },
                            })}
                        />
                    </Tarjeta>
                </div>
                <div className="__columna2">
                    <Selector opciones={["Codigo", "Producto"]} id="tipoBusqueda"
                        {...register("tipoBusqueda")}
                    >
                    </Selector>

                    <Tarjeta descripcion="IVA %" forid="iva" mensajeError={errors.iva?.message}>
                        <Input
                            tipo="input"
                            id="iva"
                            defaultValue={21}
                            {...register("iva", {
                                required: {
                                    value: true,
                                    message: "Ingrese IVA del Producto"
                                },
                                validate: (value) => {
                                    if (value >= 0 && value <= 100) return true;
                                    else return "Ingrese un IVA entre '0%' y '100%' ";
                                },
                            })}
                        />
                    </Tarjeta>
                </div>
            </div>
            <div className="__columna3">

                <Boton descripcion='Agregar' habilitado submit></Boton>

            </div>




        </form>

    )

}