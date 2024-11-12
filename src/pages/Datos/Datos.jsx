import React, { Suspense } from 'react'
import { Routes, Route, Link,useLocation } from 'react-router-dom'
import BotonPerfil from '../../Componentes/BotonPerfil/BotonPerfil';
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import './Datos.css';

export default function Datos() {
    const location = useLocation(); // Obtener la ruta actual para resaltar la pestaña activa

    const navItems = [
        { path: "/perfil", label: "Datos" },
        { path: "/configuraciones/*", label: "Configurar" },
    ];
    const urlImg = `url("${'https://http2.mlstatic.com/D_NQ_NP_884067-MLA53246821009_012023-O.webp'}")`;

    const header = <>
        <div className='__panel_perfil'>
            <div>
                <span className='__usuario_imagen' style={{ backgroundImage: urlImg }} ></span>
            </div>
            <div className='__boton_perfil'>
                <BotonPerfil></BotonPerfil>
            </div>
        </div>
    </>

    const navigation = <>
        <ul className="__pestanias">
            {navItems.map((item) => (
                <li
                    key={item.path}
                    className={location.pathname === item.path ? "active disabled" : ""}
                >
                    <Link to={item.path}>{item.label}</Link>
                </li>
            ))}
        </ul>

        
    </>



    const main = <> <h1>Datos</h1>
    </>


    return <PlantillaPages header={header} navigation={navigation} main={main} />;
}