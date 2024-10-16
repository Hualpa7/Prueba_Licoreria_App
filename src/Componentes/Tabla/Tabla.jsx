import { useState } from 'react';
import './Tabla.css';



export default function Tabla({ columnas, datos, onSeleccionar }) {

  const [seleccionado, setSeleccionado] = useState(null); //permite almacenar un unico elemento seleccionado

  const manejarSeleccion = (elemento) => {
    const nuevoSeleccionado = elemento === seleccionado ? null : elemento; //permite tener un solo elemento seleccionado si es el mismo null
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
             className={seleccionado === elemento ? '__seleccionado' : ''}
             onDoubleClick={() => manejarSeleccion(elemento)} // Maneja el doble clic para seleccionar una fila
             >
              {columnas.map((columna, i) => ( //se genera para cada columna los elementos
                <td key={i}>{elemento[columna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}