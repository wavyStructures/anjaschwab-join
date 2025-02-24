let tasks = [];

let currentDraggedElement;

let categories = [
    { 'category-0': "To do" },
    { 'category-1': "In progress" },
    { 'category-2': "Await Feedback" },
    { 'category-3': "Done" }
];


/**
 * Initializes the board by including HTML, loading contacts and tasks from remote storage,
 * and rendering the categories.
 */
async function boardInit() {
    includeHTML();
    contacts = await getContactsFromRemoteStorage();
    tasks = await loadTasksFromRemoteStorage();
    if (!tasks.length) console.warn("No tasks loaded.");

    users = await loadUsers();
    renderCategories(tasks);
}


/**
 * Renders the cards inside each category based on the tasks provided.
 *
 * @param {Array} arrayToSearchIn - The array of tasks to search through.
 */
function renderCategories(arrayToSearchIn) {
    categories.forEach(category => {
        let categoryContainer = document.getElementById(Object.keys(category)[0]);

        categoryContainer.innerHTML = "";
        let filteredTasks = filterTasks(arrayToSearchIn, Object.keys(category)[0]);

        if (filteredTasks.length != 0) {
            for (let j = 0; j < filteredTasks.length; j++) {
                let task = getTaskOutOfId(filteredTasks[j].id);
                categoryContainer.innerHTML += renderTasksHTML(task);
                setCardType(task);
                renderTaskDescription(task)
                renderSubtask(task);
                renderAssignedToButtons(task);
            }
        } else {
            renderEmptyCategory(categoryContainer, Object.values(category)[0]);
        }
    });
}


/**
* Renders the task description by splitting it into words and limiting the length of each word to 46 characters.
* If the description is longer than the limit, it adds an ellipsis at the end.
*
* @param {Object} task - The task object containing the description to be rendered.
* @return {void} This function does not return anything.
*/
function renderTaskDescription(task) {
    let descriptionContainer = document.getElementById('cardText' + task['id']);
    let cardText = "";
    let taskDescriptionSplitted = task.description.split(' ');

    taskDescriptionSplitted.forEach((word) => {
        if (cardText.length + word.length <= 46) cardText = cardText + " " + word;
    })

    cardText = cardText.substring(1);

    if (cardText.length != task.description.length) cardText = cardText + " ...";

    descriptionContainer.innerHTML = cardText;
}


/**
 * Filters an array of tasks based on a specified category.
 *
 * @param {Array} arrayToSearchIn - The array of tasks to search through.
 * @param {string} category - The category to filter the tasks by.
 * @return {Array} An array of tasks that match the specified category.
 */
function filterTasks(arrayToSearchIn, category) {
    let filteredTasks = [];

    if (Array.isArray(arrayToSearchIn)) {



        arrayToSearchIn.forEach((task) => {
            if (task['category'] == category) {
                filteredTasks.push(task);
            }
        });
    } else {
        console.error('Expected an array, but got:', arrayToSearchIn);
    }

    return filteredTasks;
}


/**
 * Renders the icons with the initials of the user's name on each card.
 *
 * @param {object} card - The card object containing information about the card
 */
function renderAssignedToButtons(task) {
    let assignedToContainer = document.getElementById('cardAssignedToContainerId' + task['id']);
    if (!assignedToContainer) {
        console.warn('Container not found for ID:', 'cardAssignedToContainerId' + task['id']);
        return;
    }

    let assignedToUsers = task['assigned_to'];
    if (!Array.isArray(assignedToUsers) || assignedToUsers.length === 0) {
        console.warn('No assigned users found.');
        return;
    }

    for (let i = 0; i < assignedToUsers.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (String(contacts[j]['id']) === String(assignedToUsers[i])) {
                assignedToContainer.innerHTML += renderAssignedToButtonsHTML(contacts[j]);
            }
        }
    }
}


/**
 * Generates the HTML code for a contact's profile badge to be displayed in the assigned to section of a card.
 *
 * @param {object} users - The contact object containing information about the user, such as their color and username
 * @return {string} The HTML code for the contact's profile badge
 */
function renderAssignedToButtonsHTML(users) {
    return /*html*/ `<div class="profile-badge-group" style="background-color: ${users.contactColor
        }">${getInitials(users.username)}</div>`;
}


/**
 * Renders the "No tasks X" message in the category container if there are no tasks in that category.
 *
 * @param {HTMLElement} categoryContainer - The container element of the category where the message should be rendered.
 * @param {string} name - The name of the category where the message should be rendered.
 */
function renderEmptyCategory(categoryContainer, name) {
    categoryContainer.innerHTML = renderEmptyCategoryHTML(name);
}


