// utils.ts

import { TaskStatus, TaskPriority } from "../types/Task";

/**
 * Asigna una prioridad automática basada en la fecha de vencimiento y el estado de la tarea.
 * @param dueDate Fecha de vencimiento (formato string ISO o null)
 * @param status Estado actual de la tarea
 * @returns Prioridad asignada ('low', 'medium' o 'high')
 */
export function assignPriority(dueDate: string | null, status: TaskStatus): TaskPriority {
    if (status === 'completada') return 'low';

    if (!dueDate) return 'medium';

    const today = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) return 'high';     // Vencida o vence hoy
    if (diffInDays <= 3) return 'medium';   // Próxima a vencer
    return 'low';                           // Aún hay tiempo
}

/**
 * Convierte una prioridad a su equivalente en español
 */
export function mapPriorityToSpanish(priority: TaskPriority | undefined): string {
    switch (priority) {
        case "low": return "Baja";
        case "medium": return "Media";
        case "high": return "Alta";
        default: return "No asignada";
    }
}

/**
 * Devuelve una clase CSS basada en la prioridad
 */
export function mapPriorityToClass(priority: TaskPriority | undefined): string {
    switch (priority) {
        case "low": return "bg-green-200";
        case "medium": return "bg-yellow-200";
        case "high": return "bg-red-200";
        default: return "bg-gray-200";
    }
}
