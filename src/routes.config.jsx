import { Inicio, Compras, Ventas, Promociones, Vender, 
    Productos,InicioSesion,Perfil, Configuracion,
     Categorias,Marcas,Proveedores,Sucursales,Usuarios,Roles } from "./pages";

     import { Navigate } from "react-router-dom";




const routes = [
    {
        path: '/',
        element: <Inicio/>
    },
    {
        path: '/compras/*',
        element: <Compras/>
    },
    {
        path: '/ventas/*',
        element: <Ventas/>
    },
    {
        path: '/productos/*',
        element: <Productos/>
    },
    {
        path: '/promociones/*',
        element: <Promociones/>
    },
    {
        path: '/vender/*',
        element: <Vender/>
    },
    {
        path: '/inicioSesion',
        element: <InicioSesion/>
    },
    {
        path: '/datosPerfil/*',
        element: <Perfil/>
    },
    {
        path: '/configuraciones/*',
        element: <Configuracion/>,
        children: [
            { path: '', element: <Navigate to="categorias" replace /> }, // Redirección a "categorias"
            { path: 'categorias', element: <Categorias /> },
            { path: 'marcas', element: <Marcas /> },
            { path: 'proveedores', element: <Proveedores /> },
            { path: 'sucursales', element: <Sucursales /> },
            { path: 'usuarios', element: <Usuarios /> },
            { path: 'roles', element: <Roles /> }
        ]
    },

    {
        path: '*',
        element: <Inicio/>
    }
]

export default routes;