/**
 * 
 * @param {string} taskPriority 
 * @returns html-image-tag
 */
function setPriorityImage(taskPriority) {
    if (taskPriority == 'low') return `<img src="assets/img/icon-priority_low.png">`
    else if (taskPriority == 'medium') return `<img src="assets/img/icon-priority_medium.png">`
    else return `<img src="assets/img/icon-priority_urgent.png">`
}


/**
 * Searches for tasks based on the value of the search input.
 *
 */
function searchTask() {
    let searchInput = document.getElementById('findTask');
    if (searchInput == null) return;
    let foundTasks = tasks.filter(task => task['title'].toLowerCase().includes(searchInput.value) || task['description'].toLowerCase().includes(searchInput.value));
    renderCategories(foundTasks);
}


/**
 * Renders a subtask progress bar and text based on the number of completed subtasks in a task.
 *
 * @param {object} task - The task object containing subtasks.
 * @return {string} The HTML code for the subtask progress bar and text.
 */
function renderSubtask(task) {
    let subtaskContainer = document.getElementById('cardSubtask' + task['id']);

    let subtasks = task['subtasks'] || [];
    let countSubtasks = subtasks.length;
    let completedSubtasks = subtasks.filter(subtask => subtask['completed'] == true).length;
    let completedPercent = completedSubtasks * 100 / countSubtasks;

    if (countSubtasks != 0) {
        subtaskContainer.innerHTML = /*html*/`<progress id="progressTodo" value="${completedPercent}" max="100"></progress><div class="cardSubtasksText">${completedSubtasks}/${countSubtasks} Subtasks</div>`
    } else {
        subtaskContainer.remove();
    }
}


/**
 * Returns the task object with the specified taskId from the tasks array.
 *
 * @param {number} taskId - The ID of the task to retrieve.
 * @return {Object|undefined} The task object with the specified taskId, or undefined if no task is found.
 */
function getTaskOutOfId(taskId) {
    return tasks.filter(task => task['id'] == taskId)[0]
}


/**
 * Sets the card type based on the task type.
 *
 * @param {Object} task - The task object containing the type and id.
 * @return {void} This function does not return a value.
 */
function setCardType(task) {
    if (!task || !task.task_type) return;

    let cardType = document.getElementById(`cardType${task['id']}`);
    let openCardType = document.getElementById(`openCardType${task['id']}`);

    if (!cardType) return;

    let taskType = task.task_type.toLowerCase();

    if (taskType === "user_story") {
        cardType.classList.add("cardTypeUserStory");
        if (openCardType) openCardType.classList.add("cardTypeUserStory");

    } else if (taskType === "technical_task") {
        cardType.classList.add('cardTypeTechnicalTask');
        if (openCardType) openCardType.classList.add("cardTypeTechnicalTask");
    }
}


/**
 * Formats the task type string by replacing underscores with spaces 
 * and capitalizing the first letter of each word.
 *
 * @param {string} task_type - The task type string to format.
 * @return {string} The formatted task type string.
 */

function formatTaskType(task_type) {
    if (!task_type) return "";
    return task_type
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}


/**
 * Renders subtasks to the open card based on the task object.
 *
 * @param {object} task - The task object containing subtasks to render.
 */
function renderSubtasksListToOpenCard(task) {
    let container = document.getElementById('openCardSubtasksContainer');
    container.innerHTML = /*html*/`<span class="openCardText">Subtasks:</span><div id="openCardSubtasks"></div>`
    container.classList.add("openCardSubtasksContainer");
    let content = document.getElementById('openCardSubtasks');

    content.innerHTML = '';
    task['subtasks'].forEach((subtask, index) => {
        let completed = subtask['completed'] ? 'completed' : '';

        content.innerHTML += /*html*/`
        <div class="openCardSubtask" ${completed}>
            <div class="openCardSubtaskImgContainer" onclick="setSubtaskState(${task.id}, ${index})"></div>
            ${subtask['subtaskText']}
        </div>`
    })
}


/**
 * Toggles the completion state of a subtask in a task.
 * Also setting the attribute "completed" on the subtask element so the css can handle the image.
 *
 * @param {number} taskId - The ID of the task containing the subtask.
 * @param {number} subtaskIndex - The index of the subtask in the task's subtasks array.
 */
function setSubtaskState(taskId, subtaskIndex) {
    let task = getTaskOutOfId(taskId);
    task['subtasks'][subtaskIndex]['completed'] = !task['subtasks'][subtaskIndex]['completed'];
    let openCardSubtasks = document.getElementsByClassName('openCardSubtask');

    for (let i = 0; i < openCardSubtasks.length; i++) {
        if (i == subtaskIndex) {
            openCardSubtasks[i].getAttribute('completed') == null
                ? openCardSubtasks[i].setAttribute('completed', '')
                : openCardSubtasks[i].removeAttribute('completed')
        }
    }
}


