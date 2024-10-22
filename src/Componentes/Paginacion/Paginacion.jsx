import React from 'react';
import Boton from '../Boton/Boton';

import derecha from '../../assets/flecha_derecha.png';
import doble_derecha from '../../assets/flecha_doble_derecha.png';
import izquierda from '../../assets/flecha_izquierda.png';
import doble_izquierda from '../../assets/flecha_doble_izquierda.png';

import './Paginacion.css'

export default function Paginacion({ totalPaginas, paginaActual, onPaginaCambiar, onItemsPorPaginaCambiar, itemsPorPaginaOpcional, itemsPorPagina }) {
  //totalPaginas: numero total de paginas que hay
  //paginaActual: indice de la pagina actual
  //onPaginaCambiar: funcion que me va a permitir cambiar de paginas
  // onItemsPorPaginaCambiar: funcion que me permite cambiar el numero de elementos por pagina
  //itemsPorPaginaOpcional: propiedad que me permite habilitar o deshabilitar la opcion para seleccionar el numero de paginas
  //itemsPorPagina: numero de elemenos que se muestra por pagina



  const manejarPrimeraPagina = () => onPaginaCambiar(0); //funcion que me manda a la primera pagina
  const manejarUltimaPagina = () => onPaginaCambiar(totalPaginas - 1); //funcion que me manda a la ultima pagina
  const manejarAnteriorPagina = () => onPaginaCambiar(Math.max(0, paginaActual - 1));//funcion para ir  ala pagina anterior, condiciondo para no irse mas alla de la pagina 1
  const manejarSiguientePagina = () => onPaginaCambiar(Math.min(totalPaginas - 1, paginaActual + 1));//idem pero pagina siguiente, tambien condicionada


  return (
    <div className="__paginacion">

      {/* Mostrar la página actual y el total de páginas */}
      <span>{`Página ${paginaActual + 1} de ${totalPaginas}`}</span> {/* Se suma 1 a paginaActual ya que comienza en 0 */}

      <Boton onClick={manejarPrimeraPagina} habilitado={paginaActual !== 0} disabled={paginaActual === 0} icono={doble_izquierda}></Boton>
      <Boton onClick={manejarAnteriorPagina} habilitado={paginaActual !== 0} disabled={paginaActual === 0} icono={izquierda}></Boton>
      {itemsPorPaginaOpcional && (//si itemsPorPaginaOpcional es verdadero, entonces aparece  un selector de numero de elementos por pagina
        <div className='__selector_num_paginas' >
          <label>Items por página</label>
          <select value={itemsPorPagina} onChange={(e) => onItemsPorPaginaCambiar(Number(e.target.value))}//itemsPorPagina es el valor actual de items por pagina
          //Cuando se cambia la seleccion, se llama a una funcion pasandole como valor
          //el nuevo convertido a Number
          > <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>


      )}


      <Boton onClick={manejarSiguientePagina} habilitado={paginaActual !== totalPaginas - 1} disabled={paginaActual === totalPaginas - 1} icono={derecha} ></Boton>
      <Boton onClick={manejarUltimaPagina} habilitado={paginaActual !== totalPaginas - 1} disabled={paginaActual === totalPaginas - 1} icono={doble_derecha}></Boton>
    </div>
  );
};