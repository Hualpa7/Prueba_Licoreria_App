import { useForm, useWatch } from "react-hook-form"
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from '../../Boton/Boton'
import './AgregarProductoCarrito.css';
import { useBusqueda } from "../../../hooks/useBusqueda";



export default function AgregarProductoCarrito({ onGuardar, onAgregarProducto }) {


    //HOOKK FORM
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({
        defaultValues: {
            tipo_busqueda: "Nombre",
            buscarProducto_Combo: "Producto"
        }

    });

    //USE WATCH PARA SABER QUE TIPO DE BUSQUEDA SE ESTA REALIZANDO, POR CODIGO O NOMBRE
    const tipoBusqueda = useWatch({ control, name: "tipo_busqueda" });


    //WATCH PARA DETEMRINAR QUE CLASE DE BUSQUEDA SE ESTA HACIENDO, SI SE ESTA BUSCANDO UN PRODUCTO O UN COMBO

    const claseBusqueda = useWatch({ control, name: "buscarProducto_Combo" });


    //USAR HOOK DE USEBUSQUEDA PARA BUSCAR PRODUCTO o COMBO
    const {
        sugerencias: productoSugerencias,
        terminoBusqueda: buscarProducto,
        setTerminoBusqueda: setBuscarProducto,
        seleccionado: productoSeleccionado,
        manejarSeleccion: seleccionarProducto
    } = useBusqueda('producto', tipoBusqueda, setValue);

    const {
        sugerencias: comboSugerencias,
        terminoBusqueda: buscarCombo,
        setTerminoBusqueda: setBuscarCombo,
        seleccionado: comboSeleccionado,
        manejarSeleccion: seleccionarCombo
    } = useBusqueda('combo', tipoBusqueda, setValue);



    //MANDA PRODUCTO O COMBO AL CARRITO
    const onSubmit = (data) => {
        if(claseBusqueda === "Producto"){
            const producto = { id_producto: data.id_producto, Nombre: `${productoSeleccionado}`, cantidad: data.cantidad, IVA:data.iva, esCombo:false};  
            console.log(producto);
            onAgregarProducto(producto);
            onGuardar();
        }
        else{
            const combo = { id_combo: data.id_combo, Nombre: `${comboSeleccionado}`, cantidad: data.cantidad, IVA:0, esCombo:true};  
            console.log(combo);
            onAgregarProducto(combo);
            onGuardar();
        }
       

    }

    ///LAYOUT

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="__form_Agrego_carrito">
            <div className="__cuerpo_agregar_carrito">
                <div className="__columna1">
                    {claseBusqueda === "Producto" && <Tarjeta descripcion="Producto" forid="producto" >
                        <Input
                            tipo="search"
                            id="producto"
                            placeholder="Buscar"
                            value={productoSeleccionado || buscarProducto}
                            onChange={(e) => {
                                setBuscarProducto(e.target.value);
                                if (productoSeleccionado) seleccionarProducto(null);
                            }}


                        />
                        {productoSugerencias.length > 0 && (
                            <ul className="__sugerencias">
                                {productoSugerencias.map((producto) => (
                                    <li key={producto.id_producto} onClick={() => seleccionarProducto(producto)}>
                                        {tipoBusqueda === "Nombre" ? producto.producto : producto.codigo}

                                    </li>
                                ))}
                            </ul>
                        )}
                    </Tarjeta>}

                    {claseBusqueda === "Combo" && <Tarjeta descripcion="Combo" forid="combo">
                        <Input
                            tipo="search"
                            id="combo"
                            placeholder="Buscar"
                            value={comboSeleccionado || buscarCombo}
                            onChange={(e) => {
                                setBuscarCombo(e.target.value);
                                if (comboSeleccionado) seleccionarCombo(null);
                            }}


                        />
                        {comboSugerencias.length > 0 && (
                            <ul className="__sugerencias">
                                {comboSugerencias.map((combo) => (
                                    <li key={combo.id_combo} onClick={() => seleccionarCombo(combo)}>
                                        {tipoBusqueda === "Nombre" ? combo.nombre : combo.codigo}

                                    </li>
                                ))}
                            </ul>
                        )}
                    </Tarjeta>}

                    <Tarjeta descripcion="Cantidad" forid="cantidad" mensajeError={errors.cantidad?.message}>
                        <Input
                            tipo="number"
                            id="cantidad"
                            placeholder="0"
                            {...register("cantidad", {
                                required: {
                                    value: true,
                                    message: `Ingrese cantidad del ${claseBusqueda}`
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
                    <Tarjeta descripcion="Buscar por" forid="tipoBusqueda">
                        <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]} id="tipoBusqueda"
                            opcionDefecto
                            {...register("tipo_busqueda")}
                        >
                        </Selector>
                    </Tarjeta>
                    {claseBusqueda === "Producto" && <Tarjeta descripcion="IVA %" forid="iva" mensajeError={errors.iva?.message}>
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
                <Tarjeta descripcion="Buscar Codigo o Producto?" forid="buscarProducto_Combo">
                    <Selector opciones={[{ label: "Producto", value: "Producto" }, { label: "Combo", value: "Combo" }]} id="buscarProducto_Combo"
                        opcionDefecto
                        {...register("buscarProducto_Combo")}
                    >
                    </Selector>
                </Tarjeta>

                <Boton descripcion='Agregar' habilitado submit></Boton>

            </div>




        </form>

    )

}