/**
 * Deletes a task from the tasks array based on the provided taskId.
 *2
 * @param {number} taskId - The ID of the task to be deleted.
 */
async function openCardDelete(taskId) {

    const response = await fetch(`${BASE_URL}tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                tasks = tasks.filter(task => task.id != taskId);

                closeCard();
                renderCategories(tasks);
            } else { console.log('failed to delete task') }
        })
        .catch(error => console.error('Error:', error));
}


/**
 * Opens the edit card for the task with the specified ID.
 *
 * @param {number} taskId - The ID of the task to edit.
 */
function openCardEdit(taskId) {
    newTask = getTaskOutOfId(taskId);
    renderEditContainer();
    renderContactsToDropdown();
    renderAssignedContactsContainer();
    renderSubtasksList();
    setTaskValuesToFields(newTask);
}


/**
 * Renders the edit container by setting the 'editing' attribute, updating the HTML content of the 'openCardContainer' element, and appending the HTML code for the edit header, main content, and footer.
 */
function renderEditContainer() {
    let container = document.getElementById('openCardContainer');
    container.setAttribute('editing', '');
    container.innerHTML = createEditHeader();
    container.innerHTML += renderAddTaskMainContentHTML();
    container.innerHTML += createEditFooter(newTask);
}


/**
 * Sets the values of the task fields in the edit card container.
 */
function setTaskValuesToFields(newTask) {
    tempAssignedContacts = [];
    document.getElementById('addTaskEnterTitleInput').value = newTask['title'];
    document.getElementById('addTaskDescriptionInput').value = newTask['description'];
    document.getElementById('addTaskDueDateInput').value = newTask['due_date'];

    const taskType = newTask['task_type'] || 'Select task category';
    document.getElementById('dropdown-category-title').innerHTML = taskType;

    setPriorityAppearance(newTask['priority']);
    renderEditCardAssignedContacts();
}


/**
 * Renders the assigned contacts in the edit card container.
 *
 * This function clears the contents of the 'assignedContactsContainer' element and then iterates over the 'assigned_to' array of the 'newTask' object. For each 'id' in the array, it calls the 'assignContactToTask' function to assign the corresponding contact to the task.
 */
function renderEditCardAssignedContacts() {
    document.getElementById('assignedContactsContainer').innerHTML = '';
    newTask['assigned_to'].forEach(id => {
        assignContactToTask(id);
    })
}


/**
 * Saves the edited task by collecting the necessary information, updating the task object,
 * saving the tasks to remote storage, closing the card, printing a confirmation message,
 * and printing the category values from each card.
 *
 * @param {number} taskId - The ID of the task to be saved.
 */
function saveEditedTask(taskId) {
    collectInformationsForNewCard();
    let taskToSave = getTaskOutOfId(taskId);
    taskToSave = newTask;
    saveTasksToRemoteStorage(taskToSave);
    closeCard();
}


/**
 * Generates the HTML code for the header of the edit task section.
 *
 * @return {string} The HTML code for the edit task header.
 */
function createEditHeader() {
    return /*html*/`
<div class="boardEditTaskHeader">
    <div class="boardAddTaskCloseHoverContainer" onclick="closeCard()"></div>
 </div>
    `
}


/**
 * Generates the HTML code for the footer of the edit task section.
 *
 * @param {Object} task - The task object to be edited.
 * @return {string} The HTML code for the edit task footer.
 */
function createEditFooter(task) {
    return /*html*/`
    <div class="addTaskBodyRight">
        <div class="createBtn addTaskBtn" onclick="saveEditedTask(${task.id}); doNotClose(event)">
            <span class="addTaskBtnText">Ok</span>
            <div class="createBtnImg"></div>
        </div>
    </div>`
}


/**
 * Creates empty cards and appends them to the specified categories.
 *
 * @param {string} taskId - The ID of the task element.
 * @param {Array<string>} categoryArr - An array of category IDs.
 */
function displayEmptyTask(taskId, categoryId) {
    let cardHeight = "min-height: " + document.getElementById(taskId).clientHeight + "px";
    // let cardHeight = "min-height: 100%";
    let cardWidth = "min-width: " + document.getElementById(taskId).clientWidth + "px";
    let cardStyle = cardHeight + "; " + cardWidth;

    let newDiv = document.createElement('div');
    newDiv.classList.add('emptyCard');
    if (window.innerWidth < 1370) {
        newDiv.classList.add('vertical')
    }

    newDiv.style = cardStyle;
    document.getElementById('category-' + categoryId).appendChild(newDiv);
}