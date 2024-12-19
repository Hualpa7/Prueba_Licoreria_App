import { set, useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import { useState } from "react";
import TablaConPaginacion from "../../TablaConPaginacion/TablaConPaginacion";
import Modal from "../../Modal/Modal";
import AgregarProductoCombo from "../AgregarProductoCombo/AgregarProductoCombo";
import './FormularioCombo.css'
import agregar from '../../../assets/agregar_combo.png'
import quitar from '../../../assets/quitar_combo.png'
import { toast } from "sonner";

export default function FormularioCombo({ onGuardar }) {

    //MANTIENE ARRAY DE PRODUCTOS Y SU MANEJO
    const [productos, setProductos] = useState([]);

    const manejarAgregarProducto = (producto) => {
        setProductos([...productos, producto]);
    };

    //CONTROLA MODAL DE AGREGAR NUEVO PRODUCTO AL COMBO
    const [modalAgregarProducto, setModalAgregarProducto] = useState(false);

    const manejaModalAgregarProducto = () => {
        setModalAgregarProducto(!modalAgregarProducto);
    }

    //HOOK FORM
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            id_sucursal: "1"
        }

    });


    const onSumbit = async (data) => {
        if (productos.length === 0) {
            alert("No hay productos en el combo");

        }
        else {
            try {
                setCargando(true);
                const payload = {
                    ...data, // Datos del combo
                    productos, // Array de productos con ID_Producto y Cantidad
                };
                console.log(payload);
                const respuesta = await fetch('http://127.0.0.1:8000/api/combo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!respuesta.ok) {
                    console.error('Error al crear el combo');
                    toast.error("Error al crear el combo.",{className:"__toaster_error"});
                    return;
                }
                const comboCreado = await respuesta.json();
                console.log("Combo creado:", comboCreado);
                toast.success("Combo creado correctamente.",{className:"__toaster_success"});
                onGuardar();

            } catch (error) {
                console.error('Error en la solicitud:', error);
                toast.error("Error inesperado al crear el combo.",{className:"__toaster_error"});
            } finally {
                setCargando(false);
            }

        }

    }
    /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
    const [cargando, setCargando] = useState(false);


    //LAYOUT

    return (
        <>
            {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            <form onSubmit={handleSubmit(onSumbit)} className="__formulario_combo">
                <div className="__cuerpo_combo">
                    <div className="__fila1">
                        <Tarjeta descripcion="Codigo" forid="codigo" mensajeError={errors.codigo?.message}>
                            <Input
                                tipo="text"
                                id="codigo"
                                placeholder="Codigo"
                                {...register("codigo", { required: { value: true, message: "Ingrese un codigo del Combo" } })}
                            />
                        </Tarjeta>

                        <Tarjeta descripcion="Nombre" forid="nombre" mensajeError={errors.nombre?.message}>
                            <Input
                                tipo="text "
                                id="nombre"
                                placeholder="Nombre del combo"
                                {...register("nombre", { required: { value: true, message: "Ingrese nombre del Combo" } })}
                            > </Input>
                        </Tarjeta>
                    </div>
                    <div className="__productos_combo">
                        <TablaConPaginacion
                            columnas={["Nombre", "cantidad"]}
                            datos={productos}
                            itemsPorPagina={6}
                        >
                        </TablaConPaginacion>
                        <div className="__agregar_quitar">

                            <Boton icono={agregar} habilitado onClick={manejaModalAgregarProducto} ></Boton>
                            <div className="__quitar">
                                <Boton icono={quitar} habilitado></Boton>
                            </div>
                        </div>

                    </div>
                    <div className="__fila3">
                        <Tarjeta descripcion="Duracion" forid="duracion_combo" mensajeError={errors.duracion?.message}>
                            <Input
                                tipo="date"
                                id="duracion_combo"
                                {...register("duracion", {
                                    required: { value: true, message: "Ingrese fecha limite del descuento" },
                                    validate: (value) => {
                                        const fechaDescuento = new Date(value.replace(/-/g, '/'));
                                        const fechaActual = new Date();
                                        if (!isNaN(fechaDescuento) && fechaDescuento > fechaActual) return true;
                                        else return "Ingrese una fecha posterior al dia de hoy";
                                    }
                                })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Costo" forid="costo" mensajeError={errors.costo?.message}>
                            <Input
                                tipo="costo"
                                id="costo"
                                placeholder="00,00"
                                {...register("costo", {
                                    required: {
                                        value: true,
                                        message: "Ingrese precio del Combo"
                                    },
                                    validate: (value) => { //aqui evaluo con otra forma el patron, ya que debo hacer 2 validaciones
                                        const patron = /^\d+(,\d{1,2})?$/; //para que se respete el ingreso luego de la coma y luego
                                        if (!patron.test(value)) {            //convertir el texto en numero para erificar ques es mayor a cero
                                            return "Valor con 2 decimales luego de la ','";
                                        }
                                        // Reemplaza la coma por un punto y convierte a número
                                        const numericValue = parseFloat(value.replace(',', '.'));
                                        if (numericValue <= 0) {
                                            return "Ingrese un precio positivo";
                                        }
                                        return true;
                                    },
                                })}
                            />
                        </Tarjeta>
                    </div>
                </div>
                <div className="__boton_combo">
                    <Boton descripcion='Crear' habilitado submit></Boton>
                </div>
            </form >
            <Modal visible={modalAgregarProducto} titulo="Agregar al Combo" anchura="600px" funcion={manejaModalAgregarProducto}>
                <AgregarProductoCombo onGuardar={manejaModalAgregarProducto} onAgregarProducto={manejarAgregarProducto}></AgregarProductoCombo>
            </Modal>
        </>
    )
}