import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";

export default function FormularioCombo({ seleccion }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    

        }

    });


    return (
        <>
          
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_combo">
                <div className="__cuerpo_combo">
                    <Tarjeta descripcion="Codigo Nº" forid="codigo">
                        <Input
                            tipo="text"
                            id="codigo"
                            deshabilitado
                        />
                    </Tarjeta>
                    <div className="__busqueda_producto">
                        <Tarjeta descripcion="Combo" forid="producto_combo">
                            <Input
                                tipo="search"
                                id="producto_combo"
                                placeholder="Buscar"
                                deshabilitado={seleccion !== "Combo"}
                            />
                        </Tarjeta>
                        <Selector opciones={["Codigo", "Producto"]} id="tipoBusqueda" deshabilitado={seleccion !== "Combo"}>
                        </Selector>
                    </div>
                    <Tarjeta descripcion="Productos del combo" forid="producto_del_combo" mensajeError={errors.productos_incluidos?.message}>
                        <Input
                            tipo="text"
                            id="producto_del_combo"
                            placeholder="Aqui van los productos sleccionados"
                            deshabilitado={seleccion !== "Combo"}
                            {...register("productos_incluidos", { required: { value: true, message: "No selecciono productos para el combo" } })}
                        />
                    </Tarjeta>
                    <Tarjeta descripcion="Duracion" forid="duracion_combo" mensajeError={errors.duracion_combo?.message}>
                        <Input
                            tipo="date"
                            id="duracion_combo"
                            deshabilitado={seleccion !== "Combo"}
                            {...register("duracion_combo", { required: { value: true, message: "Ingrese fecha limite del Combo" },
                                validate: (value) => {
                                    const fechaCombo = new Date(value);
                                    const fechaActual = new Date();
                                    if (fechaCombo>fechaActual) return true;
                                    else return "Ingrese una fecha posterior al dia de hoy";
                                }
                            })}
                        />
                    </Tarjeta>
                    <Tarjeta descripcion="Costo" forid="costo" mensajeError={errors.costo?.message}>
                        <Input
                            tipo="number"
                            id="costo"
                            placeholder="$0,00"
                            deshabilitado={seleccion !== "Combo"}
                            {...register("costo", {
                                required: {
                                    value: true,
                                    message: "Ingrese precio del Combo"
                                },
                                validate: (value) => {
                                    if (value > 0) return true;
                                    else return "Ingrese un precio positivo";
                                },
                            })}
                        />
                    </Tarjeta>
                </div>
                <div className="__boton_combo">
                    <Boton descripcion='Crear' habilitado={seleccion === 'Combo'} submit></Boton>
                </div>
            </form>
        </>
    )
}