function addTask(category){
    console.log("Task added to:", category);
    console.log("Add function to addTask-Buttons");
}


/**
 * Updates the priority styling for the task buttons based on the selected priority.
 *
 * @param {string} priority - The selected priority ('Urgent', 'Medium', or 'Low').
 */
function setPriority(priority) {
    document.querySelectorAll('.addTaskPriorityButton').forEach(button => {
        button.style.backgroundColor = 'white';
        button.classList.remove('active');
        button.querySelector('.priorityButtonText').style.color = 'black';
        button.querySelector('img').src = `./assets/img/icon-priority_${button.id.toLowerCase().slice(21)}.png`;
    });
    
    const button = document.getElementById(`addTaskPriorityButton${priority}`);
    button.style.backgroundColor = getButtonColor(priority);
    button.classList.add('active');
    button.querySelector('.priorityButtonText').style.color = 'white';
    button.querySelector('img').src = `./assets/img/icon-priority_${priority.toLowerCase()}_white.png`;
}


/**
 * Returns the background color for a given priority level.
 *
 * @param {string} priority - The priority level ('Urgent', 'Medium', or 'Low').
 * @return {string} The corresponding background color ('red', 'orange', 'green', or 'white').
 */
function getButtonColor(priority) {
    switch (priority) {
        case 'Urgent':
            return '#ff3d00';
        case 'Medium':
            return '#ffa800';
        case 'Low':
            return '#7ae229';
        default:
            return 'white';
    }
}
