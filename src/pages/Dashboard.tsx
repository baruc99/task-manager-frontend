import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout } from '../services/authService';
import TaskList from '../components/TaskList';
import AuthGuard from '../AuthGuard';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/Task';
import Swal from 'sweetalert2';
import { createTask, updateTask, getTasks } from '../services/taskService';


export default function Dashboard() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const sortedTasks = await getTasks();
            setTasks(sortedTasks);
        } catch (error) {
            console.error("Error al obtener tareas", error);
        }
    };


    const handleLogout = async () => {
        const result = await Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Estás seguro de que deseas salir?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await logout();
                localStorage.removeItem('auth_token');
                navigate('/');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        }
    };

    const handleCreateOrUpdate = async (task: Partial<Task>) => {
        try {
            if (task.id) {
                await updateTask(task.id, task);
            } else {
                await createTask(task);
            }
            fetchTasks();
            setShowModal(false);
            setEditingTask(null);
        } catch (error) {
            console.error("Error al guardar tarea", error);
        }
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Mis tareas - {localStorage.getItem("name") || "Usuario"}
                    </h1>

                    <div className="space-x-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Nueva tarea
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>

                {/* Lista de tareas */}
                <TaskList
                    tasks={tasks}
                    onEditTask={(task) => {
                        setEditingTask(task);
                        setShowModal(true);
                    }}
                    onDeleteTask={() => fetchTasks()}
                />



                {/* Modal para crear o editar tarea */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingTask(null);
                                }}
                            >
                                ✕
                            </button>
                            <TaskForm
                                initialData={editingTask ?? undefined}
                                onSubmit={handleCreateOrUpdate}
                            />

                        </div>
                    </div>
                )}
            </div>
        </AuthGuard>
    );
}
