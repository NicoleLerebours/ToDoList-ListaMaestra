// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener("DOMContentLoaded", function() {
  // Obtener el formulario de registro de tareas
  const formulario = document.getElementById('form-registroTask');
  // Seleccionar todos los elementos input dentro del formulario
  const inputs = document.querySelectorAll('#form-registroTask input');
  // Seleccionar todos los elementos textarea dentro del formulario
  const textTarea = document.querySelectorAll('#form-registroTask textarea');
  // Obtener el elemento modal donde se agrega la tarea
  const modalElement = document.getElementById('AddTodoForm');
  // Crear una instancia del modal utilizando Bootstrap
  const modal = new bootstrap.Modal(modalElement);
  // Inicializar un array para almacenar las tareas
  let conjuntoTask = [];
  // Estado de validación de los campos del formulario
  const campos = {
    TitleTask: false,
    DescriptionTask: false,
    LimitDate: false,
    LimitTime: false,
    taskCompleted: false
  };
// Cargar tareas previamente guardadas en el localStorage
conjuntoTask = JSON.parse(localStorage.getItem("conjuntoTask")) || [];
// Agregar cada tarea cargada al DOM
conjuntoTask.forEach(task => {
  //Verifica que las tareas previamente guardadas en el localStorage si se marcaron como completadas se refleje el el DOM
  document.addEventListener('change', CheckboxChange);
  //Muestras en el DOM las tareas guardadas en el LocalStorage
  agregarTodoItem(task);
});

// Función para validar el formulario cuando un input o textarea pierde el foco o se escribe en él
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "TitleTask":
      validarCampos(e.target.value, 'TitleTask');
      break;
    case "DescriptionTask":
      validarCamposTextTarea(e.target.value, 'DescriptionTask');
      break;
    case "LimitDate":
      validarCamposFecha(e.target.value, 'LimitDate');
      break;
    case "LimitTime":
      validarCampos(e.target.value, 'LimitTime');
      break;
  }
};
  // Función para validar campos de tipo textarea
const validarCamposTextTarea = (value, campo) =>{
  if(value){
    document.getElementById(`txt-${campo}`).classList.remove('is-invalid');
    document.getElementById(`txt-${campo}`).classList.add('is-valid');
    campos[campo] = true;
  } else {
    document.getElementById(`txt-${campo}`).classList.add('is-invalid');
    document.getElementById(`txt-${campo}`).classList.remove('is-valid');
    campos[campo] = false;
  }
}
  // Función para validar campos de tipo inputs
const validarCampos = (value,campo) => {
  if(value){
    document.getElementById(`txt-${campo}`).classList.remove('is-invalid');
    document.getElementById(`txt-${campo}`).classList.add('is-valid');
    campos[campo] = true;
  } else {
    document.getElementById(`txt-${campo}`).classList.add('is-invalid');
    document.getElementById(`txt-${campo}`).classList.remove('is-valid');
    campos[campo] = false;
  }  
}
  // Función para validar campos de tipo fecha, asegurándose de que la fecha ingresada no sea anterior a la fecha actual
const validarCamposFecha = (value, campo) => {
  const fecha = new Date(value);  
  const fechaActual = new Date();  
  if (fecha && fecha > fechaActual) {
    document.getElementById(`txt-${campo}`).classList.remove('is-invalid');
    document.getElementById(`txt-${campo}`).classList.add('is-valid'); 
    campos[campo] = true;
  } else {
    // Añadir clase is-invalid y remover is-valid
    document.getElementById(`txt-${campo}`).classList.add('is-invalid');
    document.getElementById(`txt-${campo}`).classList.remove('is-valid');
    campos[campo] = false;
  }
}
// Asociar los eventos de validación a los inputs del formulario
inputs.forEach((input) => {
  input.addEventListener('blur', validarFormulario);
  input.addEventListener('keyup', validarFormulario);
});

// Asociar los eventos de validación a los textareas del formulario
textTarea.forEach((textarea) => {
  textarea.addEventListener('keyup', validarFormulario);
  textarea.addEventListener('blur', validarFormulario);
});

// Función para almacenar los datos de tareas en el localStorage
function storeDataLocalStorage() {
  localStorage.setItem("conjuntoTask", JSON.stringify(conjuntoTask));
}

// Función para agregar una nueva tarea al DOM
  function agregarTodoItem(task){
      const todoItemHTML = `
      <div id="TodoItem-${task.Id}" class="TodoItem">
        <div class="row align-items-center">
          <div class="col-10 col-sm-11 d-flex align-items-center">
            <input type="checkbox" id="task-${task.Id}" class="d-none" ${task.taskCompleted ? 'checked' : ''}>
            <label for="task-${task.Id}" class="d-flex align-items-center w-100">
              <span class="nuevo-checkbox"></span>
              <span class="w-100">
                <span class="txt-Title">${task.TitleTask}</span>
                <br>
                <span class="txt-Description">${task.DescriptionTask}</span>
                <span class="datetime">
                  <p id="taskDateTime" class="col-6 col-md-5">${task.LimitDate} ${task.LimitTime}</p>
                </span>
              </span>
            </label>
          </div>
          <div class="col-2 col-sm-1 text-end d-flex align-items-center">
            <button class="btnEliminarTask" data-id="${task.Id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    // Ocultar el mensaje de "Todavia no tienes tareas Pendientes" si es visible
    document.getElementById('NoPending').hidden = true;
    // Insertar la nueva tarea en el contenedor correspondiente
    document.getElementById('containerTodoItem').insertAdjacentHTML('beforeend', todoItemHTML);    
    // Asociar el evento de eliminar al botón de eliminar recién añadido
      setTimeout(() => {
        const deleteButton = document.querySelector(`#TodoItem-${task.Id} .btnEliminarTask`);
        if (deleteButton) {
          deleteButton.addEventListener('click', function() {
            eliminarTask(task.Id);
          });
        }
      }, 0);  
  }
