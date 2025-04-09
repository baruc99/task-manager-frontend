import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/'); // Redirige al login si no hay token
        }
    }, [navigate]);

    return children; // Si el token existe, renderiza el contenido protegido
};

export default AuthGuard;
