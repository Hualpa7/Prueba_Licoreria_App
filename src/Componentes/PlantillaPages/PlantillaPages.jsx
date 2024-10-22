
import './PlantillaPages.css'

export default function PlantillaPages ({ header,navigation ,main, footer })  {
    return (
      <div className="__plantilla_paginas">
        <header>{header}</header> {/* Panel de filtros */}
        <nav>{navigation}</nav>  {/* Pestañas de botones */}
        <main>{main}</main>    {/* Tabla con datos */}
        <footer>{footer}</footer>  {/* Botones de interacción con la tabla */}
      </div>
    );
  };