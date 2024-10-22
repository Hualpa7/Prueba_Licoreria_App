import Inicio from './Inicio/Inicio'
import React from 'react'

export { Inicio }

export const Compras = React.lazy(() => import('./Compras/Compras'))
export const Ventas = React.lazy(() => import('./Ventas/Ventas'))
export const Productos = React.lazy(() => import('./Productos/Productos'))
export const Promociones = React.lazy(() => import('./Promociones/Promociones'))
export const Vender = React.lazy(() => import('./Vender/Vender'))