import Selector from '../../Selector/Selector';
import './PanelPromociones.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import { useState } from 'react'
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { useNavigate } from 'react-router-dom';

export default function PanelPromociones({ onTipoOferta }) {

    const [oferta, setOferta] = useState('Combo');
    const navegarHacia = useNavigate();

    const clickPerfil = () => {
        navegarHacia('/datosPerfil');
    }


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
                            <Selector opciones={[{ label: "Combo", value: "Combo" }, { label: "Descuento", value: "Descuento" }]}
                                id="oferta" onChange={manejaCambioOferta} value={oferta} />
                        </Tarjeta>
                        <Tarjeta descripcion="Buscar Producto" forid="busqueda">
                            <Input tipo="search" placeholder="Buscar" id="busqueda" />
                        </Tarjeta>
                    </div>
                    <div className='__col2'>
                        <Tarjeta descripcion="Por Codigo o Nombre" forid="tipo_busqueda">
                            <Selector opciones={[{ label: "Codigo", value: "Codigo" }, { label: "Nombre", value: "Nombre" }]}
                                id="tipo_busqueda" />
                        </Tarjeta>
                    </div>
                </div>
                <div className='__columna2'>
                    <div className='__col2'>
                        <BotonPerfil onClick={clickPerfil}></BotonPerfil>
                    </div>
                </div>
            </div>
        </>
    )
}