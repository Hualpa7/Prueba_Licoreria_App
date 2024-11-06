import Tabla from '../Tabla/Tabla';
import Paginacion from '../Paginacion/Paginacion';
import { useState, useMemo } from 'react'; //useMemoo para ordenar

export default function TablaConPaginacion({
  columnas,
  datos,
  itemsPorPagina,
  itemsPorPaginaOpcional,
  onElementoSeleccionado,
  seleccionable = true,
}) {
  const [paginaActual, setPaginaActual] = useState(0);
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const [itemsPorPaginaSeleccionado, setItemsPorPaginaSeleccionado] = useState(itemsPorPagina);
  
  // Estado para la ordenación
  const [columnaOrden, setColumnaOrden] = useState(null); //Indica la eleccion de la columna por la cual se desea ordenar
  const [ordenAscendente, setOrdenAscendente] = useState(true);  // true para ascendente, false para descendente

  const totalPaginas = Math.ceil(datos.length / itemsPorPaginaSeleccionado);

  // Manejador de selección
  const manejarSeleccion = (elemento) => {
    setElementoSeleccionado(elemento);
    if (seleccionable && typeof onElementoSeleccionado === 'function') {
      onElementoSeleccionado(elemento);
    }
  };

  // Manejador para cambiar el orden
  const manejarOrden = (columna) => {
    if (columna === columnaOrden) {
      // Si ya está ordenando por esta columna, alternar el orden
      setOrdenAscendente(!ordenAscendente);
    } else {
      // Si es una nueva columna, ordenar por esta de forma ascendente
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  // Ordenar los datos
  const datosOrdenados = useMemo(() => {
    if (!columnaOrden) return datos;  // Si no hay columna seleccionada, no ordenar
    
    return [...datos].sort((a, b) => {
      const valorA = a[columnaOrden];
      const valorB = b[columnaOrden];

      if (typeof valorA === 'string') {
        return ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
      } else {
        return ordenAscendente ? valorA - valorB : valorB - valorA;
      }
    });
  }, [columnaOrden, ordenAscendente, datos]);

  // Datos paginados y ordenados
  const datosPaginados = datosOrdenados.slice(
    paginaActual * itemsPorPaginaSeleccionado,
    (paginaActual + 1) * itemsPorPaginaSeleccionado
  );

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
        onSeleccionar={seleccionable ? manejarSeleccion : undefined}
        onOrdenar={manejarOrden}  // Pasar la función para ordenar
        columnaOrden={columnaOrden}  // Columna actual de ordenación
        ordenAscendente={ordenAscendente}  // Orden actual
      />
      <Paginacion
        totalPaginas={totalPaginas}
        paginaActual={paginaActual}
        onPaginaCambiar={cambiarPagina}
        itemsPorPaginaOpcional={itemsPorPaginaOpcional}
        itemsPorPagina={itemsPorPaginaSeleccionado}
        onItemsPorPaginaCambiar={cambiarItemsPorPagina}
        totalElementos={datos.length}
      />
      
    </div>
  );
}
