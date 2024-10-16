import './Selector.css';
import { useState } from 'react';
import React, { forwardRef } from 'react';

const Selector = forwardRef(function Selector({ opciones, id, deshabilitado, ...restoProp }, ref) {
    const [seleccion, setSeleccion] = useState('');

    const deshabilit = deshabilitado ? 'no-habilitado' : '';

    // Si restoProp contiene onChange y value, entonces quiere decir que lo controla react-hook-form.
    // de lo contrario, manejo el estado interno con mi useState.
    const controladoPorForm = !!restoProp.onChange;

    const manejoSeleccion = (e) => {
        if (!controladoPorForm) {
            setSeleccion(e.target.value); // Actualiza el estado solo si no está controlado por fuera
        }
        restoProp.onChange && restoProp.onChange(e); // Llama a onChange de hook form si está disponible
    };

    return (
        <select
            ref={ref} // Pasa la referencia aquí
            id={id}
            disabled={deshabilitado}
            value={controladoPorForm ? restoProp.value : seleccion} // Si está controlado, usa el valor de hook-form
            onChange={manejoSeleccion}
            className={`__selector ${deshabilit}`}
            {...restoProp} // Pasa el resto de las propiedades
        >
            {opciones.map((opcion, indice) => (
                <option key={indice} value={opcion}>
                    {opcion}
                </option>
            ))}
        </select>
    );
});

export default Selector;