// src/types.ts

export type TaskStatus = 'pendiente' | 'en progreso' | 'completada';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory =
    | 'trabajo'
    | 'estudio'
    | 'casa'
    | 'personal'
    | 'finanzas'
    | 'salud'
    | 'viaje'
    | 'social'
    | 'tecnología';

export interface Task {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    due_date?: String | any; // ISO string: "2025-04-08"
    priority?: TaskPriority;
    category: TaskCategory;
}

export interface TaskListProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
}
