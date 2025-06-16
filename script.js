document.addEventListener('DOMContentLoaded', () => {
    console.log("let's start")

    const addButton = document.getElementById("add-task-btn")
    const taskList = document.getElementById("task-list")
    const taskInput = document.getElementById("task-input")

    // loading existing tasks
    
 

    // -------- Local Storage Functions --------  //
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }
    loadTasks();
    
    function saveTaskToLocalStorage(taskText){
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (!storedTasks.includes(taskText)) {
            storedTasks.push(taskText)
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    };
    
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));    
    };
    
    // -------- Adding Task --------  //
    function addTask(taskText, save = true) {
        if (save) {
            taskText = taskInput.value.trim()
        }
        
        if (taskText === "") {
            alert("enter a task")
            console.log("This is empty list")
            return
        } 
        // Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement("li")
        listItem.textContent = taskText
        
        // Create remove button
        const removeButton = document.createElement('button')
        removeButton.classList.add("remove-btn")
        removeButton.textContent = "Remove"
        
        // add remove button to the list
        listItem.appendChild(removeButton)
        
        // delete remove button when clicked
        removeButton.addEventListener("click", () => {
            taskList.removeChild(listItem)
            removeTaskFromStorage(taskText)
        })
        
        // add the task to the task list
        taskList.appendChild(listItem)

        // clear task input field
        taskInput.value = ""

        if (save) {
            saveTaskToLocalStorage(taskText)
        }
    }

    // adding the task text to list
    addButton.addEventListener("click", () => {
        addTask()
    })
    
    // using Enter on keyboard to add to list
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const taskText = taskInput.value
            addTask(taskText)
        }
    })
})