import MensajeErrorForm from '../MensajeErrorForm/MensajeErrorForm';
import './Tarjeta.css';

export default function Tarjeta({descripcion,children,forid,mensajeError}){
    

    return(
        <div className="__tarjeta">
            <label htmlFor={forid} >{descripcion}</label>
            {children}
            {mensajeError && (<MensajeErrorForm >{mensajeError}</MensajeErrorForm>)}
        </div>
    )
} 