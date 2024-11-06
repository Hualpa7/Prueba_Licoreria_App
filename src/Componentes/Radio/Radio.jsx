
import { useState } from 'react';
import './Radio.css';
export default function Radio({ opciones, name, onFuncion,valorDefecto }) {
  const [seleccion, setSeleccion] = useState(valorDefecto||'');

  const manejaCambio = (e) => {
    setSeleccion(e.target.value);
    { onFuncion && onFuncion(e.target.value); }

  };

  return (
    <div className='__radio'>
      {opciones.map((opcion, indice) => (
        <label key={indice} className="__chekeado">
          <input
            className="__opciones"
            type="radio"
            name={name}
            value={opcion}
            checked={seleccion === opcion}
            onChange={manejaCambio}
          />
          {opcion}
        </label>
      ))}
    </div>
  );
}