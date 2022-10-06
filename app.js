// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
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
    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Task
function clearTasks(){
    taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
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