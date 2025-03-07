let selectedTaskType = "user_story";

/**
 * Initializes the task creation process by including HTML, fetching contacts from remote storage, 
 * loading tasks from remote storage, rendering the add task HTML, and checking the validity of the task.
 *
 * @return {Promise<void>} Promise that resolves when the initialization is complete.
 */
async function addTaskInit() {
    includeHTML();
    contacts = await getContactsFromRemoteStorage();
    try {
        tasks = await loadTasksFromRemoteStorage();
    } catch (error) {
        console.error("Failed to load tasks, defaulting to empty array.", error);
        tasks = [];
    }
    renderAddTaskHTML();
    checkValidity();
}


/**
 * Renders the HTML for adding a task.
 *
 */
function renderAddTaskHTML() {
    let container = document.getElementById('addTaskBody');
    container.innerHTML = '';
    container.innerHTML += renderAddTaskMainContentHTML();
    document.getElementById('addTaskBodyRight').innerHTML = renderAddTaskFooterHTML();
    setTodayDateAsMin();
    setPriority('medium');
    renderContactsToDropdown();
    renderSubtasksList();
}


/**
 * Updates the priority styling for the task buttons based on the selected priority.
 *
 * @param {string} priority - The selected priority ('Urgent', 'Medium', or 'Low').
 */
function setPriority(priority) {
    setPriorityAppearance(priority);
    setPriorityForNewCard(priority);
}


/**
 * Updates the appearance of the priority buttons based on the selected priority.
 *
 * @param {string} priority - The selected priority ('Urgent', 'Medium', or 'Low').
 */
