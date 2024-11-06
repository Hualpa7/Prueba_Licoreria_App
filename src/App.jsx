import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import './App.css'
import React, { Suspense } from 'react'
import routes from './routes.config'
import Pestanias from './Componentes/Pestanias/Pestanias'
import Productos from './pages/Productos/Productos'
import { Inicio } from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='__cargando'></div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

