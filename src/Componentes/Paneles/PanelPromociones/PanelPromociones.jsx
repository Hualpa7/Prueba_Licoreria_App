import Selector from '../../Selector/Selector';
import './PanelPromociones.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Boton from '../../Boton/Boton';
import { useState } from 'react'
import BotonPerfil from '../../BotonPerfil/BotonPerfil';

export default function PanelPromociones({onTipoOferta }) {
    const [oferta, setOferta] =useState('Combo');

    const manejaCambioOferta = (e) => {
        setOferta(e.target.value);
        onTipoOferta(e.target.value); //para pasarlo al padre promociones.jsx
    }


    return (
        <>
            <div className='__panel_promociones'>
                <div className='__columna1'>
                    <div className='__col1'>
                        <Tarjeta descripcion="Oferta" forid="oferta">
                            <Selector opciones={["Combo", "Descuento"]} id="oferta" onChange = {manejaCambioOferta} value={oferta}/>
                        </Tarjeta>
                        <Tarjeta descripcion="Buscar Producto">
                        <Input tipo="search" placeholder="Buscar" id="busqueda" />
                        </Tarjeta>
                    </div>
                    <div className='__col2'>
                        <Tarjeta descripcion="Por Codigo o Nombre" forid="busqueda">
                            <Selector opciones={["Codigo", "Nombre"]} id="busqueda" />
                        </Tarjeta>
                    </div>
                </div>
                <div className='__columna2'>
                    <div className='__col2'>
                       <BotonPerfil></BotonPerfil>
                    </div>
                </div>
            </div>
        </>
    )
}