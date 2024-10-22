import { useState } from "react";
import Radio from "../../Radio/Radio";
import FormularioDescuento from "./FormularioDescuento";
import FormularioCombo from "../../NuevoCombo/FormularioCombo";

import './NuevaOferta.css'

export default function NuevaOferta({ }) {


    const [seleccion, setSeleccion] = useState('');//valor por defecto

    const manejarSeleccion = (valor) => { //funcion que se la pasa al input radio 
        setSeleccion(valor);             //el componente radio maneja la eleccion de un elemento y luego la retorna al padre
    };                                  //en este caso esta funcion, para setear la eleccion y tener un solo formulario activo a la vez 

    return (
        <div>
            <div className="__eleccion_oferta">
                <label>Crear</label>
                <Radio opciones={["Descuento", "Combo"]} name="oferta" onFuncion={manejarSeleccion} ></Radio>
            </div>
            <div className="__cuerpo_formularios">
                <FormularioDescuento seleccion={seleccion} />
                <FormularioCombo seleccion={seleccion} />



            </div>

        </div>
    )

}