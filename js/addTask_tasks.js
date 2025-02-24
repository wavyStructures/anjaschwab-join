let tempAssignedContacts = [];
let tempPriority = '';
// let tempSubtasks = [];
let isValid = false;
let requiredInputFields = [
    {
        'id': 'addTaskEnterTitleInput',
        'requiredFieldId': 'requiredTitle',
        'idForRedUnderline': 'addTaskEnterTitleInput',
        'state': false
    },
    {
        'id': 'addTaskDueDateInput',
        'requiredFieldId': 'requiredDueDate',
        'idForRedUnderline': 'addTaskDueDateInputContainer',
        'state': false
    }
];

let newTask =
{
    'id': undefined,
    'type': '',
    'title': '',
    'description': '',
    'subtasks': [],
    'assigned_to': [],
    'category': 'category-0',
    'priority': '',
    'due_date': '',
    'task_type': ''
};


/**
 * Adds a new subtask to the list of tasks.
 */
function addSubtask(subtaskInput) {
    if (subtaskInput != '') {

        newTask.subtasks.push({
            'id': newTask.subtasks.length,
            'subtaskText': subtaskInput,
            'completed': false
        })
    }

    renderSubtasksList(newTask);
}


/**
 * Updates the HTML content of a subtask container with the HTML code for editing the subtask.
 *
 * @param {number} id - The ID of the subtask to be edited.
 */
function editSubtask(id) {
    if (checkIfAnySubtaskIsInEditingMode()) {
        return;
    }
    let subtaskContainer = document.getElementById('subtask' + id);
    let subtask = newTask.subtasks.find(subtask => subtask.id == id);
    subtaskContainer.classList.add("editing")
    subtaskContainer.innerHTML = editSubtaskHTML(subtask);
}


/**
 * Updates the subtask text based on the provided ID.
 *
 * @param {number} id - The ID of the subtask to be updated.
 */
function saveEditSubtask(id) {
    let newText = document.getElementById('subtaskEditInputField');

    newTask.subtasks.forEach(subtask => {
        if (subtask.id == id) {
            subtask.subtaskText = newText.value;
        }
    })
    renderSubtasksList();
}


/**
 * Deletes a subtask from the `newTask.subtasks` array based on the provided `subtaskId`.
 *
 * @param {number} subtaskId - The ID of the subtask to be deleted.
 */
function deleteSubtask(subtaskId) {
    newTask.subtasks.forEach((subtask, index) => {
        if (subtask.id == subtaskId) {
            newTask.subtasks.splice(index, 1);
        }
    })
    renderSubtasksList();
}


/**
 * Fetches information for a new card by setting values for id, type, title, description, assigned_to, category, priority, and due date of a new task.
 */
async function collectInformationsForNewCard() {
    // let newTask = {};

    if (!checkIfCardIsEditing()) {
        newTask.id = getNewTaskId();
    }
    newTask.title = document.getElementById('addTaskEnterTitleInput').value;
    newTask.description = document.getElementById('addTaskDescriptionInput').value;
    newTask.assigned_to = tempAssignedContacts;

    let dateInput = document.getElementById('addTaskDueDateInput').value;
    if (dateInput) {
        let dateObj = new Date(dateInput);
        newTask.due_date = dateObj.toISOString().split('T')[0];
    }

    newTask.task_type = selectedTaskType || 'user_story';
    return Promise.resolve(newTask);
}


/**
 * Clears the form by resetting the values of the `newTask` object, the `tempAssignedContacts` array,
 * and renders the add task form HTML.
 */
function clearFormular() {
    newTask.id = undefined;
    newTask.subtasks = [];
    tempAssignedContacts = [];
    renderAddTaskHTML();
}


/**
 * Function to create a new task.
 *
 * @return {Promise<void>} A Promise that resolves once the task is created.
 */
async function createTask() {
    let tasks = await loadTasksFromRemoteStorage();
    const newTaskData = await collectInformationsForNewCard();

    if (!newTaskData) { console.error("no new task"); return; }

    const createdTask = await saveTasksToRemoteStorage(newTaskData);
    if (createdTask) {
        tasks.push(newTaskData);
    }

    showSuccessMessage();
    resetNewTask();
    await loadTasksFromRemoteStorage();
    switchPage('board.html');
}


/**
 * Resets the `newTask` object to its initial state and clears the `tempAssignedContacts` array.
 */
