import './Input.css';
import React, { forwardRef } from 'react';

const Input = forwardRef(function Input({ tipo, placeholder, deshabilitado, id, defaultValue, ...restoProps }, ref) {

    const clasesInput = {
        number: '__input-number',
        password: '__input-password',
        search: '__input-search',
        text: '__input-text',
        date: '__input-date',
        costo: '__input-costo',
        porcentaje: '__input-porcentaje'
    };


    const deshabilit = deshabilitado ? 'no-habilitado' : '';

    const claseInput = clasesInput[tipo] || '__input-text'; //asigno clase dependiendo del mapeo, por defecto es tipo text

    return (
        <input
            ref={ref}
            defaultValue={defaultValue}
            id={id}
            type={tipo}
            className={`__input ${claseInput} ${deshabilit}`}
            placeholder={placeholder}
            min={tipo === 'number' ? 0 : undefined}
            disabled={deshabilitado}
            {...restoProps}
        ></input>
    );

})

export default Input;