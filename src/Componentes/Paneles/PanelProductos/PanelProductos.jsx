import Selector from '../../Selector/Selector';
import './PanelProductos.css';
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import Boton from '../../Boton/Boton';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';

export default function PanelProductos({ }) {


    return (
        <>
            <div className='__panel_productos'>
                <div className='__columna1'>
                    <div className='__col1'>
                        <Tarjeta descripcion="Categorias" forid="categorias">
                            <Selector opciones={["Cervezas", "Gaseosas", "Jugos", "Vinos"]} id="categorias" />
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
                <div className='__col1'>
                        <Tarjeta descripcion="Marcas" forid="marcas">
                            <Selector opciones={["Coca Cola", "Quilmes", "361", "Cafayate"]} id="marcas" />
                        </Tarjeta>
                    </div>
                    <div className='__col2'>
                       <BotonPerfil/>
                    </div>
                </div>
            </div>
        </>
    )
}