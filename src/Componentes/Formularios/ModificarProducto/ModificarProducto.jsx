import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from "../../Boton/Boton";
import Selector from "../../Selector/Selector";
import '../NuevoProducto/NuevoProducto.css';
import { useState } from 'react'


export default function ModificarProducto({ autocompletar }) {

    const [modificar, setModificar] = useState(false); // Estado que Habilita la modificacion del producto

    const manejaModificacion = () => {
        setModificar(!modificar); 
    };


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            fecha: new Date().toLocaleDateString('es-AR'),
            codigo:autocompletar.Codigo,
            producto:autocompletar.Nombre,
            costo:autocompletar.Costo,
            categoria: autocompletar.Categoria,
            marca: autocompletar.Marca,
            stock: autocompletar.Stock
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
                                deshabilitado={!modificar}
                                id="codigo"
                                {...register("codigo", { required: { value: true, message: "Ingrese un codigo de Producto" } })}
                            > </Input>
                        </Tarjeta>
                        <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto?.message}>
                            <Input
                                tipo="text "
                                id="producto"
                                deshabilitado={!modificar}
                                {...register("producto", { required: { value: true, message: "Ingrese nombre del Producto" } })}
                            > </Input>
                        </Tarjeta>
                        <Tarjeta descripcion="Costo" forid="costo" mensajeError={errors.costo?.message}>
                            <Input
                                tipo="costo"
                                id="costo"
                                deshabilitado={!modificar}
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
                                        const numericValue = parseFloat(String(value).replace(',', '.'));
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
                            <Selector opciones={["Gaseosas", "Cervezas", "Vinos","Vodkas"]} id="categoria" deshabilitado={!modificar}
                                {...register("categoria")}>
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Marca" forid="marca">
                            <Selector opciones={["Pepsi", "Quilmes", "Coca Cola","Fanta"]} id="marca" deshabilitado={!modificar}
                                {...register("marca")}
                            >
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Cantidad" forid="stock" mensajeError={errors.stock?.message}>
                        <Input
                            tipo="number"
                            id="stock"
                            placeholder="0"
                            deshabilitado={!modificar}
                            {...register("stock", {
                                required: {
                                    value: true,
                                    message: "Ingrese cantidad del Producto"
                                },
            
                            })}
                        > </Input>
                    </Tarjeta>  
                    </div>
                        <div className="__observacion">
                        <Tarjeta descripcion="Observacion" forid="observacion">
                            <Input
                                tipo="text"
                                id="observacion"
                                deshabilitado={!modificar}
                                {...register("observacion")}
                            > </Input>
                        </Tarjeta>
                        </div>
                </div>
                <div className="__formulario_boton">
                    <Boton descripcion='Modificar' habilitado ={!modificar} onClick={manejaModificacion}></Boton>
                    <Boton descripcion='Guardar' habilitado={modificar} submit></Boton>
                </div>
            </form>
        </>
    )
} 