import { useForm, useWatch } from "react-hook-form"
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import './AgregarProducto.css';
import { useBusqueda } from "../../../hooks/useBusqueda";



export default function AgregarProducto({ onGuardar, onAgregarProducto, paraCombo }) {



    //HOOKK FORM
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({
        defaultValues: {
            tipo_busqueda_Producto: "Nombre",
        }

    });

    //USE WATCH PARA SABER QUE TIPO DE BUSQUEDA SE ESTA REALIZANDO, POR CODIGO O NOMBRE
    const tipoBusquedaProducto = useWatch({ control, name: "tipo_busqueda_Producto" });

    //USAR HOOK DE USEBUSQUEDA PARA BUSCAR PRODUCTO
    const {
        sugerencias: productoSugerencias,
        terminoBusqueda: buscarProducto,
        setTerminoBusqueda: setBuscarProducto,
        seleccionado: productoSeleccionado,
        manejarSeleccion: seleccionarProducto
    } = useBusqueda('producto', tipoBusquedaProducto, setValue);



    const onSubmit = (data) => {
        console.log(productoSeleccionado);
        const producto = { id_producto: data.id_producto, Nombre: `${productoSeleccionado}`, cantidad: data.cantidad, };
        if (!paraCombo) {
            producto.IVA = data.iva;
        }
        onAgregarProducto(producto);
        onGuardar();
    }

    ///LAYOUT

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="__form_Agrego_carrito">
            <div className="__cuerpo_agregar_carrito">
                <div className="__columna1">
                    <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto?.message}>
                        <Input
                            tipo="search"
                            id="producto"
                            placeholder="Buscar"
                            value={productoSeleccionado || buscarProducto}
                            onChange={(e) => {
                                setBuscarProducto(e.target.value);
                                if (productoSeleccionado) seleccionarProducto(null);
                            }}
                        /*{...register("producto", {
                            required:{
                                value:true,
                                message: "Ingrese producto"
                            }
                        })}*/

                        />
                        {productoSugerencias.length > 0 && (
                            <ul className="__sugerencias">
                                {productoSugerencias.map((producto) => (
                                    <li key={producto.id_producto} onClick={() => seleccionarProducto(producto)}>
                                        {tipoBusquedaProducto === "Nombre" ? producto.producto : producto.codigo}

                                    </li>
                                ))}
                            </ul>
                        )}
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
                    <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]} id="tipoBusqueda"
                        opcionDefecto
                        {...register("tipo_busqueda_Producto")}
                    >
                    </Selector>
                    {!paraCombo && <Tarjeta descripcion="IVA %" forid="iva" mensajeError={errors.iva?.message}>
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
                    </Tarjeta>}

                </div>
            </div>
            <div className="__columna3">

                <Boton descripcion='Agregar' habilitado submit></Boton>

            </div>




        </form>

    )

}