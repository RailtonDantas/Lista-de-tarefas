const buttonAddTask = document.querySelector("#btn-add-task")
const allTasks = document.querySelector("ul")

if(localStorage.getItem("allTasksInLocalStorage")){
    let tasksOfLocalStorage = localStorage.getItem("allTasksInLocalStorage").split(",").length
    if(tasksOfLocalStorage > 0){
    recoveringTasksOfLocalStorage()
    }
}

buttonAddTask.addEventListener("click", () => {

    const inputTask = document.querySelector("#input-add-task")
    const currentTask = inputTask.value 
    if(!currentTask.match(/[a-z]|[A-z]/)) return;
    
    const liOfTask = createElementsOfCurrentTask('li')
    const paragraphOfTask = createElementsOfCurrentTask('p')
    const deleteButton = createElementsOfCurrentTask('button')

    insertTasksInLocalStorage(currentTask)
    const readyElement = joinElementsOfCurrentTask(liOfTask,paragraphOfTask,deleteButton,currentTask)

    allTasks.appendChild(readyElement)
    inputTask.value = ""
    
})


function createElementsOfCurrentTask(element){
    return document.createElement(element)
}
function joinElementsOfCurrentTask(li,p,button,task){
    p.textContent = task
    button.textContent = 'Apagar'
    button.classList.add("button-delete-task")
    li.appendChild(p)
    li.appendChild(button)
    
    return li
}
function insertTasksInLocalStorage(currentTask){
    let tasksInLocalStorage;
    if(localStorage.getItem("allTasksInLocalStorage")){
        tasksInLocalStorage = [...localStorage.getItem("allTasksInLocalStorage").split(",")]
    }
    else{
        tasksInLocalStorage = []
    }
    tasksInLocalStorage.push(currentTask)
    localStorage.setItem("allTasksInLocalStorage", tasksInLocalStorage)
}

document.body.addEventListener("click", (e) => {
    let deleteBtn = e.target
    if(deleteBtn.classList.contains("button-delete-task")){

        let value = deleteBtn.parentNode.querySelector("p").innerText

        searchKeyInLocalStorage(value)
        
        allTasks.removeChild(deleteBtn.parentNode)
    }
})

function recoveringTasksOfLocalStorage(){
    let arrayOfTasks = localStorage.getItem("allTasksInLocalStorage").split(",")
    for(let c = 0; c < arrayOfTasks.length; c++){
        let currentTask = arrayOfTasks[c]
        let currentLi = createElementsOfCurrentTask('li')
        let currentP = createElementsOfCurrentTask("p")
        let currentButtonDelete = createElementsOfCurrentTask("button")

        let recoveringCurrentTask = joinElementsOfCurrentTask(currentLi,currentP,currentButtonDelete,currentTask)
        allTasks.appendChild(recoveringCurrentTask)
}
}
function searchKeyInLocalStorage(value){
    let arrayOfTasks = localStorage.getItem("allTasksInLocalStorage").split(",")
    let indexOfTaskToBeDeleted = arrayOfTasks.indexOf(value)
    arrayOfTasks.splice(indexOfTaskToBeDeleted,1)
    localStorage.setItem("allTasksInLocalStorage",arrayOfTasks)
}