import Inicio from './Inicio/Inicio'
import React from 'react'

export { Inicio }


export const Compras = React.lazy(() => import('./Compras/Compras'))
export const Ventas = React.lazy(() => import('./Ventas/Ventas'))
export const Productos = React.lazy(() => import('./Productos/Productos'))
export const Promociones = React.lazy(() => import('./Promociones/Promociones'))
export const Vender = React.lazy(() => import('./Vender/Vender'))
export const InicioSesion = React.lazy(()=> import('./InicioSesion/InicioSesion'))

export const Perfil = React.lazy(()=> import('./Perfil/Perfil'))
export const Configuracion = React.lazy(()=> import('./Configuracion/Configuracion'))
export const Datos = React.lazy(()=> import ('./Datos/Datos'))

export const Categorias = React.lazy(()=> import('./Configuraciones/Categorias/Categorias'))
export const Marcas = React.lazy(()=> import('./Configuraciones/Marcas/Marcas'))
export const Proveedores = React.lazy(()=> import('./Configuraciones/Proveedores/Proveedores'))
export const Sucursales = React.lazy(()=> import('./Configuraciones/Sucursales/Sucursales'))
export const Usuarios = React.lazy(()=> import('./Configuraciones/Usuarios/Usuarios'))
export const Roles = React.lazy(()=> import('./Configuraciones/Roles/Roles'))