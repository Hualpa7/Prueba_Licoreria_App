import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link,useLocation } from 'react-router-dom'
import routes from '../../routes.config'
import './PestaniasConfiguraciones.css'



export default function PestaniasConfiguraciones() {
    const location = useLocation(); // Obtener la ruta actual para resaltar la pestaña activa
  
    const navItems = [
      { path: "marcas", label: "Marcas" },
      { path: "categorias", label: "Categorias" },
      { path: "proveedores", label: "Proveedores" },
      { path: "sucursales", label: "Sucursales" },
      { path: "usuarios", label: "Usuarios" },
      { path: "roles", label: "Roles" },
    ];
  
    return (
      <>
        <ul className="__pestanias_configuraciones">
          {navItems.map((item) => (
            <li 
              key={item.path} 
              className={location.pathname === `/configuraciones/${item.path}` ? "active disabled" : ""}
            >
              <Link to={`/configuraciones/${item.path}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        
      </>
    );
  }