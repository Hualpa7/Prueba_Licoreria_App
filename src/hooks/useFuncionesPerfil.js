import { useNavigate } from 'react-router-dom';

export const useFuncionesPerfil = () => {
    
    const navegarHacia = useNavigate();

    const cerrarSesion = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/usuario/cerrarSesion", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const resultado = await respuesta.json();
            console.log(resultado);
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