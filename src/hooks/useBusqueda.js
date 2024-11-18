import { useState, useEffect, useRef } from 'react';

export const useBusqueda = (endpoint, tipoBusqueda,setValue) => {
  const [sugerencias, setSugerencias] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [seleccionado, setSeleccionado] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (terminoBusqueda) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        buscarSugerencias(terminoBusqueda, tipoBusqueda);
      }, 300);
    } else {
      setSugerencias([]);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [terminoBusqueda, tipoBusqueda]);

  const buscarSugerencias = async (termino, tipo) => {
    if (!tipo) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/api/${endpoint}/buscar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          termino: termino, 
          [`tipoBusqueda${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`]: tipo 
        }),
      });
      const resultados = await respuesta.json();
      setSugerencias(resultados);
    } catch (error) {
      console.error(`Error en la búsqueda de ${endpoint}:`, error);
    }
  };

  const manejarSeleccion = (item) => {
    if (setValue) {
      setValue(`id_${endpoint}`, item ? item[`id_${endpoint}`] : '');
    }
    setTerminoBusqueda(item ? '' : terminoBusqueda);
    setSeleccionado(item ? (endpoint === 'producto' ? item.producto : item.nombre) : '');
    setSugerencias([]);
  };

  return {
    sugerencias,
    terminoBusqueda,
    setTerminoBusqueda,
    seleccionado,
    manejarSeleccion,
  };
};