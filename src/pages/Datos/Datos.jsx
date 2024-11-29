import React, { Suspense } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import BotonPerfil from '../../Componentes/BotonPerfil/BotonPerfil';
import PlantillaPages from '../../Componentes/PlantillaPages/PlantillaPages'
import './Datos.css';
import Boton from '../../Componentes/Boton/Boton';

export default function Datos() {

    /////////////NAVEGAR HACIA PERFIL   
    const navegarHacia = useNavigate();
    const clickVender = () => {
        navegarHacia('/vender');
    }


    const location = useLocation(); // Obtener la ruta actual para resaltar la pestaña activa

    const navItems = [
        { path: "/perfil", label: "Datos" },
        { path: "/perfil/configuraciones", label: "Configurar" },
    ];
    const urlImg = `url("${'https://http2.mlstatic.com/D_NQ_NP_884067-MLA53246821009_012023-O.webp'}")`;

    const header = <>
        <div className='__panel_perfil'>
            <div>
                <span className='__usuario_imagen' style={{ backgroundImage: urlImg }} ></span>
            </div>
            <div className='__boton_perfil'>
                <BotonPerfil></BotonPerfil>
                <BotonPerfil onClick={clickVender}></BotonPerfil>
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



    const main = 
    <div className='__cuerpo_datos'>
        <h1>Datos</h1>
        <ul className='__datos'>
            <li>Nombre: Gaston Hualpa</li>
            <li>Correo: hualpahualpa@gmail.com</li>
            <li>DNI: 40524760</li>
            <li><span>Cambiar contraseña?</span>
            <Boton descripcion="Cambiar" habilitado></Boton></li>
        </ul>
    </div>




    return <PlantillaPages header={header} navigation={navigation} main={main} />;
}