import { useForm } from "react-hook-form"
import './IniciarSesion.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";



export default function IniciarSesion() {
    const navegarHacia = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({

    });


    const onSubmit = async (data) => {
        manejaCargando(true);
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/usuario/iniciarSesion", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', //config header
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data), //se crea el JSON con los datos del formulario
            });

            
            const resultado = await respuesta.json();

            // Se obtiene el token
            const token = resultado.token;
            if (!token) {
                throw new Error("Token no recibido");
            }

             //Con el token obtengo los datos del usuario
             const respuestaUsuario = await fetch("http://127.0.0.1:8000/api/usuario/usuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
             });
             const usuario = await respuestaUsuario.json();
             console.log(usuario);




            localStorage.setItem("authToken", token);//Guarda el token
            localStorage.setItem("usuario", JSON.stringify(usuario));//Guardamos al usuario

            // Redirige al usuario a la página de vender
            setCargando(false);
            navegarHacia('/vender');

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Usuario o contraseña incorrectos");
        }
    }

    /////////// ESTADO PARA SABER CUANDO SE ESTA CARGANDO (SE ESTAN TRAYENDO LOS DATOS)
    const [cargando, setCargando] = useState(false);

    const manejaCargando = ((valor) => {
        setCargando(valor);
    });

    //LAYOUT

    return (
        <>
            {cargando && <div className='__cargando_fondo'><div className="__cargando"></div> </div>}
            <div className="formLogin">
                <div id="inicio"> <h2>Inicio de Sesion</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}                 >
                    <div className="boxInput">
                        <input type="text"
                            {...register("correo", {
                                required: {
                                    value: true,
                                    message: "Ingrese nombre Usuario"
                                }
                            })}
                        ></input>
                        <label>Correo</label>
                        <span></span>
                    </div>
                    <div className="boxInput">
                        <input type="password"
                            {...register("contraseña", {
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

                        <input id="bottomIniciar" type="submit" value="Iniciar"></input>
                    </div>
                </form>

            </div>
            <script src="script.js"></script>
        </>
    );
}