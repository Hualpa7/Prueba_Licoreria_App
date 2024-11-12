import './Modal.css';
import Boton from '../Boton/Boton';
import equis from '../../assets/equis.png';
import { useState } from 'react';



export default function Modal({ visible, funcion, children, titulo, altura, anchura }) { //Crear ventanas emergentes

  if (!visible) return null; // Si no es visible, no se muestra nada

  //ESTADOS PARA CONTORLAR EL ARRASTRE

  // Estados para controlar el arrastre
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Iniciar arrastre
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Terminar arrastre
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Arrastrar
  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };


  return (
    <div className="__modal-fondo" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        className="__modal-contenido"
        style={{
          width: anchura,
          height: altura,
          transform: `translate(${position.x}px, ${position.y}px)`
          
        }}>
        <div className='__modal-cabecera' onMouseDown={handleMouseDown} 
         style={{cursor: dragging ? 'grabbing' : 'grab'}}>
          <h2>{titulo}</h2>
          <span className="__cierre-boton" onClick={funcion}><Boton icono={equis} habilitado></Boton></span>
        </div>
        <div className="__modal-cuerpo " >

          {children} {/* Aquí puedes pasar botones, tablas o cualquier otro contenido */}
        </div>
      </div>
    </div>
  );
}
//Se devuelve una ventana con un boton para cerrarla