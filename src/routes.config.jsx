import { Inicio, Compras, Ventas, Promociones, Vender, Productos } from "./pages";



const routes = [
    {
        path: '/',
        element: <Inicio/>
    },
    {
        path: '/compras',
        element: <Compras/>
    },
    {
        path: '/ventas',
        element: <Ventas/>
    },
    {
        path: '/productos',
        element: <Productos/>
    },
    {
        path: '/promociones',
        element: <Promociones/>
    },
    {
        path: '/vender',
        element: <Vender/>
    },
    {
        path: '*',
        element: <Inicio/>
    }
]

export default routes;