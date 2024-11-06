
import React, { useEffect } from 'react';
import './CheckBoxes.css'

export default function CheckBoxes({ opciones, name, valoresSeleccionados = [], onFuncion, setValue, watch }) {
  // Observamos el valor actual de los permisos en el formulario
  const seleccionados = watch(name) || valoresSeleccionados;


  useEffect(() => {
    // Solo establecer valores iniciales al montar el componente
    setValue(name, valoresSeleccionados);
  }, [setValue, name]); // Solo se ejecuta en el montaje, no en cada renderizado.

  const manejaCambio = (e) => {
    const { value, checked } = e.target;



    // Actualizamos el estado de seleccionados según si se selecciona o des-selecciona un checkbox
    const nuevosSeleccionados = checked
      ? [...seleccionados, value] // Agregar si está seleccionado
      : seleccionados.filter(opcion => opcion !== value); // Remover si está des-seleccionado

    // Actualiza el valor del formulario
    setValue(name, nuevosSeleccionados, { shouldValidate: true });
  };

  return (
    <div className="__checkboxes">
      {opciones.map((opcion, indice) => (
        <label key={indice}
          className={`${valoresSeleccionados.includes(opcion) ? '__label_Deshabilitado' : '__labelCheckbox'}`}>
          <input
            className="__inputCheckbox"
            type="checkbox"
            name={name}
            value={opcion}
            checked={seleccionados.includes(opcion)}
            onChange={manejaCambio}
            disabled={valoresSeleccionados.includes(opcion)} // Deshabilitar si está en valoresSeleccionados
          />
          {opcion}
        </label>
      ))}
    </div>
  );
}
