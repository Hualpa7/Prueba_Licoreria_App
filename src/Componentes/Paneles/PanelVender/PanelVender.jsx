import Selector from '../../Selector/Selector';
import './PanelVender.css'
import Input from "../../Input/Input";
import Tarjeta from '../../ComponentesFormulario/Tarjeta/Tarjeta';
import BotonPerfil from '../../BotonPerfil/BotonPerfil';
import { XyzTransition } from "@animxyz/react";
import { useState } from 'react';
import { useFuncionesPerfil } from '../../../hooks/useFuncionesPerfil';
import { useForm } from 'react-hook-form';

export default function PanelVender({control ,register,vendedor}) {

    /////////// NAVEGACION A PERFIL O CONFIGURACIONES y CERRAR SESION
    const [opcionesPerfil, setOpcionesPerfil] = useState(false);

    const clickPerfil = () => {
        setOpcionesPerfil(!opcionesPerfil);
    }

    const { irAPerfil, irAConfiguraciones, cerrarSesion } = useFuncionesPerfil(); //HOOK PARA NAVEGAR Y CERRAR SESION

   

    ///LAYOUT
    return (
        <>
            <div className='__panel_vender'>
                <form>
                    <div className='__columna1'>
                        <div className='__col1'>
                            <Tarjeta descripcion="Fecha" forid="fecha">
                                <Input tipo="text" placeholder="24/10/2024" id="fecha" deshabilitado />
                            </Tarjeta>
                            <Tarjeta descripcion="Vendedor" forid="vendedor">
                                <Input tipo="text" placeholder={vendedor} id="vendedor" 
                                deshabilitado 
                                />
                            </Tarjeta>
                        </div>
                        <div className='__col2'>
                            <Tarjeta descripcion="Metodo de Pago" forid="metodo_pago">
                                <Selector opciones={[{ label: "Efectivo", value: "Efectivo" }, { label: "Transferencia", value: "Transferencia" }]}
                                 id="metodo_pago" 
                                 opcionDefecto
                                 {...register("metodo_pago")}
                                 />
                            </Tarjeta>
                        </div>
                    </div>
                    <div className='__columna2'>
                        <div className='__col1'>
                            <Tarjeta descripcion="Venta Nº" forid="venta">
                                <Input tipo="text" placeholder="125-5457" id="venta" deshabilitado />
                            </Tarjeta>
                        </div>
                    </div>
                </form>
                <div className='__boton_perfil'>
                    <BotonPerfil onClick={clickPerfil} />
                    <XyzTransition
                        xyz="fade small-100% duration-3 origin-top"
                        appear
                    >
                        {opcionesPerfil && (
                            <ul className="__sugerencias">
                                <li onClick={irAPerfil}>Datos</li>
                                <li onClick={irAConfiguraciones}>Configuraciones</li>
                                <li onClick={cerrarSesion}>Cerrar Sesión</li>
                            </ul>
                        )}
                    </XyzTransition>
                </div>
            </div>

        </>

    )


}