// Función para guardar los datos de la nueva tarea
const guardarDatos = () => {
  const ObjTask = {
    Id: Date.now(),
    TitleTask: document.querySelector("#txt-TitleTask").value,
    DescriptionTask: document.querySelector("#txt-DescriptionTask").value,
    LimitDate: document.querySelector("#txt-LimitDate").value,
    LimitTime: document.querySelector("#txt-LimitTime").value,
    taskCompleted: false 
  };
  // Agregar la nueva tarea al array de tareas
  conjuntoTask = [...conjuntoTask, ObjTask];
  console.log(conjuntoTask);

  // Agregar la tarea al DOM
  agregarTodoItem(ObjTask);
  // Guardar las tareas en el localStorage
  storeDataLocalStorage();
};

// Función para eliminar una tarea
const eliminarTask = (taskId) => {
  // Filtrar la tarea eliminada del array de tareas  
  conjuntoTask = conjuntoTask.filter(task => task.Id !== taskId);
  // Remover el elemento correspondiente del DOM
  const taskElement = document.getElementById(`TodoItem-${taskId}`);  
  if (taskElement) {
    console.log("Elemento encontrado. Procediendo a eliminar...");
    taskElement.remove();
    //Mensaje tarea eliminada con exito
    Swal.fire({
      title:"Task deleted",          
      text: "The Task was deleted successfully.",
      icon: "success",      
      showConfirmButton: false,
      timer: 1500
    });
    console.log("Elemento eliminado correctamente.");
  }

  // Guardar las tareas actualizadas en el localStorage
  storeDataLocalStorage();

  // Mostrar el mensaje de "No hay pendientes" si no quedan tareas
  if (conjuntoTask.length === 0) {
    document.getElementById('NoPending').hidden = false;
  }
};

document.querySelectorAll(".btnEliminarTask").forEach(button => {
  // Evento de click del botón de elimar tarea
    button.addEventListener("click", function() {
        // Obteniendo el id de la tarea desde el atributo data-id
        const taskId = this.getAttribute("data-id");
        eliminarTask(taskId);
    });
});

//Función de marcado de tareas completadas
function CheckboxChange(e){
  // Verifica si el evento es un cambio en un checkbox cuyo id comienza con 'task-'
  if (e.target && e.target.type === 'checkbox' && e.target.id.startsWith('task-')) {
      // Extrae el ID de la tarea del atributo id del checkbox
      const taskId = e.target.id.replace('task-', '');
      // Busca la tarea en el array de tareas usando el ID extraído
      const task = conjuntoTask.find(t => t.Id == taskId);
      if (task) {
          // Actualiza el estado de 'taskCompleted' en la tarea según el estado del checkbox
          task.taskCompleted = e.target.checked;
          // Guarda los cambios en localStorage
          storeDataLocalStorage();
      }
  }
}

// Evento de submit del formulario en el botón de agregar tarea
formulario.addEventListener('submit', (e) => {
  // Prevenir la acción predeterminada del formulario
  e.preventDefault(); 
  // Verificar si todos los campos están validados
  if(campos.TitleTask &&
     campos.DescriptionTask &&
     campos.LimitDate && 
     campos.LimitTime
  ){
    // Guardar los datos de la nueva tarea
    guardarDatos(); 
    // Limpiar el formulario
    formulario.reset(); 
    // Restablecer los estilos de validación de los campos de tipo inputs
    inputs.forEach((input) => {
      document.getElementById(`txt-${input.name}`).classList.remove('is-valid', 'is-invalid');
    });
    // Restablecer los estilos de validación de los campos de tipo textTarea
    textTarea.forEach((textarea) => {
      document.getElementById(`txt-${textarea.name}`).classList.remove('is-valid', 'is-invalid');
    });
    // Reiniciar los campos de validación
    for (let campo in campos) {
      campos[campo] = false;
    } 
    // Cerrar el modal
    modal.hide();
    //Mensaje de guardado con exito
    Swal.fire({
       title:"Task saved successfully",          
       text: "Task saved successfully, now you can view it.",
       icon: "success",      
       showConfirmButton: false,
       timer: 1500
     });

  }else{
    //Mensaje de guardado sin exito
    Swal.fire({
       title:"Error saving task",          
       text: "Something went wrong, check the data entered.",
       icon: "error",      
       showConfirmButton: false,
       timer: 1500
     });
  }

});
});