import { useNavigate } from 'react-router-dom';
import { useUsuarioStore } from '../store/Usuario';

export const useFuncionesPerfil = () => {
    const {cierraSesion} = useUsuarioStore(); //funcion de cierre sesion de la store
    
    const navegarHacia = useNavigate();
    const {token} = useUsuarioStore();
    const cerrarSesion = async () => {
       
        try {
           
            const respuesta = await fetch("http://127.0.0.1:8000/api/usuario/cerrarSesion", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
  
            cierraSesion();
            navegarHacia('/inicioSesion');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const acciones = {
        irAPerfil: () => navegarHacia('/perfil'),
        irAConfiguraciones: () => navegarHacia('/perfil/configuraciones'),
        cerrarSesion
    };

    return acciones;
};