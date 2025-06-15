document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // If task is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Add event listener to remove the task when remove button is clicked
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        // Append the remove button to the li
        listItem.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks));  // Save the updated array to Local Storage
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    // Event listener to add task when pressing "Enter"
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);
        }
    });

    // Load existing tasks from Local Storage when the page loads
    loadTasks();
});
