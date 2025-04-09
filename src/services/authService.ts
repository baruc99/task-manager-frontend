import api from './api';

// Función para login
export const login = async (email: string, password: string) =>
    api.post('/login', { email, password });

    export const register = (name: string, email: string, password: string, password_confirmation: string) =>
        api.post('/register', { name, email, password, password_confirmation });

    export const logout = () => {
        const token = localStorage.getItem('auth_token');
        return api.post('/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };
    

    export const getUser = () => api.get('/user');
