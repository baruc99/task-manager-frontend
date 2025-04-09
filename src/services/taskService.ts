import { log } from 'console';
import api from './api';

export const getTasks = async () => {
    const token = localStorage.getItem('auth_token');
    const response = await api.get('/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    // Verificar que la respuesta contiene un array de tareas
    const tasks = Array.isArray(response.data) ? response.data : [];

    // Mapa de prioridades para ordenar correctamente (high > medium > low)
    const priorityOrder: { [key: string]: number } = {
        high: 3,
        medium: 2,
        low: 1,
    };

    // Ordenar primero por prioridad y luego por fecha (due_date)
    const sortedTasks = tasks.sort((a: any, b: any) => {
        // Comparar por prioridad
        if (priorityOrder[a.priority] > priorityOrder[b.priority]) return -1;
        if (priorityOrder[a.priority] < priorityOrder[b.priority]) return 1;

        // Si tienen la misma prioridad, comparar por fecha
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return dateA.getTime() - dateB.getTime(); // Ordenar de más cercano a más lejano
    });

    return sortedTasks;
};



export const getTask = (id: number) => {
    const token = localStorage.getItem('auth_token');
    return api.get(`/tasks/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const createTask = (data: any) => {
    const token = localStorage.getItem('auth_token');
    console.log(data);
    return api.post('/tasks', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const updateTask = (id: number, data: any) => {
    const token = localStorage.getItem('auth_token');
    console.log(`/tasks/${id}`);
    console.log(data);
    
    
    return api.put(`/tasks/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const deleteTask = (id: number) => {
    const token = localStorage.getItem('auth_token');
    return api.delete(`/tasks/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

