import React, { forwardRef } from 'react';
import './Selector.css'; // Asegúrate de tener estilos para el selector

export default function Selector2({ id, opciones, deshabilitado, value, onChange, ...restoProp }) {

    const deshabilit = deshabilitado ? 'no-habilitado' : '';

    const manejoSeleccion = (e) => {
        if (onChange) {
            onChange(e); // Llama a onChange si está disponible
        }
    };

    return (
        <select
            id={id}
            disabled={deshabilitado}
            value={value || ''} // Usa el valor pasado o vacío si no hay valor
            onChange={manejoSeleccion}
            className={`__selector ${deshabilit}`}
            {...restoProp} // Pasa el resto de las propiedades
        >
            <option value="">Seleccionar</option> {/* Opción por defecto */}
            {opciones.map((opcion, indice) => (
                <option key={indice} value={opcion.value}>
                    {opcion.label}
                </option>
            ))}
        </select>
    );
}

