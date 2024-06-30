const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const totalTarea = document.querySelector("#cuenta-total")
const tareasRealizadas= document.getElementById("cuenta-realizadas")
const listaDeTareas = document.querySelector("#listaDeTareas")
let tareas = [
    {
        id: 1,
        tarea: "lavar la ropa",
        estado: false
    },
    {
        id: 2,
        tarea: "limpiar la casa",
        estado: false
    }
]

btnAgregar.addEventListener("click", (evento) => {
    evento.preventDefault(); 
    const tarea = tareaInput.value.trim();
    if(tarea){
        const tareaNueva = { 
            id: nextId(), 
            tarea: tarea, 
            estado: false 
        }
        tareas.push(tareaNueva)
        tareaInput.value = ""
        actualizarEstado()
        renderList()
    }
})

function nextId() {
    let maxId = 0;
    tareas.forEach(tarea => {
        if (tarea.id > maxId) {
            maxId = tarea.id;
        }
    });
    return maxId + 1;
}

function renderList(){
    listaDeTareas.innerHTML = ''; 
    tareas.forEach(tarea => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.id = `tarea-${tarea.id}`; 
        nuevaFila.innerHTML = `
            <th scope="row">${tarea.id}</th>
            <td>${tarea.tarea}</td>
            <td><input type="checkbox" ${tarea.estado ? 'checked' : ''} onchange="checkRealizada(${tarea.id})"/></td>
            <td><button type="button" class="btn btn-danger" onclick="borrar(${tarea.id})">X</button></td>
        `;
        listaDeTareas.appendChild(nuevaFila);
    })
}

function actualizarEstado() {
    totalTarea.innerHTML = tareas.length;
    tareasRealizadas.innerHTML = tareas.filter(tarea => tarea.estado).length;
}

function borrar(id){
    tareas = tareas.filter((tarea) => tarea.id !== id)
    actualizarEstado();
    renderList();
}

function checkRealizada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.estado = !tarea.estado;
        actualizarEstado();

        const checkbox = document.querySelector(`#tarea-${id} input[type="checkbox"]`);
        checkbox.checked = tarea.estado; 
    }
}

actualizarEstado();
renderList();



