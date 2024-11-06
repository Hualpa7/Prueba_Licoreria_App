
import './PlantillaConfiguraciones.css'

export default function PlantillaConfiguraciones ({ navigation ,main })  {
    return (
      <div className="__plantilla_configuraciones">
        <Navegador>{navigation}</Navegador>  {/* Pestañas de botones */}
        <Cuerpo >{main}</Cuerpo>    {/* Cuerpo */}
      </div>
    );


    function Navegador({ children }) { return <div className="navegador">{children}</div>; } 
    function Cuerpo({ children }) { return <div className="cuerpo">{children}</div>; }
  };