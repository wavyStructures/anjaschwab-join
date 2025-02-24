/**
 * Sets the droppable containers for a given task ID based on its category.
 *
 * @param {string} taskId - The ID of the task element.
 */
function setDroppableContainers(taskId) {
    let category = getTaskOutOfId(taskId)['category'].slice(-1)
    for (let i = 0; i < 4; i++) {
        if (i != category) {
            displayEmptyTask(taskId, i);
        }
    }
}


/**
 * Starts the dragging process for a task.
 *
 * @param {string} taskId - The ID of the task element being dragged.
 */
function startDragging(taskId) {
    console.log("Dragging started for task ID:", taskId);

    currentDraggedElement = taskId;
    document.getElementById(taskId).classList.add('dragging');
    setDroppableContainers(taskId)
}


/**
 * Stops the dragging process by removing the 'drag-area-highlight' class from all categories
 * and the 'dragging' class from all tasks.
 */
function stopDragging() {
    categories.forEach(category => {
        let categoryElement = document.getElementById(Object.keys(category)[0]);
        // document.getElementById(Object.keys(category)[0]).classList.remove('drag-area-highlight');
        if (!categoryElement) {
            console.warn('Category element not found, this is Object.keys(category)[0]:', Object.keys(category)[0]);
            return;
        }
        categoryElement.classList.remove('drag-area-highlight');

    });

    if (currentDraggedElement) {
        let taskElement = document.getElementById(currentDraggedElement);
        if (taskElement) {
            console.log(`Removing dragging class from task with ID: ${currentDraggedElement}`);
            taskElement.classList.remove('dragging');
        } else {
            console.warn("Task element not found:", currentDraggedElement);
        }
    }
}


/**
 * Prevents the default behavior of the event, which is to allow the browser to handle the drag and drop operation.
 *
 * @param {Event} event - The event object representing the drag and drop event.
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * Moves a task to a specified category.
 *
 * @param {string} category - The category to move the task to.
 */
async function moveTo(category) {
    let task = getTaskOutOfId(currentDraggedElement);

    // Update the task's category
    task['category'] = category;
    console.log("AFTER    Rendering task with ID:", task.id, "to category:", category);
    console.log("task is:", task);
    console.log("ALL TASKS ARE:", tasks);

    renderCategories(tasks);
}