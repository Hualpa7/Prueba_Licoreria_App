import './Selector.css';
import { useState, useEffect } from 'react';
import React, { forwardRef } from 'react';

const Selector = forwardRef(function Selector({ opciones, id, defaultValue, deshabilitado, ...restoProp }, ref) {
    const [seleccion, setSeleccion] = useState(-1);

    const deshabilit = deshabilitado ? 'no-habilitado' : '';
/*
    useEffect(() => {
        setSeleccion(setValue)
    },[])*/

    // Si restoProp contiene onChange y value, entonces quiere decir que lo controla react-hook-form.
    // de lo contrario, manejo el estado interno con mi useState.
    const controladoPorForm = !!restoProp.onChange;

    const manejoSeleccion = (e) => {
        if (!controladoPorForm) {
            setSeleccion(e.target.value); // Actualiza el estado solo si no está controlado por fuera
        }
        restoProp.onChange && restoProp.onChange(e); // Llama a onChange de hook form si está disponible
    };

    console.log(restoProp);

    return (
        <select
            ref={ref} // Pasa la referencia aquí
            id={id}
            disabled={deshabilitado}
            defaultValue={seleccion} // Si está controlado, usa el valor de hook-form
            //onChange={manejoSeleccion}
            className={`__selector ${deshabilit}`}
            {...restoProp} // Pasa el resto de las propiedades
        >
            
            {opciones.map((opcion, indice) => (
                <option key={indice} value={opcion.value}>
                    {opcion.label}
                </option>
            ))}
        </select>
    );
});

export default Selector;