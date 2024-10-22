import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from "../../Boton/Boton";
import './NuevoProducto.css';
import { useState } from 'react'
import iconMas from "../../../assets/mas.png";
import NuevaCategoria from "../NuevaCategoria/NuevaCategoria"
import NuevaMarca from "../NuevaMarca/NuevaMarca"
import Modal from "../../Modal/Modal";

export default function NuevoProducto({ autocompletar }) {

    const [modalNuevaMarca, setModalNuevaMarca] = useState(false); // Abre o cierra el modal de nueva marca

    const manejaNuevaMarca = () => {
        setModalNuevaMarca(!modalNuevaMarca);
    };

    const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false); // Abre o cierra el modal nueva categoria

    const manejaNuevaCategoria = () => {
        setModalNuevaCategoria(!modalNuevaCategoria);
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            fecha: new Date().toLocaleDateString('es-AR')
        }
    });




    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })}>
                <div className="__cuerpo_nuevo_producto">
                    <div className="__columna_1">
                        <Tarjeta descripcion="Codigo" forid="codigo" mensajeError={errors.codigo?.message}>
                            <Input
                                tipo="text"
                                id="codigo"
                                placeholder="Codigo del producto"
                                {...register("codigo", { required: { value: true, message: "Ingrese un codigo de Producto" } })}
                            > </Input>
                        </Tarjeta>
                        <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto?.message}>
                            <Input
                                tipo="text "
                                id="producto"
                                placeholder="Nombre del producto"
                                {...register("producto", { required: { value: true, message: "Ingrese nombre del Producto" } })}
                            > </Input>
                        </Tarjeta>
                        <Tarjeta descripcion="Costo" forid="costo" mensajeError={errors.costo?.message}>
                            <Input
                                tipo="costo"
                                id="costo"
                                placeholder="00,00"
                                {...register("costo", {
                                    required: {
                                        value: true,
                                        message: "Ingrese precio del Producto"
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
                    <div className="__columna_2">
                        <Tarjeta descripcion="Categoria" forid="categoria">
                            <Selector opciones={["Gaseosa", "Cerveza", "Vino"]} id="categoria"
                                {...register("categoria")}>
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Marca" forid="marca">
                            <Selector opciones={["Pepsi", "Quilmes", "Coca-Cola"]} id="marca"
                                {...register("marca")}
                            >
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Stock Inicial" forid="stock" mensajeError={errors.stock?.message}>
                            <Input
                                tipo="number"
                                id="stock"
                                placeholder="0"
                                {...register("stock", {
                                    required: {
                                        value: true,
                                        message: "Ingrese cantidad del Producto"
                                    },
                                    validate: (value) => {
                                        if (value >= 0 && value <= 700) return true;
                                        else return "Ingrese una cantidad entre '0' y '700' unidades";
                                    },
                                })}
                            > </Input>
                        </Tarjeta>


                    </div>
                    <div className="__columna_3">
                        <Tarjeta descripcion="Nueva Categoria">
                            <Boton icono={iconMas} onClick={manejaNuevaCategoria} habilitado></Boton>
                        </Tarjeta>
                        <Tarjeta descripcion="Nueva Marca">
                            <Boton icono={iconMas} onClick={manejaNuevaMarca} habilitado></Boton>
                        </Tarjeta>

                    </div>



                </div>
                <div className="__formulario_boton">
                    <Boton descripcion='Agregar' habilitado submit></Boton>
                </div>
            </form>
            <div className="__modal_nuevo_proveedor">

                <Modal visible={modalNuevaCategoria} titulo="Nuevo Categoria" funcion={manejaNuevaCategoria} anchura={"500px"} >
                    <NuevaCategoria></NuevaCategoria>
                </Modal>
                <Modal visible={modalNuevaMarca} titulo="Nuevo Marca" funcion={manejaNuevaMarca} anchura={"500px"} >
                    <NuevaMarca></NuevaMarca>
                </Modal>
            </div>
        </>
    )
} 