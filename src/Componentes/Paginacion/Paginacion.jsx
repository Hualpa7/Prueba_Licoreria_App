import React from 'react';
import Boton from '../Boton/Boton';


import doble_derecha from '../../assets/flecha_doble_derecha.png';
import doble_izquierda from '../../assets/flecha_doble_izquierda.png';

import './Paginacion.css';

export default function Paginacion({ totalPaginas, paginaActual, onPaginaCambiar, onItemsPorPaginaCambiar, itemsPorPaginaOpcional, itemsPorPagina, totalElementos }) {

  const manejarPrimeraPagina = () => onPaginaCambiar(0);
  const manejarUltimaPagina = () => onPaginaCambiar(totalPaginas - 1);
  const manejarPaginaNumerada = (pagina) => onPaginaCambiar(pagina);

  // Calcular el rango de páginas a mostrar (siempre 3 páginas en total)
  let rangoInicio = Math.max(0, paginaActual - 1);
  let rangoFin = Math.min(totalPaginas - 1, paginaActual + 1);

  // Si estamos en las primeras páginas, ajustar el rango para que siempre muestre 3 botones
  if (paginaActual === 0) {
    rangoInicio = 0;
    rangoFin = Math.min(totalPaginas - 1, 2);
  }
  // Si estamos en las últimas páginas, ajustar el rango para mantener los 3 botones
  if (paginaActual === totalPaginas - 1) {
    rangoInicio = Math.max(0, totalPaginas - 3);
    rangoFin = totalPaginas - 1;
  }

  const paginasAMostrar = Array.from({ length: (rangoFin - rangoInicio + 1) }, (_, idx) => rangoInicio + idx);

  // Calcular cuántos elementos se muestran en la página actual
  const elementosMostrados =
    paginaActual === totalPaginas - 1
      ? totalElementos // En la última página se muestran todos los elementos restantes
      : itemsPorPagina * (paginaActual + 1);

  return (
    <div className="__paginacion">
      {/* Mostrar el total de elementos */}
      <div className="__info_total_elementos">
      {`Mostrando ${Math.min(elementosMostrados, totalElementos)} de ${totalElementos} elementos`}
      </div>

      <div className="__contenedor_botones">
        <Boton onClick={manejarPrimeraPagina} habilitado={paginaActual !== 0} disabled={paginaActual === 0} icono={doble_izquierda} />
         <div className='__botones_con_numeros'>

        {/* Botones numerados de las páginas (siempre 3 botones) */}
        {paginasAMostrar.map((pagina) => (
          <button
            key={pagina}
            onClick={() => manejarPaginaNumerada(pagina)}
            className={pagina === paginaActual ? 'boton_activo' : ''}
            disabled={pagina === paginaActual}
          >
            {pagina + 1}
          </button>
        ))}
         </div>
        <Boton onClick={manejarUltimaPagina} habilitado={paginaActual !== totalPaginas - 1} disabled={paginaActual === totalPaginas - 1} icono={doble_derecha} />
      </div>

      {itemsPorPaginaOpcional && (
        <div className="__selector_num_paginas">
          <label>Items por página</label>
          <select value={itemsPorPagina} onChange={(e) => onItemsPorPaginaCambiar(Number(e.target.value))}>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      )}
    </div>
  );
}
