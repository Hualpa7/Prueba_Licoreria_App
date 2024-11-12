import { useForm, useWatch } from "react-hook-form"
import { useState, useEffect, useRef } from 'react'
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Boton from "../../Boton/Boton";
import iconMas from "../../../assets/mas.png";
import Modal from "../../Modal/Modal";
import NuevoProveedor from "../NuevoProveedor/NuevoProveedor";
import './Compra.css';


export default function Compra({ onGuardar }) {

    ////// CONTROLA MODAL DE NUEVO PROVEEDOR
    const [modalNuevoProveedor, setModalNuevoProveedor] = useState(false); // Abre o cierra el modal nueva oferta

    const manejaNuevoProveedor = () => {
        setModalNuevoProveedor(!modalNuevoProveedor);
    };


    ////////// HOOK FORM
    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            id_sucursal: "1",  //cambiar HARDCOEDEADO
            tipo_busqueda_Producto:"Nombre",
            tipo_busqueda_Proveedor:"Nombre"
        }
    });


    /////// SE CARGA EL NUEVO PRODUCTO Y SE CARGA SU REGISTRO EN STOCK
    const onSubmit = async (data) => {
        setCargando(true);
        try {
            // Paso 1: Crear el producto
            const respuestaCompra = await fetch('http://127.0.0.1:8000/api/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(data);
            if (!respuestaCompra.ok) {
                console.error('Error al crear la compra');
                return;
            }



            const id_producto = data.producto; // Capturamos el ID del producto creado


            // Paso 2: Crear el registro en la tabla `stock`
            const stockData = {
                cantidad: data.cantidad,  // Usamos la cantidad del formulario
                tipo: "Compra",
                id_producto: data.id_producto,  // Usamos el id_producto del producto recién creado
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
        } finally {
            setCargando(false);
        }
    };


    /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
    const [cargando, setCargando] = useState(false);



    ////////BUSQUEDA COINCIDENCIAS DE PRODUCTO:

    ////////// ESTADOS PARA LA BUSQUEDA DE PRODUCTO 
    const [productoSugerencias, setProductoSugerencias] = useState([]); //array de sugerencias
    const [buscarProducto, setBuscarProducto] = useState('');//busca producto string
    const productoTimeOutRef = useRef(null);//para controlar el timeout de la busqueda de prodcutos y no realizar varias solicitudes
    const [productoSeleccionado,setProductoSeleccionado] = useState(''); //Estado usado unicamente para que cuando seleccione un valor
                                                                         //entre las sugerencias, no se vuelvan a mostrar las sugerencias

    ///USE EFFECT PARA CONTROLAR EL SETTIMEOUT DE PRODUCTO y REALIZAR BUSQUEDA DE PRODUCTO////
    useEffect(() => {
        if (buscarProducto) {
            clearTimeout(productoTimeOutRef.current);
            productoTimeOutRef.current = setTimeout(() => {
                obtenerSugerenciasProductos(buscarProducto, tipoBusquedaProducto);
            }, 300);
        } else {
            setProductoSugerencias([]);
        }

        return () => clearTimeout(productoTimeOutRef.current);
    }, [buscarProducto]);


    /////DEL PRODCUTO ENCONTRADO EXTRAIGO SU ID_PRODUCTO
    const seleccionarProducto = (producto) => {
        setValue("id_producto", producto.id_producto);
        setBuscarProducto('');
        setProductoSeleccionado(producto.producto);
        setProductoSugerencias([]);
    }


    ///// Ver el tipo de busqueda para producto
    const tipoBusquedaProducto = useWatch({ control, name: "tipo_busqueda_Producto" });

    ///////// REALIZA LA BUSQUEDA y OBTIENE SUGERENCIAS
    const obtenerSugerenciasProductos = async (termino, tipoBusquedaProducto) => {
        if (tipoBusquedaProducto) {

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/producto/buscar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ termino, tipoBusquedaProducto }),
                });
                const resultados = await response.json();
                setProductoSugerencias(resultados);
            } catch (error) {
                console.error("Error en la busqueda:", error);
            }
        }
    };


    ////////BUSQUEDA COINCIDENCIAS DE PROVEEDOR:


    ////////// ESTADOS PARA LA BUSQUEDA DE PROVEEDOR 
    const [proveedorSugerencias, setProveedorSugerencias] = useState([]); //array de sugerencias
    const [buscarProveedor, setBuscarProveedor] = useState('');//busca producto string
    const proveedorTimeOutRef = useRef(null);//para controlar el timeout de la busqueda de prodcutos y no realizar varias solicitudes
    const [proveedorSeleccionado,setProveedorSeleccionado] = useState(''); //Estado usado unicamente para que cuando seleccione un valor
    //entre las sugerencias, no se vuelvan a mostrar las sugerencias


    ///USE EFFECT PARA CONTROLAR EL SETTIMEOUT DE PROVEEDORES y REALIZAR BUSQUEDA DE PROVEEDOR////
    useEffect(() => {
        if (buscarProveedor) {
            clearTimeout(proveedorTimeOutRef.current);
            proveedorTimeOutRef.current = setTimeout(() => {
                obtenerSugerenciasProveedor(buscarProveedor, tipoBusquedaProveedor);
            }, 300);
        } else {
            setProveedorSugerencias([]);
        }

        return () => clearTimeout(proveedorTimeOutRef.current);
    }, [buscarProveedor]);


    /////DEL PROVEEDOR ENCONTRADO EXTRAIGO SU ID_PROVEEDOR

    const seleccionarProveedor = (proveedor) => {
        setValue("id_proveedor", proveedor.id_proveedor);
        setBuscarProveedor('');
        setProveedorSeleccionado(proveedor.nombre)
        setProveedorSugerencias([]);
    }

    ///// Ver el tipo de busqueda para proveedor
    const tipoBusquedaProveedor = useWatch({ control, name: "tipo_busqueda_Proveedor" });


    ///////// REALIZA LA BUSQUEDA y OBTIENE SUGERENCIAS
    const obtenerSugerenciasProveedor = async (termino, tipoBusquedaProveedor) => {
        if (tipoBusquedaProveedor) {

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/proveedor/buscar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ termino, tipoBusquedaProveedor }),
                });
                const resultados = await response.json();
                setProveedorSugerencias(resultados);
            } catch (error) {
                console.error("Error en la busqueda:", error);
            }
        }
    };




    /////////////////LAYOUT
    return (
        <>
            {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            <form onSubmit={handleSubmit(onSubmit)} className="__formulario_compra">
                <div className="__datos_compra">
                    <div className="__primera_columna">
                        <Tarjeta descripcion="Compra Nº" forid="compra">
                            <Input
                                tipo="text"
                                id="compra"
                                deshabilitado

                            />
                        </Tarjeta>
                        <Tarjeta descripcion="Producto" forid="producto" mensajeError={errors.producto?.message}>
                            <Input
                                tipo="search"
                                id="producto"
                                placeholder="Buscar"
                                value={productoSeleccionado? productoSeleccionado : buscarProducto}
                                onChange={(e) => setBuscarProducto(e.target.value)}

                            />
                            {productoSugerencias.length > 0 && (
                                <ul className="__sugerencias">
                                    {productoSugerencias.map((producto) => (
                                        <li key={producto.id_producto} onClick={() => seleccionarProducto(producto)}>
                                            {tipoBusquedaProducto === "Nombre" && producto.producto}
                                            {tipoBusquedaProducto === "Codigo" && producto.codigo}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Tarjeta>
                        <Tarjeta descripcion="Proveedor" forid="proveedor" mensajeError={errors.proveedor?.message} >
                            <Input
                                tipo="search"
                                id="proveedor"
                                placeholder="Buscar"
                                value={proveedorSeleccionado? proveedorSeleccionado : buscarProveedor}
                                onChange={(e) => setBuscarProveedor(e.target.value)}
                    

                            />
                            {proveedorSugerencias.length > 0 && (
                                <ul className="__sugerencias">
                                    {proveedorSugerencias.map((proveedor) => (
                                        <li key={proveedor.id_proveedor} onClick={() => seleccionarProveedor(proveedor)}>
                                            {tipoBusquedaProveedor === "Nombre" && proveedor.nombre}
                                            {tipoBusquedaProveedor === "Correo" && proveedor.correo}
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
                            > </Input>
                        </Tarjeta>
                    </div>
                    <div className="__segunda_columna">
                        <Tarjeta descripcion="Fecha" forid="fecha">
                            <Input
                                tipo="text"
                                id="fecha"

                                placeholder={new Date().toLocaleDateString('es-AR')}
                                deshabilitado

                            />
                        </Tarjeta>


                        <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]}
                        
                        
                            {...register("tipo_busqueda_Producto")}
                        />

                        <Selector opciones={[{ label: "Correo", value: "Correo" }, { label: "Nombre", value: "Nombre" }]}
                        
                        
                            {...register("tipo_busqueda_Proveedor")}
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
                    <NuevoProveedor onGuardar={manejaNuevoProveedor}></NuevoProveedor>
                </Modal>
            </div>
        </>

    )
}