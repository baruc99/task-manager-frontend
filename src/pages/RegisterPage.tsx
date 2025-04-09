import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService'; // Asegúrate de importar correctamente la función
import Swal from 'sweetalert2'; // Importa SweetAlert2

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Si ya existe el token en localStorage, redirige al dashboard
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Intentamos registrar al usuario
            await register(
                formData.name,
                formData.email,
                formData.password,
                formData.password_confirmation
            );

            // Mostrar mensaje de éxito con SweetAlert2
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Te has registrado correctamente. Redirigiendo al login...',
                timer: 2000, // Tiempo que se muestra el mensaje
                showConfirmButton: false, // No muestra el botón de confirmar
            });

            setTimeout(() => {
                handleGoHome(); // Redirige a la página de inicio después de 2 segundos
            }, 1000); // Espera 3 segundos para mostrar el mensaje

        } catch (error) {
            console.error('Error de registro:', error);

            // Mostrar mensaje de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al registrar el usuario. Intenta nuevamente.',
                showConfirmButton: true, // Muestra el botón para confirmar
            });
        }
    };

    // Función para manejar el regreso a la página de inicio
    const handleGoHome = () => {
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4 font-bold text-center">Registrarse</h2>

                {/* Campos del formulario */}
                <input
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Correo electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Confirmar contraseña"
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                />

                {/* Botón para registrarse */}
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
                    Registrarse
                </button>

                {/* Botón para regresar a la página de inicio */}
                <button
                    type="button"
                    onClick={handleGoHome}
                    className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                    Regresar a Inicio
                </button>
            </form>
        </div>
    );
}
