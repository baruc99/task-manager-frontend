# Proyecto de Gestión de Tareas (Frontend)

Este es el frontend de una aplicación de gestión de tareas, desarrollado con **React**, **TypeScript**, y **TailwindCSS**. La aplicación permite a los usuarios gestionar sus tareas, ver su lista de tareas, crear nuevas tareas, editar o eliminar tareas, y asignar prioridades automáticamente a las tareas según su fecha de vencimiento y estado.

## Características

- **Autenticación**: El sistema permite a los usuarios registrarse, iniciar sesión y cerrar sesión.
- **CRUD de tareas**: Los usuarios pueden crear, leer, actualizar y eliminar tareas.
- **Prioridad automática**: Las tareas se asignan automáticamente a una prioridad (alta, media, baja) según su fecha de vencimiento y estado.
- **Interfaz responsiva**: La interfaz se adapta a diferentes tamaños de pantalla.

## Tecnologías usadas

- **React**: Librería principal para la construcción de la interfaz de usuario.
- **TypeScript**: Lenguaje basado en JavaScript con tipado estático.
- **TailwindCSS**: Framework de diseño de CSS para crear interfaces modernas y rápidas.
- **SweetAlert2**: Para mostrar alertas emergentes de confirmación y éxito.
- **Axios**: Para hacer peticiones HTTP a la API.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone <https://github.com/baruc99/task-manager-frontend>
    cd <task-manager-frontend>
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo:

    ```bash
    npm start
    ```

4. La aplicación estará disponible en `http://localhost:3000`.

## Endpoints

La aplicación se conecta con el backend a través de los siguientes endpoints:

- **POST /login**: Inicia sesión y recibe un token de autenticación.
- **POST /register**: Registra un nuevo usuario.
- **GET /tasks**: Obtiene todas las tareas del usuario.
- **POST /tasks**: Crea una nueva tarea.
- **PUT /tasks/{id}**: Actualiza una tarea.
- **DELETE /tasks/{id}**: Elimina una tarea.

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un issue o un pull request con tus cambios.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
