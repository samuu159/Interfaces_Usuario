// Datos de las tareas
const tasks = {
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
    Sábado: [],
    Domingo: []
};

// Elementos del DOM
const taskForms = document.querySelectorAll('.task-form');
const taskSelect = document.getElementById('task-select');
const deleteDaySelect = document.getElementById('delete-day-select');
const completionPercentage = document.getElementById('completion-percentage');
const verEjerciciosBtns = document.querySelectorAll('.ver-ejercicios-btn');
const ejerciciosList = document.getElementById('ejercicios-list');

// Evento para añadir una tarea cuando se envía el formulario
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = document.querySelector('#task-form .task-input').value.trim();
    const selectedDay = document.querySelector('#task-form #day-select').value;
    if (taskText) {
        addTask({ text: taskText, completed: false }, selectedDay);
        document.querySelector('#task-form .task-input').value = ''; // Limpiar el campo de entrada después de agregar la tarea
    }
});

verEjerciciosBtns.forEach(verEjerciciosBtn => {
    verEjerciciosBtn.addEventListener('click', function() {
        var selectedOption = this.parentNode.querySelector('.task-input').value.toLowerCase();
        console.log(selectedOption); // Verifica el valor seleccionado en la consola

        var selectedList = document.getElementById(selectedOption + '-exercises');

        // Ocultar todas las listas de ejercicios
        var allLists = document.querySelectorAll('#ejercicios-list > ul');
        allLists.forEach(function(list) {
            list.style.display = 'none';
        });

        // Mostrar la lista de ejercicios seleccionada
        if (selectedList) {
            selectedList.style.display = 'block';
        }
    });
});

// Evento para eliminar una tarea cuando se envía el formulario
document.getElementById('task-delete-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDay = deleteDaySelect.value;
    const selectedTaskIndex = taskSelect.value;
    if (selectedTaskIndex !== '') {
        removeTask(selectedDay, parseInt(selectedTaskIndex, 10));
    }
});

// Función para añadir una tarea
function addTask(task, day) {
    tasks[day].push(task);
    renderTasks();
    updateTaskSelect();
    updateCompletionPercentage();
}

// Función para renderizar las tareas
function renderTasks() {
    Object.entries(tasks).forEach(([day, tasksOfDay]) => {
        const dayContainer = document.getElementById(day);
        dayContainer.innerHTML = ''; // Limpiar las tareas anteriores
        tasksOfDay.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.textContent = task.text;
            
            // Si la tarea está completada, cambia el color de fondo
            if (task.completed) {
                taskItem.style.backgroundColor = 'lightgreen';
            }

            taskItem.addEventListener('click', () => {
                toggleTaskCompletion(day, index);
            });

            dayContainer.appendChild(taskItem);
        });
    });
}

// Función para alternar la finalización de la tarea
function toggleTaskCompletion(day, index) {
    tasks[day][index].completed = !tasks[day][index].completed;
    renderTasks();
    updateCompletionPercentage();
}

// Función para eliminar una tarea
function removeTask(day, index) {
    tasks[day].splice(index, 1);
    renderTasks();
    updateTaskSelect();
    updateCompletionPercentage();
}

// Función para actualizar las opciones de selección de tareas en el formulario de eliminación
function updateTaskSelect() {
    const selectedDay = deleteDaySelect.value;
    taskSelect.innerHTML = ''; // Limpiar las opciones anteriores
    tasks[selectedDay].forEach((task, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = task.text;
        taskSelect.appendChild(option);
    });
}

// Función para actualizar el porcentaje de tareas completadas
function updateCompletionPercentage() {
    const totalTasks = Object.values(tasks).flat().length;
    const completedTasks = Object.values(tasks).flat().filter(task => task.completed).length;
    const percentageCompleted = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    completionPercentage.textContent = `Porcentaje completado: ${percentageCompleted.toFixed(2)}%`;
}

// Inicialización: Renderizar las tareas y actualizar el porcentaje
renderTasks();
updateTaskSelect();
updateCompletionPercentage();

// Evento para actualizar las opciones de tareas cuando se selecciona un día en el formulario de eliminación
deleteDaySelect.addEventListener('change', updateTaskSelect);
