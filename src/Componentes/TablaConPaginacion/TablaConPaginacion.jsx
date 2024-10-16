import Tabla from '../Tabla/Tabla';
import Paginacion from '../Paginacion/Paginacion';
import  { useState } from 'react';

export default function TablaConPaginacion ({ columnas, datos, itemsPorPagina,itemsPorPaginaOpcional }) {
  const [paginaActual, setPaginaActual] = useState(0);
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const [itemsPorPaginaSeleccionado, setItemsPorPaginaSeleccionado] = useState(itemsPorPagina);

  

  const totalPaginas = Math.ceil(datos.length / itemsPorPaginaSeleccionado);
  const datosPaginados = datos.slice(
    paginaActual * itemsPorPaginaSeleccionado,
    (paginaActual + 1) * itemsPorPaginaSeleccionado
  );

  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
  };

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    setElementoSeleccionado(null); // Limpiar la selección al cambiar de página
  };
  const cambiarItemsPorPagina = (nuevosItems) => {
    setItemsPorPaginaSeleccionado(nuevosItems);
    setPaginaActual(0); // Reiniciar a la primera página al cambiar los items por página
  };

  return (
    <div>
      <Tabla
        columnas={columnas}
        datos={datosPaginados}
        onSeleccionar={manejarSeleccion}
      />
      <Paginacion
        totalPaginas={totalPaginas}
        paginaActual={paginaActual}
        onPaginaCambiar={cambiarPagina}
        itemsPorPaginaOpcional={itemsPorPaginaOpcional}
        itemsPorPagina={itemsPorPaginaSeleccionado}
        onItemsPorPaginaCambiar={cambiarItemsPorPagina}
      />


      {elementoSeleccionado && console.log('Elemento seleccionado:', elementoSeleccionado)};
    </div>
  );
};