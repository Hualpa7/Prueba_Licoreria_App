import './Selector.css';
import { useState, useEffect } from 'react';
import React, { forwardRef } from 'react';

const Selector = forwardRef(function Selector({ opciones, id, defaultValue, opcionDefecto,opcionNula,deshabilitado, ...restoProp }, ref) {
    const deshabilit = deshabilitado ? 'no-habilitado' : '';

    return (
        <select
            ref={ref}
            id={id}
            disabled={deshabilitado}
            defaultValue={defaultValue ? defaultValue : ""} 
            className={`__selector ${deshabilit}`}
            {...restoProp}
        >

            {!opcionDefecto && (<option value=""> {opcionNula ? opcionNula : "Seleccionar"}</option>) }
            {opciones.map((opcion, indice) => (
                <option key={indice} value={opcion.value}>
                    {opcion.label}
                </option>
            ))}
        </select>
    );
});

export default Selector;