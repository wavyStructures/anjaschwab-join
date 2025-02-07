let tempAssignedContacts = [];
let tempPriority = '';
let tempSubtasks = [];
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
    'id': 999,
    'type': '',
    'title': '',
    'description': '',
    'subtasks': [],
    'assigned_to': [],
    'category': 'category-0',
    'priority': '',
    'dueDate': '',
    'task_type': ''
};


/**
 * Adds a new subtask to the list of tasks.
 */
function addSubtask() {
    let subtaskInputField = document.getElementById('subtaskInputField');
    if (subtaskInputField.value != '') {

        newTask.subtasks.push({
            'id': newTask.subtasks.length,
            'subtaskText': subtaskInputField.value,
            'completed': false
        })
    }
    renderSubtasks();
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
    renderSubtasks();
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
    renderSubtasks();
}


/**
 * Fetches information for a new card by setting values for id, type, title, description, assigned_to, category, priority, and due date of a new task.
 */
function collectInformationsForNewCard() {
    if (!checkIfCardIsEditing()) {
        newTask.id = getNewTaskId();
    }
    // console.log('newTask.id:', newTask);
    // console.log('tempAssignedContacts:', tempAssignedContacts);

    newTask.title = document.getElementById('addTaskEnterTitleInput').value;
    newTask.description = document.getElementById('addTaskDescriptionInput').value;
    newTask.assigned_to = tempAssignedContacts;
    newTask.dueDate = document.getElementById('addTaskDueDateInput').value;
    // if (newtask.task_type === '') newtask.task_type = 'User Story';
    if (!newTask.task_type) newTask.task_type = 'user_story';
}


/**
 * Clears the form by resetting the values of the `newTask` object, the `tempAssignedContacts` array,
 * and renders the add task form HTML.
 */
function clearFormular() {
    newTask.id = 999;
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
    await loadTasksFromRemoteStorage();
    collectInformationsForNewCard();

    const response = await saveTasksToRemoteStorage(newTask);
    // renderCategories(tasks);

    showSuccessMessage();
    resetNewTask();
    switchPage('board.html');
}


/**
 * Resets the `newTask` object to its initial state and clears the `tempAssignedContacts` array.
 */
function resetNewTask() {
    newTask =
    {
        'id': 999,
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
    deactivateButton('createBtn');

    try {
        let method, url;

        if (task && task.id) {
            method = 'PUT';
            url = `${BASE_URL}tasks/${task.id}/`;
        } else {
            method = 'POST';
            url = `${BASE_URL}tasks/`;
        }

        const assignedToIds = Array.isArray(task.assigned_to) ? task.assigned_to : [];

        const taskData = {
            ...task,
            assigned_to: assignedToIds
        };

        // console.log("Sending task data:", taskData);

        const body = taskData;

        // console.log("Task data before sending:", body);
        // console.log("Type of body:", typeof body);

        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to ${method === 'POST' ? 'create' : 'update'} task. Response:`, errorText);
            throw new Error(`Backend error: ${errorText}`);
        }

        const data = await response.json();
        console.log(`Task ${method === 'POST' ? 'created' : 'updated'} successfully:`, data);

    } catch (error) {
        console.error('Error saving task:', error);
    } finally {
        activateButton('createBtn', 'createTask()');
    }
}


/**
* Loads tasks from remote storage and updates task properties if necessary.
*
*/
async function loadTasksFromRemoteStorage() {
    try {
        const response = await fetch(`${BASE_URL}tasks/user/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            alert('You are not authorized. Please log in.');
            window.location.href = '/login';
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tasks = await response.json();

        tasks.forEach(task => {
            if (!task.hasOwnProperty('subtasks')) task.subtasks = [];
            if (!task.hasOwnProperty('assigned_to')) task.assigned_to = [];
        });

        console.log('tasks from backend:', tasks);

        return tasks;
    } catch (error) {
        console.error("Loading error:", error);
        return [];
    }
}


/**
 * Assigns a contact to a task based on the provided id.
*
* @param {number} id - The id of the task to assign the contact to.
*/
function assignContactToTask(id) {
    console.log("Available contacts:", contacts);
    console.log("Trying to assign contact with ID:", id);


    if (contacts.find(contact => contact.id == id)) {
        console.log('contacts in addTask_tasks assignCONTATCT:', contacts);

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
        console.log('tempAssignedContacts in PUSH             :', tempAssignedContacts);
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