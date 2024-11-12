
import { useState } from 'react';
import './Radio.css';
export default function Radio({ opciones,name,value,onChange  }) {

  

  return (
    <div className='__radio'>
      {opciones.map((opcion, indice) => (
        <label key={indice} className="__chekeado">
          <input
            className="__opciones"
            type="radio"
            name={name}
            value={opcion}
            checked={value == opcion} 
           onChange={() => onChange(opcion)}
          />
          {opcion}
        </label>
      ))}
    </div>
  );
}