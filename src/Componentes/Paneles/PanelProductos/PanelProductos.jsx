import Selector from '../../Selector/Selector';
import './PanelProductos.css';
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PanelProductos({ }) {

    const[categorias,setCategorias] = useState([]);
    const[marcas,setMarcas] = useState([]);
    const navegarHacia = useNavigate();

    useEffect(()=>{
      fetch('http://127.0.0.1:8000/api/categoria')
      .then(respuesta=>respuesta.json())
      .then(datos => setCategorias(datos))
      .catch(e =>console.log(e));
    },[]);

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/marca')
        .then(respuesta=>respuesta.json())
        .then(datos => setMarcas(datos))
        .catch(e =>console.log(e));
      },[]);

   

    const clickPerfil = () =>{
       navegarHacia('/datosPerfil');
    }

    return (
        <>
            <div className='__panel_productos'>
                <div className='__columna1'>
                    <div className='__col1'>
                        <Tarjeta descripcion="Categorias" forid="categorias">
                            <Selector opciones={categorias.map(cat => ({label:cat.nombre_categoria, value: cat.id_categoria}))}
                             id="categorias" />
                        </Tarjeta>
                        <Tarjeta descripcion="Buscar Producto" forid="busqueda">
                        <Input tipo="search" placeholder="Buscar" id="busqueda" />
                        </Tarjeta>
                    </div>
                    <div className='__col2'>
                        <Tarjeta descripcion="Por Codigo o Nombre" forid="tipo_busqueda">
                            <Selector opciones={[{label:"Codigo",value:"1"},{label:"Nombre",value:"2"}]}
                             id="tipo_busqueda" />
                        </Tarjeta>
                    </div>
                </div>
                <div className='__columna2'>
                <div className='__col1'>
                        <Tarjeta descripcion="Marcas" forid="marcas">
                            <Selector opciones={marcas.map(marca => ({label:marca.nombre_marca, value: marca.id_marca}))} 
                             id="marcas" />
                        </Tarjeta>
                    </div>
                    <div className='__col2'>
                       <BotonPerfil onClick={clickPerfil}/>
                    </div>
                </div>
            </div>
        </>
    )
}