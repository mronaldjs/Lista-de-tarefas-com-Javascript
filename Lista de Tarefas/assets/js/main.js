const taskInput = document.querySelector('.taskInput');
const btnTask = document.querySelector('.btnTask')
const taskSpaceList = document.querySelector('.taskSpaceList')

// função criada especificamente para criar as tags <li> 
function addLi() {
    const li = document.createElement('li')
    li.setAttribute('class', 'listedTask')
    return li
}

function addIcon() {
    const i = document.createElement('i')
    i.setAttribute('class', 'fa-solid fa-trash-can')
    return i
}

function eraseInput() {
    taskInput.value = ''
    taskInput.focus()
}

// função principal de adicionar as tarefas
function addTask(taskInput) {
    const li = addLi()
    const i = addIcon()
    taskSpaceList.appendChild(li)
    li.innerText = taskInput
    li.appendChild(i)
    saveTask()
    eraseInput()
}

// adiciona um evento de captura da tecla enter
taskInput.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        if (!taskInput.value) return;
        addTask(taskInput.value)
    } 
})

// adiciona um evento de captura do click no botão de adicionar tarefas
btnTask.addEventListener('click', function(e){
    if (!taskInput.value) return;
    addTask(taskInput.value)
})

document.addEventListener('click', function(e){
    const el = e.target
    if (el.classList.contains('fa-trash-can')){
        el.parentElement.remove()
        saveTask()
    }
})

function saveTask(){
    const taskLi = taskSpaceList.querySelectorAll('li');
    const taskList = [];
    for (let task of taskLi) {
        let textTaskLi = task.innerText
        taskList.push(textTaskLi)
    }
    
    const tarefasJSON = JSON.stringify(taskList)
    localStorage.setItem('taskSpaceList', tarefasJSON)
}


function addSavedTask() {
    if(!localStorage.getItem('taskSpaceList')) return;
    const taskSpaceList = localStorage.getItem('taskSpaceList');
    const taskList = JSON.parse(taskSpaceList)

    for (let task of taskList) {
        addTask(task)
    }
}

addSavedTask()