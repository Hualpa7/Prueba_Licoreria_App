import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link,useLocation } from 'react-router-dom'
import routes from '../../routes.config'
import './Pestanias.css'


export default function Pestanias() {
  const location = useLocation(); // Obtener la ruta actual para resaltar la pestaña activa

  const navItems = [
    { path: "/vender", label: "Vender" },
    { path: "/productos", label: "Productos" },
    { path: "/promociones", label: "Promociones" },
    { path: "/ventas", label: "Ventas" },
    { path: "/compras", label: "Compras" }
  ];

  return (
    <>
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
      
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>

        {navItems.map((route, index) => (
            <Route key={index} path={route.path}  />
          ))}
          
        </Routes>
      </Suspense>
    </>
  );
}