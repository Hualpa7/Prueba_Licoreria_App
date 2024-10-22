import { useState } from 'react';
import './Tabla.css';



export default function Tabla({ columnas, datos, onSeleccionar }) {


   // Función para determinar la clase de color según el stock
   const obtenerClaseStock = (stock, minimo) => {
    if (stock < minimo) return '__bajo_stock_rojo'; // Menor a 10, rojo
    if (stock < (minimo + 20)) return '__bajo_stock_naranja'; // Menor a 20, naranja
    return ''; // Sin clase especial si el stock es mayor o igual a 20
  };

  const [seleccionado, setSeleccionado] = useState(null); //permite almacenar un unico elemento seleccionado

  const manejarSeleccion = (elemento) => { //JSON.stringify para comparar los objetios tranfrmados en strings
    const nuevoSeleccionado = JSON.stringify(elemento) === JSON.stringify(seleccionado) ? null : elemento; //permite tener un solo elemento seleccionado si es el mismo null
    setSeleccionado(nuevoSeleccionado);
    onSeleccionar(nuevoSeleccionado); //se pasa la seleccion al padre
  }

  return (
    <div className='__tabla_contenedor'>

      <table>
        <thead className='__cabecera'>
          <tr>
            {columnas.map((columna, indice) => ( //se mapea el array de elementos cabecera y se los genera
              <th key={indice}>{columna}</th>
            ))}
          </tr>
        </thead>
        <tbody className='__cuerpo'>
          {datos.map((elemento, indice) => (  //se mapea el array de datos y se los va generando
            <tr key={indice}
            className={`${JSON.stringify(seleccionado) === JSON.stringify(elemento) ? '__seleccionado' : ''} ${obtenerClaseStock(elemento.Stock, elemento.Cantidad_minima)}`} // Aplicar clases según la selección y el stock
             onClick={() => manejarSeleccion(elemento)} // Maneja el doble clic para seleccionar una fila
             >
              {columnas.map((columna, i) => { // Funcion para verificar si estoy pasando un array para cada celda como en el caso de combo
                const valor = elemento[columna];//si estoy pasando el combo, entonces transformo el array en un string
                return (                          //caso contrario se agrega el elemendo
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