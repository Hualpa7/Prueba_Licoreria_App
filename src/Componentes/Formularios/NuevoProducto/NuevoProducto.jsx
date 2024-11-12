import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from "../../Boton/Boton";
import './NuevoProducto.css';
import { useState, useEffect } from 'react'
import iconMas from "../../../assets/mas.png";
import NuevaCategoria from "../NuevaCategoria/NuevaCategoria"
import NuevaMarca from "../NuevaMarca/NuevaMarca"
import Modal from "../../Modal/Modal";

export default function NuevoProducto({ categorias, marcas, onGuardar }) {


    /////////// MODAL NUEVA MARCA
    const [modalNuevaMarca, setModalNuevaMarca] = useState(false); // Abre o cierra el modal de nueva marca
    const manejaNuevaMarca = () => {
        setModalNuevaMarca(!modalNuevaMarca);
    };

    ////////// MODAL NUEVA ACATEGORIA    
    const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false); // Abre o cierra el modal nueva categoria
    const manejaNuevaCategoria = () => {
        setModalNuevaCategoria(!modalNuevaCategoria);
    };


    //////////FORM HOOK
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            fecha: new Date().toLocaleDateString('es-AR')
        }
    });


    /////// SE CARGA EL NUEVO PRODUCTO Y SE CARGA SU REGISTRO EN STOCK
    const onSubmit = async (data) => {
        setCargando(true);
        try {
            // Paso 1: Crear el producto
            const respuestaProducto = await fetch('http://127.0.0.1:8000/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!respuestaProducto.ok) {
                console.error('Error al crear el producto');
                return;
            }


            const productoCreado = await respuestaProducto.json();
            const id_producto = productoCreado.id_producto; // Capturamos el ID del producto creado
            console.log('Producto creado:', productoCreado);

            // Paso 2: Crear el registro en la tabla `stock`
            const stockData = {
                cantidad: data.cantidad,  // Usamos la cantidad del formulario
                tipo: "Manual",
                observaciones: "Carga Inicial",
                id_producto: id_producto,  // Usamos el id_producto del producto recién creado
                id_sucursal: 1,            // Valor fijo en 1
            };

            const respuestaStock = await fetch('http://127.0.0.1:8000/api/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockData),
            });

            if (!respuestaStock.ok) {
                console.error('Error al crear el registro en stock');
                return;
            }

            const stockCreado = await respuestaStock.json();
            console.log('Registro en stock creado:', stockCreado);

            reset(); // Resetea el formulario solo después de que ambas operaciones fueron exitosas
            onGuardar();
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }finally{
            setCargando(false);
        }
    };

     /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
     const [cargando, setCargando] = useState(false);


    ///////LAYOUT

    return (
        <>
         {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Tarjeta descripcion="Minima Alerta" forid="alerta" mensajeError={errors.stock?.message}>
                            <Input
                                tipo="number"
                                id="alerta"
                                placeholder="0"
                                {...register("alerta_minima", {
                                    required: {
                                        value: true,
                                        message: "Ingrese valor para alertar"
                                    },
                                    validate: (value) => {
                                        if (value >= 0) return true;
                                        else return "Ingrese una cantidad entre mayor a '0'";
                                    },
                                })}
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
                            <Selector opciones={categorias.map(cat => ({ label: cat.nombre_categoria, value: cat.id_categoria }))}
                                id="categoria"
                                {...register("id_categoria")}>
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Marca" forid="marca">
                            <Selector opciones={marcas.map(marca => ({ label: marca.nombre_marca, value: marca.id_marca }))}
                                id="marca"
                                {...register("id_marca")}
                            >
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Stock Inicial" forid="stock" mensajeError={errors.stock?.message}>
                            <Input
                                tipo="number"
                                id="stock"
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
                    <NuevaCategoria onGuardar={manejaNuevaCategoria}></NuevaCategoria>
                </Modal>
                <Modal visible={modalNuevaMarca} titulo="Nuevo Marca" funcion={manejaNuevaMarca} anchura={"500px"} >
                    <NuevaMarca onGuardar={manejaNuevaMarca}></NuevaMarca>
                </Modal>
            </div>
        </>
    )
} 