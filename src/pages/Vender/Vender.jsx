import Pestanias from "../../Componentes/Pestanias/Pestanias";
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import Boton from '../../Componentes/Boton/Boton'
import PanelVender from '../../Componentes/Paneles/PanelVender/PanelVender'
import { useEffect, useState } from "react";
import AgregarProducto from "../../Componentes/Formularios/AgregarProducto/AgregarProducto";
import Modal from "../../Componentes/Modal/Modal";
import TablaConPaginacion from "../../Componentes/TablaConPaginacion/TablaConPaginacion";
import columnas from "../../Datos_Pruebas/Columnas_Vender.json"
import agregar_carrito from '../../assets/agregar_carrito.png'
import quitar_carrito from '../../assets/quitar_carrito.png'
import './Vender.css'
import { useForm, useWatch } from "react-hook-form";
import Tarjeta from "../../Componentes/ComponentesFormulario/Tarjeta/Tarjeta";
import Input from "../../Componentes/Input/Input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export default function Vender({ }) {

  const token = localStorage.getItem("authToken");
  const navegarHacia = useNavigate();
  
  if (!token) {
    alert("No puede acceder. Inicie Sesion.")
    navegarHacia('/inicioSesion');
  }
  
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario);
    
  //MANTIENE ARRAY DE PRODUCTOS Y SU MANEJO
  const [productos, setProductos] = useState([]);


  //CAPTURO EL PRODCUTO Y CON SU ID, LO BUSCO EN EL BACCKEND PARA RECUPERAR LOS DEMAS DATOS
  const manejarAgregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/api/producto/${producto.id_producto}`);
      const datosDelBackend = await respuesta.json();

      //combino los datos del backend con los del prodcuto (iva,cantidad)
      const productoCompleto = {
        ...producto,
        ...datosDelBackend
      };

      const datosTransformados = {
        id_producto: productoCompleto.id_producto,
        Codigo: productoCompleto.codigo,
        Nombre: productoCompleto.Nombre,
        Cantidad: productoCompleto.cantidad,
        Subtotal: `$ ${(parseFloat(productoCompleto.costo.replace(',', '.')) * productoCompleto.cantidad).toFixed(2).replace('.', ',')}`,
        IVA: productoCompleto.IVA,
        Descuento: `${productoCompleto.descuento === null ? "0" : productoCompleto.descuento.porcentaje} %`,
        Neto: `$ ${(
          parseFloat(productoCompleto.costo.replace(',', '.')) *
          (1 + productoCompleto.IVA / 100) * // Agrega el IVA
          (1 - (productoCompleto.descuento === null ? 0 : productoCompleto.descuento.porcentaje / 100)) * // Aplica el descuento 
          productoCompleto.cantidad).toFixed(2).replace('.', ',')}`
      }

      setProductos([...productos, datosTransformados])
    } catch (error) {
      console.error("Error al obtener datos del backend:", error);
    }


  };

  //CONTROLA MODAL DE AGREGAR NUEVO PRODUCTO
  const [modalAgregarProducto, setModalAgregarProducto] = useState(false);

  const manejaModalAgregarProducto = () => {
    setModalAgregarProducto(!modalAgregarProducto);
  }

  //HOOK FORM
  const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm({
    defaultValues: {
      id_sucursal: usuario.id_sucursal,
      id_usuario: usuario.id_usuario,
      descuento_gral: 0,
      metodo_pago: "Efectivo"
    }
  })

 




  //USE WATCH PARA VER EL CONTENIDO EN TIEMPO REAL DEL FORMULARIO
  const datosFormulario = useWatch({ control });

  //USAMOS USEEFFECT PARA VER EN TIEMPO REAL Y RECALCULAR EL TOTAL CADA VEZ QUE SE AGREGUE/QUITE UN PRODUCTO Y 
  //CAUNDO SE ACTUALICE EL CAMPO DESCUENTO_GRAL

  useEffect(() => {
    const descuento = datosFormulario.descuento_gral / 100;

    // Sumar el neto de los productos, validando el formato de "Neto"
    const totalNeto = productos.reduce((acumulador, producto) => {
      const netoSinFormato = producto.Neto?.replace('$', '').replace(',', '.'); // Elimina el símbolo "$" y cambia "," por "."
      const neto = parseFloat(netoSinFormato);
      return !isNaN(neto) ? acumulador + neto : acumulador; // Sumar solo si es un número válido
    }, 0);

    const totalConDescuento = totalNeto * (1 - descuento);


    setValue("total_con_descuento", totalConDescuento.toFixed(2).replace('.', ','));
    setValue("total", totalNeto.toFixed(2).replace('.', ','));
  }, [productos, datosFormulario.descuento_gral, setValue]);


  //CREA LA NUEVA VENTA EN EL REGISTRO

  const onSubmit = async (data) => {
    setCargando(true);
    try {
      const datosConProductos = {
        ...data, // Datos del formulario
        productos, // Array de productos
      };
      datosConProductos.total = datosConProductos.total.replace(',', '.');
      const respuesta = await fetch('http://127.0.0.1:8000/api/venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(datosConProductos),
      });

      if (!respuesta.ok) {
        console.error('Error al realizar la venta');
        toast.error("Error al realizar la venta.", { className: "__toaster_error" });
        return;
      }
      toast.success("Venta realizada!.", { className: "__toaster_success" });
      reset();
      setProductos([]);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      toast.error("Error inesperado al realizar la venta.", { className: "__toaster_error" });
    } finally {
      setCargando(false);
    }
  }

  //SELECCION DE ELEMENTO
  const [seleccionado, setSeleccionado] = useState(null);

  const manejarSeleccion = (elemento) => {
    setSeleccionado(elemento);
  }


  //QUITA PRODUCTO DEL CARRITO
  const quitarProducto = () => {
    if (seleccionado) {
      const arrayProductos = productos.filter(producto => producto.id_producto !== seleccionado.id_producto);
      setProductos(arrayProductos);
      setSeleccionado(null);
    }
  }


  /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
  const [cargando, setCargando] = useState(false);




  //LAYOUT
  const header = <PanelVender control={control} register={register} vendedor={usuario.nombre}></PanelVender>
  const navigation = <Pestanias></Pestanias>
  const main = <div className="__cuerpo_vender">
    {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
    <div className="__tabla_vender">
      <TablaConPaginacion
        columnas={columnas}
        datos={productos}
        itemsPorPagina={6}
        onElementoSeleccionado={manejarSeleccion}
      ></TablaConPaginacion>
    </div>
    <div className="__agregar_quitar">
      <Boton icono={agregar_carrito} habilitado onClick={manejaModalAgregarProducto}></Boton>
      <div className="__quitar">

        <Boton icono={quitar_carrito} habilitado={seleccionado} onClick={quitarProducto}></Boton>
      </div>
    </div>
  </div>


  const footer =


    <div className="__footer_vender">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", marginLeft: "50px", gap: "50px",color:"white" }}>
          <Tarjeta descripcion="Descuento General" forid="descuento_gral" mensajeError={errors.descuento_gral?.message}>
            <Input
              tipo="porcentaje"
              id="descuento_gral"

              {...register("descuento_gral", {
                required: {
                  value: true,
                  message: "Ingrese porcentaje del descuento"
                },
                validate: (value) => {
                  if (value >= 0 && value <= 100) return true;
                  else return "Ingrese un porcentaje entre '0%' y '100%' ";
                },
              })}
            >
            </Input>
          </Tarjeta>
          <Tarjeta descripcion="Total sin Descuento" forid="total">
            <Input
              tipo="costo"
              id="total"

              {...register("total")}
            >
            </Input>
          </Tarjeta>

        </div>
        <div style={{ display: "flex", marginRight: "50px", gap: "50px",color:"white" }}>
          <Tarjeta descripcion="TOTAL" forid="total_con_descuento">
            <Input
              tipo="costo"
              id="total_con_descuento"

              {...register("total_con_descuento")}
            >
            </Input>
          </Tarjeta>
          <Boton descripcion="VENDER" habilitado submit ></Boton>
        </div>


      </form>


      <Modal visible={modalAgregarProducto} titulo="Agregar al Carrito" anchura="600px" funcion={manejaModalAgregarProducto}>
        <AgregarProducto onGuardar={manejaModalAgregarProducto} onAgregarProducto={manejarAgregarProducto}></AgregarProducto>
      </Modal>
    </div>

  return <PlantillaPages header={header} navigation={navigation} main={main} footer={footer} />;
}