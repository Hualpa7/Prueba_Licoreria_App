import { useForm } from "react-hook-form"
import './IniciarSesion.css'
import { useNavigate } from 'react-router-dom';

export default function IniciarSesion() {
    const navegarHacia = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {    //constante que devuleve todo lo del form


        }
    });


   const clickIniciarSesion = () =>{
   
      navegarHacia('/productos');
   }


    return (
        <>
            <div className="formLogin">
                <div id="inicio"> <h2>Inicio de Sesion</h2>
                </div>
                <form onSubmit={handleSubmit((data) => {
                    reset();
                    console.log(data);
                })} >
                    <div className="boxInput">
                        <input type="text"
                            {...register("Usuario", {
                                required: {
                                    value: true,
                                    message: "Ingrese nombre Usuario"
                                }
                            })}
                        ></input>
                        <label>Nombre de usuario</label>
                        <span></span>
                    </div>
                    <div className="boxInput">
                        <input type="password" 
                        {...register("contrasenia", {
                            required: {
                                value: true,
                                message: "Ingrese Contraseña"
                            }
                        })}
                        ></input>
                        <label>Contraseña</label>
                        <span></span>
                    </div>
                    <div className="rememberPassword">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                    <div>
                        <button onClick={clickIniciarSesion}>Ejemplo</button>
                        <input id="bottomIniciar" type="submit" value="Iniciar"></input>
                    </div>
                </form>

            </div>
            <script src="script.js"></script>
        </>
    );
}