document.addEventListener('DOMContentLoaded', () => {
    console.log("let's start")

    const addButton = document.getElementById("add-task-btn")
    const taskList = document.getElementById("task-list")
    const taskInput = document.getElementById("task-input")

    const addTask = () => {
        const taskText = taskInput.value.trim()
        if (taskText === "") {
            alert("enter a task")
            return
        } 
        // Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement("li")
        listItem.textContent = taskText
        
        // Create remove button
        const removeButton = document.createElement('Button')
        removeButton.classList.add("remove-btn")
        removeButton.textContent = "remove"
        
        // add remove button to the list
        listItem.appendChild(removeButton)
        
        // delete remove button when clicked
        removeButton.addEventListener("click", () => {
            taskList.removeChild(listItem)
        })
        
        // add the task to the task list
        taskList.appendChild(listItem)

        // clear task input field
        taskInput.value = ""
    }
    
    addButton.addEventListener("click", () => {
        addTask() 
    })
})