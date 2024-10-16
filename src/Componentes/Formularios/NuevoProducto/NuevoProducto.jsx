import { useForm } from "react-hook-form"
import Input from "../../Input/Input";
import Selector from "../../Selector/Selector";
import Tarjeta from "../../ComponentesFormulario/Tarjeta/Tarjeta";
import Boton from "../../Boton/Boton";
import './NuevoProducto.css';
import MensajeErrorForm from "../../ComponentesFormulario/MensajeErrorForm/MensajeErrorForm";
export default function NuevoProducto({ autocompletar }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form
            fecha: new Date().toLocaleDateString('es-AR')
        }
    });


    /*
        const manejarSubmit = (e) => { //Evita mandar la accion predeterminada de enviar el formulario y que se recargue la pagina
            e.preventDefault();
    
            // Obtengo los valores de los inputs  a traves de us ID
            const producto = {
                codigo: e.target.codigo.value,
                fecha: e.target.fecha.value,
                articulo: e.target.articulo.value,
                categoria: e.target.categoria.value,
                marca: e.target.marca.value,
                stock: e.target.stock.value,
                costo: e.target.costo.value,
    
            };
    
    
            console.log(producto);  // muestro en consola si los datos corresponden
        };*/

    return (
        <form onSubmit={handleSubmit((data) => {
            reset();
            console.log(data);
        })}>
            <div className="__cuerpo_nuevo_producto">
                <div className="__columna_1">
                    <Tarjeta descripcion="Codigo" forid="codigo"  mensajeError={errors.codigo?.message}>
                        <Input
                            tipo="text"
                            id="codigo"
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
                    <Tarjeta descripcion="Stock" forid="stock" mensajeError={errors.stock?.message}>
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
                <div className="__columna_2">
                    <Tarjeta descripcion="Fecha" forid="fecha">
                        <Input
                            tipo="text"
                            id="fecha"
                            deshabilitado
                            {...register("fecha")}
                        > </Input>
                    </Tarjeta>

                    <Tarjeta descripcion="Categoria" forid="categoria">
                        <Selector opciones={["Gaseosa", "Cerveza", "Vino"]} id="categoria"
                            {...register("categoria")}>
                        </Selector>
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
                <div className="__columna_3">

                    <Tarjeta descripcion="Marca" forid="marca">
                        <Selector opciones={["Pepsi", "Quilmes", "Coca-Cola"]} id="marca"
                            {...register("marca")}
                        >
                        </Selector>
                    </Tarjeta>


                </div>
            </div>
            <div className="__formulario_boton">
                <Boton descripcion='Agregar' habilitado submit></Boton>
            </div>
        </form>
    )
} 