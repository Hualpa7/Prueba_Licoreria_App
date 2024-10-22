import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import React, { Suspense } from 'react'
import routes from './routes.config'
import Pestanias from './Componentes/Pestanias/Pestanias'
import Productos from './pages/Productos/Productos'


export default function App() {
  return (
    <>
    <BrowserRouter>
    <Pestanias/>
    
    </BrowserRouter>
    </>
  )
}

