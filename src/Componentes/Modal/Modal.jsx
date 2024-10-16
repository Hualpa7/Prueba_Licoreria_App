import './Modal.css';

import Boton from '../Boton/Boton';
import equis from '../../assets/equis.png';



export default function Modal({ visible, funcion, children,titulo,altura,anchura}) { //Crear ventanas emergentes

    if (!visible) return null; // Si no es visible, no se muestra nada
                               
    return (
      <div className="__modal-fondo">
        <div className="__modal-contenido" style={{width:anchura,height:altura}}> 
             <div className='__modal-cabecera'>
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