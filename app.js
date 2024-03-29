// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks); // triggers when DOM is loaded
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS (local storage)
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){ // if no storage so far create a new array
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // grabs from storage and parses string back into an array
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){ // if no storage so far create a new array
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // grabs from storage and parses string back into an array
    }

    tasks.push(task); // adds task to array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // can only store strings in local storage so make sure to use stringify
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); // pass in the li element
        }
    }
}

// Remove from LS (local storage)
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){ // if no storage so far create a new array
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // grabs from storage and parses string back into an array
    }

    tasks.forEach(function(task, index){ // loops through array grabbing both the task and its index
        if(taskItem.textContent === task){ // checks if text content of li matches any task currently in the array in local storage
            tasks.splice(index, 1); // if so, remove the task at the index in the array
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); // put updated task list back in local storage
}

// Clear Task
function clearTasks(){
    taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase(); // grabs what is typed in

                                                           // grabs all task items, returns node list
    document.querySelectorAll('.collection-item').forEach  // and loops through each task item in list
    ( 
        function(task){
            const item = task.firstChild.textContent; // grabs text content of each list item
            if(item.toLowerCase().indexOf(text) != -1){ // checks if the filter input is a substring of any of the task items
                task.style.display = 'block'; // show those tasks where there is a substring match
            }
            else {
                task.style.display = 'none'; // hide if no substring match
            }
        }
    ); 

    // we can use a loop on a node list!
    // if we had used .elementsByClass that would have returned an html collection, and then we'd
    // have to convert that to an array first before using a loop
}