function setPriorityAppearance(priority) {
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
 * Renders the subtask input field by setting the innerHTML of the 'subtaskBottom' element to the HTML code 
 * generated by the 'renderSubtaskInputFieldHTML' function. Then, sets the focus on the 'subtaskInputField' element.
 */
function renderSubtaskInputField() {
    let subtaskBottom = document.getElementById('subtaskBottom');
    subtaskBottom.innerHTML = renderSubtaskInputFieldHTML();
    document.getElementById('subtaskInputField').focus();
}


/**
 * Handles adding or canceling a subtask based on the option provided.
 *
 * @param {string} option - The option to add or cancel a subtask.
 */
function subtaskAddOrCancel(option) {
    let subtaskBottom = document.getElementById('subtaskBottom');
    let subtaskInputField = document.getElementById('subtaskInputField');
    if (option == 'add') {
        let subtaskInput = subtaskInputField.value;
        if (subtaskInput != '') {
            addSubtask(subtaskInput);
        }
    }
    subtaskBottom.innerHTML = renderSubtaskDefaultHTML();
    subtaskBottom.setAttribute('onclick', 'renderSubtaskInputField()');
}


/**
 * Renders the subtasks by iterating through each subtask and calling the renderSubtaskHTML function.
 */
function renderSubtasksList() {
    let outputContainer = document.getElementById('subtasksOutputContainer');
    outputContainer.innerHTML = '';
    for (let i = 0; i < newTask.subtasks.length; i++) {
        let subtask = newTask.subtasks[i];
        renderSubtaskHTML(outputContainer, subtask);
    }
}


/**
 * Checks if any subtask container has the 'editing' class.
 * This is to prevent other subtasks to be edited.
 *
 * @return {boolean} Returns true if any subtask container has the 'editing' class, otherwise returns false.
 */
function checkIfAnySubtaskIsInEditingMode() {
    let subtaskContainers = document.getElementsByClassName('subTaskOutputDiv');
    for (let i = 0; i < subtaskContainers.length; i++) {
        let subtaskContainer = subtaskContainers[i];
        if (subtaskContainer.classList.contains('editing')) {
            return true;
        }
    }
    return false;
}


/**
 * Returns the background color for a given priority level.
 *
 * @param {string} priority - The priority level ('urgent', 'medium', or 'low').
 * @return {string} The corresponding background color ('red', 'orange', 'green', or 'white').
 */
function getButtonColor(priority) {
    switch (priority) {
        case 'urgent':
            return '#ff3d00';
        case 'medium':
            return '#ffa800';
        case 'low':
            return '#7ae229';
        default:
            return 'white';
    }
}


/**
 * Toggles the visibility of the dropdown content and updates the arrow image based on its current direction.
 */
function renderArrow(arrowContainer, contentContainer) {
    let customArrow = document.getElementById(arrowContainer)
    let arrowImg = customArrow.childNodes[1];
    arrowImg.dataset.direction == "down"
        ? arrowImg.dataset.direction = "up"
        : arrowImg.dataset.direction = "down"
    arrowImg.src = `./assets/img/icon-arrow_dropdown_${arrowImg.dataset.direction}.png`
    document.getElementById(contentContainer).classList.toggle('d-none')
    document.getElementById(contentContainer).classList.toggle('dropdown-opened')

    setCloseDropdownContainer();
}


/**
 * Sets the onclick event handler for the container element based on the open dropdowns.
 * If there are open dropdowns, the onclick event handler is set to render the arrow based on the dropdown id.
 * If there are no open dropdowns, the onclick event handler is removed from the container element.
 *
 * @return {void}
 */
function setCloseDropdownContainer() {
    let openendDropdowns = document.getElementsByClassName('dropdown-opened');
    let container = getContainerToSetOnclick();

    if (!openendDropdowns.length == 0) {
        for (let i = 0; i < openendDropdowns.length; i++) {
            if (openendDropdowns[i].id == 'dropdown-content-assignedTo') {
                container.setAttribute('onclick', 'renderArrow("custom-arrow-assignedTo", "dropdown-content-assignedTo")');
            }
            if (openendDropdowns[i].id == 'dropdown-content-category') {
                container.setAttribute('onclick', 'renderArrow("custom-arrow-category", "dropdown-content-category")');
            }
        }
    }
    else {
        container.removeAttribute('onclick')
    }
}


/**
 * Returns the container element to set the onclick attribute on based on the current page location.
 *
 * @return {HTMLElement} The container element to set the onclick attribute on. Returns the 'bodyContent' element if the current page location includes 'addTask', the 'openCardContainer' element if it exists, or the 'addTaskHoverContainer' element if it exists.
 */
function getContainerToSetOnclick() {
    if (window.location.href.includes('addTask')) {
        return document.getElementById('bodyContent')
    } else {
        if (document.getElementById('openCardContainer')) {
            return document.getElementById('openCardContainer')
        } else {
            return document.getElementById('addTaskHoverContainer')
        }
    }
}


/**
 * Renders the test contacts in the dropdown content.
 */
function renderContactsToDropdown() {
    let content = document.getElementById('dropdown-content-assignedTo');
    content.innerHTML = '';
    contacts.forEach(contact => {
        content.innerHTML += /*html*/`<div class="dropdownOption" id="assignedToContact${contact.id}" marked=false onclick="assignContactToTask(${contact.id})">
            <div class="dropdownContactBadgeAndName">${renderAssignedToButtonsHTML(contact)} ${contact.username}</div> <img src="./assets/img/icon-check_button_unchecked.png" alt="">
            </div>`
    })
}


/**
 * Opens the calendar picker for the due date input field.
 *
 */
function addTaskDueDateOpenCalendear() {
    document.getElementById('addTaskDueDateInput').showPicker();
}

/**
 * Sets the appearance of the dropdown contact based on the 'marked' attribute.
 *
 * @param {Element} dropdownContact - The dropdown contact element to modify.
 * @param {Element} dropdownCheckboxImage - The image element representing the checkbox.
 */
function setDropdownContactAppearance(dropdownContact, dropdownCheckboxImage) {
    if (dropdownContact.getAttribute('marked') == 'false') {
        dropdownContact.setAttribute('marked', 'true');
        dropdownCheckboxImage.src = './assets/img/icon-check_button_checked_white.png';
    } else {
        dropdownContact.setAttribute('marked', 'false');
        dropdownCheckboxImage.src = './assets/img/icon-check_button_unchecked.png';
    }
}


/**
 * Toggles the visibility of the assigned contacts container based on the marked attribute of the contact cards.
 */
function toggleAssignedContactsContainer() {
    let contactCards = document.getElementById('dropdown-content-assignedTo').childNodes;
    let assignedContactsContainer = document.getElementById('assignedContactsContainer');
    let empty = true;
    for (let i = 0; i < contactCards.length; i++) {
        if (contactCards[i].getAttribute('marked') == 'true') {
            assignedContactsContainer.classList.remove('d-none');
            empty = false;
            break;
        }
    }
    if (empty) {
        assignedContactsContainer.classList.add('d-none');
    }
}


/**
 * Renders the assigned contacts container by populating it with the HTML generated by the renderAssignedToButtonsHTML function.
 */
function renderAssignedContactsContainer() {
    let container = document.getElementById('assignedContactsContainer');
    container.innerHTML = '';
    tempAssignedContacts.forEach(id => {
        let contact = contacts.find(contact => contact.id == id);
        container.innerHTML += renderAssignedToButtonsHTML(contact)
    })
}


/**
 * Updates the category elements with the chosen category and hides the dropdown content.
 *
 * @param {string} chosenCategory - The selected category.
 * @return {void} 
 */
function chooseCategory(chosenCategory) {
    let dropdownContentContainer = document.getElementById('dropdown-content-category')
    let categoryContainer = document.getElementById('dropdown-category-title');

    categoryContainer.innerHTML = chosenCategory;
    dropdownContentContainer.classList.add('d-none');

    selectedTaskType = chosenCategory.toLowerCase().replace(" ", "_");
    return selectedTaskType;
}


/**
 * Checks if any card is currently being edited.
 *
 * @return {boolean} Returns true if a card is being edited, false otherwise.
 */
function checkIfCardIsEditing() {
    let editing = document.getElementsByTagName('*');
    for (let element of editing) {
        if (element.hasAttribute('editing')) {
            return true;
        }
    }
    return false;
}


/**
 * Sets the minimum value of the "addTaskDueDateInput" element to the current date.
 */
function setTodayDateAsMin() {
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const todayDate = `${year}-${month}-${day}`;

    document.getElementById("addTaskDueDateInput").setAttribute('min', todayDate)
}


/**
 * Check the validity of required input fields and toggle the required message accordingly.
 *
 */
function checkValidity() {
    requiredInputFields.forEach(requiredInputField => {
        document.getElementById(requiredInputField.id).addEventListener('input', () => {
            toggleRequiredMessage(requiredInputField);
        })
        toggleRequiredMessage(requiredInputField);
    })
}


/**
 * A function to get the state of a required field.
 *
 * @param {Object} requiredInputField - The required input field object to check.
 * @return {boolean} Returns true if the field is not empty, false otherwise.
 */
function getStateOfRequriredField(requiredInputField) {
    let inputField = document.getElementById(requiredInputField.id);
    if (inputField.value == '') {
        inputField.style = 'color: #D1D1D1 !important';
        return false;
    }
    inputField.style = 'color: black !important';
    return true;
}


/**
 * Sets the state of the create button based on the state of required input fields.
 */
function setCreateBtnState() {
    if (requiredInputFields.every((r) => r.state == true)) {
        activateButton('createBtn', 'createTask()');
    } else {
        deactivateButton('createBtn');
    }
}


/**
 * Activates a button by removing the "disabled" class and setting the "onclick" attribute.
 *
 * @param {string} id - The ID of the button element.
 * @param {string} onClickFunctionName - The name of the function to be called when the button is clicked.
 */
function activateButton(id, onClickFunctionName) {
    if (document.getElementById(id)) {
        let btn = document.getElementById(id);
        btn.classList.remove("disabled");
        btn.setAttribute("onclick", onClickFunctionName);
    }
}


/**
 * Deactivates a button by adding the "disabled" class and removing the "onclick" attribute.
 *
 * @param {string} id - The ID of the button element.
 */
function deactivateButton(id) {
    if (document.getElementById(id)) {
        let btn = document.getElementById(id);
        btn.classList.add("disabled");
        btn.removeAttribute("onclick");
    }
}