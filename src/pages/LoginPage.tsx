import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Importa la función de login
import Swal from 'sweetalert2'; // Importa SweetAlert2

export default function LoginPage() {
    const [email, setEmail] = useState('baruc05@example.com');
    const [password, setPassword] = useState('password');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Llama al servicio de login
            const response = await login(email, password);

            // Al recibir respuesta exitosa (si tienes un token o respuesta en el body)
            const token = response.data.token;  // Asumiendo que la respuesta incluye un token
            const name = response.data.user.name;
            // Guarda el token en localStorage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('name', name);

            // Muestra el mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente.',
                timer: 2000, // El mensaje durará 2 segundos
                showConfirmButton: false, // No muestra el botón de confirmación
            });

            // Redirige al dashboard después de 2 segundos
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            console.error('Error de login:', error);

            // Muestra el mensaje de error si el login falla
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Credenciales incorrectas. Intenta nuevamente.',
                showConfirmButton: true, // Muestra el botón de confirmación
            });
        }
    };

    const handleRegisterRedirect = () => {
        // Redirige a la página de registro
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4 font-bold text-center">Iniciar sesión</h2>
                <input
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Iniciar sesión
                </button>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={handleRegisterRedirect}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        ¿No tienes cuenta? Regístrate aquí
                    </button>
                </div>
            </form>
        </div>
    );
}
