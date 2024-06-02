// Datos de las tareas
const tasks = [];

// Elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const startTimeSelect = document.getElementById('start-time');
const endTimeSelect = document.getElementById('end-time');
const taskSelect = document.getElementById('task-select');
const taskDeleteForm = document.getElementById('task-delete-form');
const todayTasksBody = document.getElementById('today-tasks-body');
const clockElement = document.getElementById('clock');


(function () {
    calculateLines();
    setInterval(() => {
     calculateHourDegrees();
     calculateMinuteDegrees();
     calculateSeconds();
    }, 1000);
  })();
  
  function linearMap(value, min, max, newMin, newMax) {
      return newMin + (newMax - newMin) * (value - min) / (max - min);
  }
  
  function calculateHourDegrees() {
    const currentHour = new Date().getHours() - 12;
    const angle = linearMap(currentHour, 0, 12, 0, 360);
    document.querySelector(".hours").style.transform = `rotate(${angle}deg)`;
  }
  
  function calculateMinuteDegrees() {
    const currentMinutes = new Date().getMinutes();
    const angle = linearMap(currentMinutes, 0, 60, 0, 360);
    document.querySelector(".minutes").style.transform = `rotate(${angle}deg)`;
  }
  
  function calculateSeconds() {
    const currentMinutes = new Date().getSeconds();
    const angle = linearMap(currentMinutes, 0, 60, 0, 360);
    document.querySelector(".seconds").style.transform = `rotate(${angle}deg)`;
  }
  
  function calculateLines() {
    const lines = document.querySelectorAll(".line");
    const numberLines = lines.length;
    for (let i = 0; i < numberLines; i++) {
      const line = lines[i];
      const angle = linearMap(i, 0, numberLines, 0, 360);
      line.style.transform = `rotate(${angle}deg)`;
    }
  }

// Evento para añadir una tarea cuando se envía el formulario
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const startTime = startTimeSelect.value;
    const endTime = endTimeSelect.value;
    if (taskText && startTime && endTime) {
        addTask(taskText, startTime, endTime);
        taskInput.value = '';
        startTimeSelect
        .value = ''; // Reiniciar el valor del selector de inicio
        endTimeSelect.value = ''; // Reiniciar el valor del selector de fin
    }
});

// Evento para eliminar una tarea cuando se envía el formulario
taskDeleteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedTaskIndex = taskSelect.value;
    if (selectedTaskIndex !== '') {
        removeTask(parseInt(selectedTaskIndex, 10));
    }
});

// Función para añadir una tarea
// 1. Agregar una propiedad "completada" a cada objeto de tarea
function addTask(taskText, startTime, endTime) {
    const task = { text: taskText, startTime, endTime, completed: false }; // Agregar la propiedad "completed"
    tasks.push(task);
    renderTasks();
    updateTaskSelect();
}

// 2. Modificar la función para renderizar las tareas
function renderTasks() {
    todayTasksBody.innerHTML = ''; // Limpiar las tareas anteriores
    tasks.forEach((task, index) => {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${task.text}</td>
            <td>${task.startTime}</td>
            <td>${task.endTime}</td>
        `;
        // Agregar un identificador único a cada fila de tarea para futuras referencias
        taskRow.dataset.index = index;
        // Agregar un evento click para marcar la tarea como completada
        taskRow.addEventListener('click', () => toggleTaskCompletion(index));
        // Establecer el estilo de la fila dependiendo del estado de completitud de la tarea
        if (task.completed) {
            taskRow.classList.add('completed-task');
        }
        todayTasksBody.appendChild(taskRow);
    });
}

// 3. Modificar la función para alternar la finalización de la tarea
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// 1. Corregir la función para eliminar una tarea
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    updateTaskSelect();
}

// 2. Corregir el evento submit del formulario de eliminación de tarea
taskDeleteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedTaskIndex = taskSelect.value;
    if (selectedTaskIndex !== '') {
        removeTask(parseInt(selectedTaskIndex, 10));
    }
});

// 3. Corregir la función para actualizar las opciones de selección de tareas en el formulario de eliminación
function updateTaskSelect() {
    taskSelect.innerHTML = ''; // Limpiar las opciones anteriores
    tasks.forEach((task, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = task.text;
        taskSelect.appendChild(option);
    });
}

// Inicialización: Renderizar las tareas y actualizar el selector de tareas disponibles para eliminar
renderTasks();
updateTaskSelect();
