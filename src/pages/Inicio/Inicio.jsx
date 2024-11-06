import BotonPerfil from '../../Componentes/BotonPerfil/BotonPerfil'
import './Inicio.css'
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
   const navegarHacia = useNavigate();

   const clickIniciarSesion = () =>{
   
      navegarHacia('/inicioSesion');
   }
   return (
      <>
         <div className='__iniciar'>

            <BotonPerfil onClick={clickIniciarSesion}></BotonPerfil>
         </div>
      </>
   )
}