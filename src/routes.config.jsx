import { Inicio, Compras, Ventas, Promociones, Vender, 
    Productos,InicioSesion,Perfil, Configuracion,
     Categorias,Marcas,Proveedores,Sucursales,Usuarios,Roles,Datos } from "./pages";

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
        path: 'perfil/*',
        element: <Perfil/>
    },
    
    {
        path: '*',
        element: <Inicio/>
    }
]

export default routes;