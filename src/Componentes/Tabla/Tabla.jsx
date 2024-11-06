import { useState } from 'react';
import './Tabla.css';

export default function Tabla({ columnas, datos, onSeleccionar, onOrdenar, columnaOrden, ordenAscendente }) {
  const [seleccionado, setSeleccionado] = useState(null);

  const manejarSeleccion = (elemento) => {
    const nuevoSeleccionado = JSON.stringify(elemento) === JSON.stringify(seleccionado) ? null : elemento;
    setSeleccionado(nuevoSeleccionado);
    if (onSeleccionar) onSeleccionar(nuevoSeleccionado);
  };

   // Función para determinar la clase de color según el stock
   const obtenerClaseStock = (stock, minimo) => {
    if (stock < minimo) return '__bajo_stock_rojo'; // Menor a 10, rojo
    if (stock < (minimo + 20)) return '__bajo_stock_naranja'; // Menor a 20, naranja
    return ''; // Sin clase especial si el stock es mayor o igual a 20
  };


  return (
    <div className="__tabla_contenedor">
      <table>
        <thead className="__cabecera">
          <tr>
            {columnas.map((columna, indice) => (
              <th key={indice} onClick={() => onOrdenar(columna)}>  {/* Agregar manejador de clic en el encabezado */}
                {columna}
                {columnaOrden === columna && (
                  <span>
                    {ordenAscendente ? ' 🔼' : ' 🔽'}  {/* Mostrar la dirección del orden */}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="__cuerpo">
          {datos.map((elemento, indice) => (
            <tr
              key={indice}
              className={`${JSON.stringify(seleccionado) === JSON.stringify(elemento) ? '__seleccionado' : ''} ${obtenerClaseStock(elemento.Stock, elemento.Cantidad_minima)}`} // Aplicar clases según la selección y el stock
     
              onClick={() => manejarSeleccion(elemento)}
            >
              {columnas.map((columna, i) => {
                const valor = elemento[columna];
                return (
                  <td key={i}>
                    {Array.isArray(valor)
                      ? valor.map(item => `${item.Bebida} x${item.Cantidad}`).join(' - ')
                      : valor}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
