import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from "../../Boton/Boton";
import Selector from "../../Selector/Selector";
import '../NuevoProducto/NuevoProducto.css';
import './ModificarProducto.css';
import restar from '../../../assets/eliminar.png'
import { useState, useEffect } from 'react'


export default function ModificarProducto({ autocompletar, onGuardar }) {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            fecha: new Date().toLocaleDateString('es-AR'),
            codigo: autocompletar.codigo,
            producto: autocompletar.producto,
            costo: autocompletar.costo,
            alerta_minima: autocompletar.alerta_minima,


        }
    });
    const [modificar, setModificar] = useState(false); // Estado que Habilita la modificacion del producto

    const [cant, setCant] = useState(autocompletar.stock)

    const [modCant, setModCant] = useState(false);

    const [cantidadDisminuida, setCantidadDisminuida] = useState(0);



    const manejaModificacion = () => {
        setModificar(!modificar);
    };

    const disminuyeCant = () => {
        if (!modCant) {
            setModCant(true)
        }
        if (cant > 0) {
            setCant(cant - 1);
            setCantidadDisminuida(cantidadDisminuida + 1)
        }
    }

    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categoria')
            .then(respuesta => respuesta.json())
            .then(datos => setCategorias(datos))
            .catch(e => console.log(e));
    }, []);


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/marca')
            .then(respuesta => respuesta.json())
            .then(datos => {
                setMarcas(datos)
                setValue('id_marca', 6)

            })

            .catch(e => console.log(e));

    }, []);



    const onSubmit = async (data) => {
        console.log(data);
        try {
            const productoUrl = `http://127.0.0.1:8000/api/producto/${autocompletar.id_producto}`;
            console.log(productoUrl);
            // Paso 1: Busca y actualiza producto
            const respuestaProducto = await fetch(productoUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!respuestaProducto.ok) {
                console.error('Error al modificar el producto');
                return;
            }


            const productoModificado = await respuestaProducto.json();
            console.log('Producto modificado:', productoModificado);

            // Paso 2: Crear el registro en la tabla `stock`
            const stockData = {
                cantidad: cantidadDisminuida,  // Usamos la cantidad del formulario
                tipo: "Manual",
                observaciones: data.observaciones || "Modificacion",
                id_producto: autocompletar.id_producto,  // Usamos el id_producto del producto recién creado
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
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="__formulario_modificar_producto">
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
                            <Selector opciones={categorias.map(cat => ({ label: cat.nombre_categoria, value: cat.id_categoria }))}
                                id="categoria" deshabilitado={!modificar}
                                defaultValue={autocompletar.id_categoria}
                                {...register("id_categoria")}>
                            </Selector>
                        </Tarjeta>
                        <Tarjeta descripcion="Marca" forid="marca">
                            <Selector opciones={marcas.map(marca => ({ label: marca.nombre_marca, value: marca.id_marca }))}
                                id="marca" deshabilitado={!modificar}
                                defaultValue={autocompletar.id_marca}
                                {...register("id_marca")}
                            >
                            </Selector>
                        </Tarjeta>
                        <div className="__fila3">
                            <Tarjeta descripcion="Cantidad" forid="stock" mensajeError={errors.stock?.message}>
                                <Input
                                    tipo="number"
                                    id="stock"
                                    placeholder={cant}
                                    deshabilitado
                                    {...register("cantidad")}
                                > </Input>
                            </Tarjeta>
                            <Boton icono={restar} onClick={disminuyeCant} habilitado={modificar}></Boton>
                        </div>
                        {modCant && <div className="__mensaje_cantidad">Cantidad disminuida: {cantidadDisminuida}</div>/*Muestra mensaje cuando se disminuye*/}
                    </div>
                    <div className="__observacion">
                        <Tarjeta descripcion="Observacion" forid="observacion" mensajeError={errors.observacion?.message}>
                            <textarea
                                id="obeservacion"
                                disabled={!modificar}
                                className={`${modificar ? '__texto_habilitado' : '__texto_deshabilitado'}`}
                                {...register("observaciones", { required: { value: (cantidadDisminuida > 0), message: "Ingrese motivo" } })}
                            > </textarea>
                        </Tarjeta>
                        <Tarjeta descripcion="Minima Alerta" forid="alerta" mensajeError={errors.stock?.message}>
                            <Input
                                tipo="number"
                                id="alerta"
                                deshabilitado={!modificar}
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
                    </div>
                </div>
                <div className="__formulario_boton">
                    <Boton descripcion='Modificar' habilitado={!modificar} onClick={manejaModificacion}></Boton>
                    <Boton descripcion='Guardar' habilitado={modificar} submit></Boton>
                </div>
            </form>
        </>
    )
} 