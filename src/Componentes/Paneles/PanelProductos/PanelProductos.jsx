import Selector from '../../Selector/Selector';
import './PanelProductos.css';
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState} from 'react';

export default function PanelProductos({ categorias, marcas, onDatosFiltrados, onManejaCargando }) {

    /////////// NAVEGACION A PERFIL
    const navegarHacia = useNavigate();
    const clickPerfil = () => {
        navegarHacia('/perfil');
    }

    


    ///////// HOOK FORM

    const { register, control} = useForm();

    /////////CAPTURAR LOS VALORES DEL FORMULARIO DINAMICAMENTE
    const filtro = useWatch({control}); //Con useWatch observamos en tiempo real los cambios de los comp. registrados
                                          //y objeto control de useForm me deja observar en tiempo real los datos al no tener un submit
                                         //de esta manera filtro contiene json con datos en tiempo real

    /////// SE HACE LA SOLICITUD PARA OBTENER LOS DATOS FILTRADOS. Se la asigna a una const ya que debe llamarse constantemente

    
    const obtenerDatosFiltrados = async (data) => { //funcion que hace la consulta dependiendo los filtros
        onManejaCargando(true); //Inicia la carga
      
        try {
           
            const respuestaProducto = await fetch('http://127.0.0.1:8000/api/producto/filtro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(respuestaProducto);
                const datos = await respuestaProducto.json();
                    const datosTransformados = datos.map(item => ({
                        Codigo: item.codigo,
                        Nombre: item.producto,
                        Stock: item.stock,
                        Costo: `$ ${item.costo}`,
                        Modificacion: new Date(item.fecha_modificacion).toLocaleDateString(),
                        Descuento: `${item.id_descuento || 0} %`,
                        Cantidad_minima: item.alerta_minima,
                        Categoria: item.id_categoria,
                        Marca: item.id_marca,
                        id_producto: item.id_producto
                    }));
                    onDatosFiltrados(datosTransformados);
             
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally{ //Se ejecuta siemppre, haya logrado o fallado
            onManejaCargando(false);//Termina la carga
        }
    };


    //se usa este hook para cuando ejecutar funciones asincronas. En este caso se ejecuta obtenerDatosfilrados con los filtros
    //que se recibe, cuando se cambia algun calor de la dependencia.

     const timeOutBusquedaRef = useRef(null);//Se usa useRef para guardar una referencia al setTimeOut activo, esto para
                                             //poder modificarlo, sin que se tenga que renderiar nuevamente  siempre el timeOut

    useEffect(() => {
        if(filtro?.busqueda){ //si solo se modifico el INPUT de busqueda hacermos esto
            clearTimeout(timeOutBusquedaRef.current);//Limpiamos el valor actual de la referencia,esto para no acumluarlos y q se ejecute solo el ultimo timeout
            timeOutBusquedaRef.current = setTimeout(() => { // asignamos el valor a la constante,  esto para que se cancele el timeOut
                obtenerDatosFiltrados(filtro);       //anterior, sino realizara una consulta acumuladas
            }, 2000);
        }
        else{
            obtenerDatosFiltrados(filtro);
        }

        return () => clearTimeout(timeOutBusquedaRef.current); //limpiamos  el vlaor de la const, esto para que no se haga la llamada si se desmonta el 
                                                               //componente
    },[filtro]) //este array final son las dependendencias. Cada vez que cambie filtro, se ejecuta el efecto, es [] vacio se ejecuta una sola vez


    


    //////////////LAYOUT

    return (
        <>
        
            <form >
                <div className='__panel_productos'>
                    <div className='__columna1'>
                        <div className='__col1'>
                            <Tarjeta descripcion="Categorias" forid="categorias">
                                <Selector opciones={categorias.map(cat => ({ label: cat.nombre_categoria, value: cat.id_categoria }))}
                                    id="categorias" 
                                    opcionNula="Todas"
                                    {...register("id_categoria")}
                                    />
                                
                            </Tarjeta>
                            <Tarjeta descripcion="Buscar Producto" forid="busqueda">
                                <Input tipo="search" placeholder="Buscar" id="busqueda"
                                    {...register("busqueda")}
                                />
                            </Tarjeta>
                        </div>
                        <div className='__col2'>
                            <Tarjeta descripcion="Por Codigo o Nombre" forid="tipo_busqueda">
                                <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]}
                                    id="tipo_busqueda" 
                                {...register("tipo")}
                                />
                            </Tarjeta>
                        </div>
                    </div>
                    <div className='__columna2'>
                        <div className='__col1'>
                            <Tarjeta descripcion="Marcas" forid="marcas">
                                <Selector opciones={marcas.map(marca => ({ label: marca.nombre_marca, value: marca.id_marca }))}
                                    id="marcas" 
                                    opcionNula="Todas"
                                {...register("id_marca")}
                                />
                            </Tarjeta>
                        </div>
                        <div className='__col2'>
                            <BotonPerfil onClick={clickPerfil} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}