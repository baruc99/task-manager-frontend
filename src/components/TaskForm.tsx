// TaskForm.tsx
import { useState, useEffect, FormEvent } from "react";
import { Task } from "../types/Task";
import { assignPriority } from "../utils/utils";

interface TaskFormProps {
    initialData?: Task;
    onSubmit: (task: Partial<Task>) => Promise<void>;
}

const defaultTask: Omit<Task, 'id' | 'user_id'> = {
    title: "",
    description: "",
    status: "pendiente",
    due_date: new Date(),
    category: "personal",
};

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
    const [form, setForm] = useState<Omit<Task, 'id' | 'user_id'>>(defaultTask);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            const { user_id, id, ...rest } = initialData;
            setForm(rest);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = (): boolean => {
        return form.title.trim() !== "" && form.status.trim() !== "" && form.category.trim() !== "";
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dueDate = form.due_date ? new Date(form.due_date).toISOString().split("T")[0] : null;
            const priority = assignPriority(dueDate, form.status);

            await onSubmit({
                ...form,
                id: initialData?.id,
                due_date: dueDate,
                priority
            });

            if (!initialData) {
                setForm(defaultTask);
            }
        } catch (error) {
            console.error("Error al enviar tarea", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Título"
                required
                className="w-full p-2 border rounded"
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="w-full p-2 border rounded"
            />
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En progreso</option>
                <option value="completada">Completada</option>
            </select>
            <input
                type="date"
                name="due_date"
                value={form.due_date || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Selecciona una categoría</option>
                <option value="personal">Personal</option>
                <option value="trabajo">Trabajo</option>
                <option value="otro">Otro</option>
            </select>
            <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
            </button>
        </form>
    );
}

