import './BotonPerfil.css';       //Importo tambien su estilo

export default function BotonPerfil({ onClick }) {

    return (
        <div className='__boton_perfil'>
            <button
                onClick={onClick}
            >
            </button>
        </div>
    )
}