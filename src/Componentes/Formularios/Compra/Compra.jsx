import { useForm } from "react-hook-form"
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import MensajeErrorForm from "../../ComponentesFormulario/MensajeErrorForm/MensajeErrorForm";
import iconMas from "../../../assets/mas.png";
import { useState } from 'react'
import Modal from "../../Modal/Modal";
import NuevoProveedor from "../NuevoProveedor/NuevoProveedor";
import './Compra.css';


export default function Compra({ }) {
    const [modalNuevoProveedor, setModalNuevoProveedor] = useState(false); // Abre o cierra el modal nueva oferta

    const manejaNuevoProveedor = () => {
        setModalNuevoProveedor(!modalNuevoProveedor);
    };


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            compra: "888-8888",
            fecha: new Date().toLocaleDateString('es-AR')

        }
    });

    return (
        <>

            <form onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
            })} className="__formulario_compra">
                <div className="__datos_compra">
                    <div className="__primera_columna">
                        <Tarjeta descripcion="Compra Nº" forid="compra">
                            <Input
                                tipo="text"
                                id="compra"
                                deshabilitado
                                {...register("compra")}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto?.message}>
                            <Input
                                tipo="search"
                                id="producto"
                                placeholder="Buscar"
                                {...register("producto", { required: { value: true, message: "Ingrese nombre o codigo del Producto" } })}
                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Proveedor" forid="proveedor" mensajeError={errors.proveedor?.message} >
                            <Input
                                tipo="search"
                                id="proveedor"
                                placeholder="Buscar"
                                {...register("proveedor", { required: { value: true, message: "Ingrese nombre o codigo del Proveedor" } })}
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
                            > </Input>
                        </Tarjeta>
                    </div>
                    <div className="__segunda_columna">
                        <Tarjeta descripcion="Fecha" forid="fecha">
                            <Input
                                tipo="text"
                                id="fecha"
                                
                                placeholder="dd/mm/aaa"
                                deshabilitado
                                {...register("fecha")}
                            />
                        </Tarjeta>


                        <Selector opciones={["Codigo", "Producto"]}
                        />

                        <Selector opciones={["ID", "Nombre"]} id="tipoBusqueda"
                        />
                    </div>
                    <div className="__tercera_columna">
                        <Tarjeta descripcion="Cargar Nuevo Proveedor">
                        <Boton icono={iconMas} onClick={manejaNuevoProveedor} habilitado></Boton>
                        </Tarjeta>
                    </div>
                </div>
                <div className="__submit">
                    <Tarjeta descripcion="TOTAL" forid="total" mensajeError={errors.total?.message}>
                        <Input
                            tipo="costo"
                            id="total"
                            placeholder="00,00"
                            {...register("total", {
                                required: {
                                    value: true,
                                    message: "Ingrese TOTAL de la Compra"
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
                        > </Input>
                    </Tarjeta>
                    <Boton descripcion='Cargar' submit habilitado></Boton>
                </div>
            </form>
            <div className="__modal_nuevo_proveedor">

            <Modal visible={modalNuevoProveedor} titulo="Nuevo Proveedor" funcion={manejaNuevoProveedor} anchura={"500px"} >
                <NuevoProveedor></NuevoProveedor>
            </Modal>
            </div>
        </>

    )
}