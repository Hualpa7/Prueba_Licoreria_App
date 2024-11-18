import { Inicio, Compras, Ventas, Promociones, Vender, 
    Productos,InicioSesion, Configuracion,
     Categorias,Marcas,Proveedores,Sucursales,Usuarios,Roles,Datos } from "../";

     import { Navigate } from "react-router-dom";
     import React, { Suspense } from 'react';
     import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';


     const navItems = [
        {
            path: '',
            element: <Datos />
        },
        {
            path: 'configuraciones/*',
            element: <Configuracion />,
            children: [
                { path: '', element: <Marcas /> },
                { path: 'categorias', element: <Categorias /> },
                { path: 'marcas', element: <Marcas /> },
                { path: 'proveedores', element: <Proveedores /> },
                { path: 'sucursales', element: <Sucursales /> },
                { path: 'usuarios', element: <Usuarios /> },
                { path: 'roles', element: <Roles /> }
            ]
        }
    ];

export default function Perfil() {
    return <div>
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>

                {navItems.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} >
                        {route.children?.map((chil, i) => (
                            <Route key={i} path={chil.path} element={chil.element} >
                            </Route>
                        ))}

                    </Route>
                ))}

            </Routes>
        </Suspense>
        <Outlet/>
    </div>
}