function resetNewTask() {
    newTask =
    {
        'id': '',
        'type': '',
        'title': '',
        'description': '',
        'subtasks': [],
        'assigned_to': [],
        'category': 'category-0',
        'priority': '',
        'dueDate': ''
    };
    tempAssignedContacts = [];
}


/**
* Saves tasks to the remote storage.
*
*/
async function saveTasksToRemoteStorage(task = null) {
    console.log('Saving task at START of saveTaskToRemoteSotrage:', task);
    deactivateButton('createBtn');

    try {
        const newTask = task || newTask;
        if (newTask.id === 0) {
            newTask.id = undefined;
        }
        if (!newTask.title || newTask.title.trim() === '') {
            console.error('Title is required!');
            alert('Title is required!');
            return;
        }

        const url = newTask.id ? `http://127.0.0.1:8000/tasks/${newTask.id}/` : 'http://127.0.0.1:8000/tasks/';
        const method = newTask.id ? 'PUT' : 'POST';

        const taskData = {
            ...newTask,
            assigned_to: Array.isArray(newTask.assigned_to) ? newTask.assigned_to : [],
            subtasks: newTask.subtasks || [],
            due_date: newTask.due_date || null
        };

        console.log("BEFOE REQUEST      Resolved task ID:", newTask.id);
        console.log("BEFOE REQUEST      Request URL:", url);

        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to ${method === 'POST' ? 'create' : 'update'} task. Response:`, errorText);
            throw new Error(`Backend error: ${errorText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error saving task:', error);
    } finally {
        activateButton('createBtn', 'createTask()');
    }
}


/**
 * Loads tasks from remote storage and updates task properties if necessary.
 *
 * @return {Promise<Array>} A promise that resolves to an array of tasks.
 */
async function loadTasksFromRemoteStorage() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("No authentication token found!");
        const response = await fetch(`${BASE_URL}tasks/user/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorDetails = await response.text();  // For more detailed error info from the server
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tasks = await response.json();

        if (!Array.isArray(tasks)) throw new Error("Tasks is not an array");

        return tasks;
    } catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}


/**
 * Assigns a contact to a task based on the provided id.
*
* @param {number} id - The id of the task to assign the contact to.
*/
function assignContactToTask(id) {
    if (contacts.find(contact => contact.id == id)) {

        let dropdownContact = document.getElementById('assignedToContact' + id);
        let dropdownCheckboxImage = dropdownContact.lastElementChild;

        setDropdownContactAppearance(dropdownContact, dropdownCheckboxImage);
        toggleAssignedContactsContainer();
        pushContactToTempAssignedContacts(id);
        renderAssignedContactsContainer();
    }
}


/**
 * Pushes the given ID to the temporary assigned contacts array if it is not already present.
 * If the ID is already present, it removes it from the array.
 *
 * @param {number} id - The ID to be pushed or removed from the temporary assigned contacts array.
 */
function pushContactToTempAssignedContacts(id) {
    if (tempAssignedContacts.indexOf(id) == -1) {
        tempAssignedContacts.push(id)
    } else {
        tempAssignedContacts.splice(tempAssignedContacts.indexOf(id), 1)
    }
}


/**
 * Retrieves the new task ID based on the length of the tasks array.
 *
 * @return {number} The new task ID.
 */
function getNewTaskId() {
    let freeId = findFreeId(tasks);
    return freeId;
}


/**
 * Sets the priority for a new card.
 *
 * @param {string} priority - The priority level of the new card.
 */
function setPriorityForNewCard(priority) {
    newTask.priority = priority;
}


/**
 * Toggles the required message based on the state of the required input field.
 *
 * @param {Object} requiredInputField - The required input field object containing necessary ids and state.
 */
function toggleRequiredMessage(requiredInputField) {
    let requiredMessageField = document.getElementById(requiredInputField.requiredFieldId);
    let toUnderline = document.getElementById(requiredInputField.idForRedUnderline);

    if (getStateOfRequriredField(requiredInputField)) {
        requiredInputField.state = true;
        toUnderline.classList.remove('is-invalid');
        requiredMessageField.innerHTML = "";
    } else {
        requiredInputField.state = false;
        toUnderline.classList.add('is-invalid');
        requiredMessageField.innerHTML = "This field is requried";
    }
    setCreateBtnState();
}