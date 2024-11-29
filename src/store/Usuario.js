import { create } from "zustand"; //importar funcion create para crear un estado
import { persist } from "zustand/middleware";

export const useUsuarioStore = create(
    persist(

        (set, get) => ({
        token: null,
        uuario: null,
    
        iniciarSesion: async (correo, contraseña) => {
            try {
    
                const respuesta = await fetch("http://127.0.0.1:8000/api/usuario/iniciarSesion", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', //config header
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ correo, contraseña }), //se crea el JSON con los datos del formulario
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
    
                set({
                    token: token,
                    usuario: usuario
                });
    
                return { token, usuario };
    
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
            
            }
        },
    
        cierraSesion: () => {
            set({ token: null, usuario: null });
        }
    }),
    {
          name:"usuarioStorage", //nombre para el storage
          getStorage:()=>localStorage //usar el local storge para persistnecia
    }
)
);