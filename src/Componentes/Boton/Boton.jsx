import './Boton.css';       //Importo tambien su estilo

export default function Boton({descripcion, onClick,icono,habilitado,submit}){
  
  const Icon = icono ?  `url("${icono}")` : '';

  const clase = habilitado ? 'habilitado' : 'no-habilitado';
  const tipo = submit ? 'submit' : 'button'; // Define el tipo de botón basado en la prop `submit`
    return(
        <div className='__boton'>
            <button 
            type={tipo}
            className={clase}
             onClick={onClick}
             disabled={!habilitado}
             >
             <div className='__boton_contenido'>
                {icono &&(  //Esto se hace para que cuando el boton no tenga icono, no ocupe el espacio en el display del boton_contenido
                    <span className='__boton_icono'style={{backgroundImage:Icon}}></span>
                )}
                    <span className='__boton_descripcion'> {descripcion}</span>   
             </div>
            </button>
        </div>
    )
}