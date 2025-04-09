// TaskList.tsx
import Swal from "sweetalert2";
import { TaskListProps } from "../types/Task";
import { deleteTask } from "../services/taskService";

export default function TaskList({ tasks, onEditTask, onDeleteTask }: TaskListProps & { onDeleteTask: (id: number) => void }) {
    const mapPriorityToSpanish = (priority: 'low' | 'medium' | 'high' | undefined) => {
        switch (priority) {
            case "low": return "Baja";
            case "medium": return "Media";
            case "high": return "Alta";
            default: return "No asignada";
        }
    };

    const mapPriorityToClass = (priority: 'low' | 'medium' | 'high' | undefined) => {
        switch (priority) {
            case "low": return "bg-green-200";
            case "medium": return "bg-yellow-200";
            case "high": return "bg-red-200";
            default: return "bg-gray-200";
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await deleteTask(id);
                onDeleteTask(id); // <- notifica al padre (Dashboard)
            } catch (error) {
                console.error("Error al eliminar tarea", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No hay tareas disponibles</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className={`border p-4 rounded shadow ${mapPriorityToClass(task.priority)}`}>
                            <h3 className="text-xl font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">Estado: {task.status}</p>
                            <p className="text-sm text-gray-500">Prioridad: {mapPriorityToSpanish(task.priority)}</p>
                            <p className="text-sm text-gray-500">Categoría: {task.category}</p>
                            {task.due_date && (
                                <p className="text-sm text-gray-500">
                                    Vence: {new Date(task.due_date).toLocaleDateString()}
                                </p>
                            )}

                            <div className="mt-2 space-x-2">
                                <button
                                    onClick={() => onEditTask(task)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
