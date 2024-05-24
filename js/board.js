let tasks = [];

let currentDraggedElement;

let _tasksBackup = [
    {
        'id': 0,
        'type': 'User Story',
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation...',
        'subtasks': [{
            'id': 0,
            'subtaskText': 'Bügeln',
            'completed': false
        },
        {
            'id': 1,
            'subtaskText': 'Kochen',
            'completed': true
        }],
        'completedSubtasks': [],
        'assignedTo': [21],
        'category': 'category-0',
        'priority': 'low',
        'dueDate': "2024-01-06"
    },
    {
        'id': 1,
        'type': 'Technical Task',
        'title': 'HTML Base Template Creation',
        'description': 'Create reusable HTML base templates...',
        'subtasks': [{
            'id': 0,
            'subtaskText': 'Bügeln',
            'completed': false
        }],
        'completedSubtasks': [],
        'assignedTo': [21, 2, 5],
        'category': 'category-2',
        'priority': 'medium',
        'dueDate': "2024-09-15"
    },
    {
        'id': 2,
        'type': 'User Story',
        'title': 'Daily Kochwelt Recipe',
        'description': 'Implement daily recipe and portion calculator...',
        'subtasks': [{
            'id': 0,
            'subtaskText': 'building calculator',
            'completed': true
        },
        {
            'id': 1,
            'subtaskText': 'insert to main-project',
            'completed': true
        }],
        'completedSubtasks': [],
        'assignedTo': [17],
        'category': 'category-3',
        'priority': 'urgent',
        'dueDate': "2024-07-07"
    },
    {
        'id': 3,
        'type': 'Technical Task',
        'title': 'CSS Architecture Planning',
        'description': 'Define CSS naming conventions and structure...',
        'subtasks': [{
            'id': 0,
            'subtaskText': 'watching Kevin Powells video',
            'completed': true
        },
        {
            'id': 1,
            'subtaskText': 'rebuild Kevins code',
            'completed': false
        }],
        'completedSubtasks': [],
        'assignedTo': [9, 18],
        'category': 'category-0',
        'priority': 'urgent',
        'dueDate': "2024-05-11"
    },
    {
        'id': 4,
        'type': 'Technical Task',
        'title': 'Cooking lunch',
        'description': 'Define CSS naming conventions and structure...',
        'subtasks': [{
            'id': 0,
            'subtaskText': 'Making Noodles',
            'completed': false
        },
        {
            'id': 1,
            'subtaskText': 'Making Sauce',
            'completed': false
        }],
        'completedSubtasks': [],
        'assignedTo': [9],
        'category': 'category-1',
        'priority': 'low',
        'dueDate': "2024-10-17"
    },
    {
        "id": 5,
        "type": "Technical Task",
        "title": "Birthday cake",
        "description": "John got birthday on May 21th!\nWe have to bake a cake for him!",
        "subtasks": [
            {
                "id": 0,
                "subtaskText": "buy ingredients",
                "completed": false
            },
            {
                "id": 1,
                "subtaskText": "bake the cake",
                "completed": false
            },
            {
                "id": 2,
                "subtaskText": "meet what cake it'll be",
                "completed": false
            }
        ],
        "completedSubtasks": [],
        "assignedTo": [],
        "category": "category-0",
        "priority": "urgent",
        "dueDate": "2024-05-20"
    }
];

let categories = ['category-0', 'category-1', 'category-2', 'category-3'];

/**
 * Initializes the board by including HTML, loading contacts and tasks from remote storage,
 * and rendering the categories.
 */
async function boardInit() {
    includeHTML();
    await loadContactsStorage();
    await loadTasksFromRemoteStorage();
    renderCategories(tasks);
    // showAddTaskContainer();
    // openCard(2);
}


/**
 * Renders the overlay for adding a task to the board.
 */
function renderBoardAddTaskOverlay(){
    let newDiv = document.createElement('div');
    setAttributes(newDiv, {'id': 'addTaskHoverContainer', 'class': 'addTaskHoverContainer hideBoard d-none', 'onclick': 'doNotClose(event)'});
    document.body.appendChild(newDiv);

    let container = document.getElementById('addTaskHoverContainer');
    container.innerHTML = renderBoardAddTaskHeaderHTML();
    container.innerHTML += renderAddTaskMainContentHTML();
    container.innerHTML += renderAddTaskFooterHTML();
    setTodayDateAsMin();
    setPriority('medium');
    renderContactsToDropdown();
    checkValidity();
}


/**
 * Displays the add task container by rendering the overlay and adding the necessary classes to the container.
 * If the container does not exist, it will be created and rendered.
 */
function showAddTaskContainer(){
    if (!document.getElementById('addTaskHoverContainer')) {
        renderBoardAddTaskOverlay();
    }
    let container = document.getElementById('addTaskHoverContainer');
    container.classList.remove('d-none');
    container.classList.remove('hideBoard');
    container.classList.add('showBoard');
    toggleBoardOverlay("hideAddTaskContainer()");
}


function hideAddTaskContainer(){
    let container = document.getElementById('addTaskHoverContainer');
    container.classList.remove('showBoard');
    container.classList.add('hideBoard');
    // TODO: ALSO HIDE SUCCESS-MESSAGE-CONTAINER
    setTimeout(() => {
        container.remove();
        // container.classList.toggle('d-none');
    },200)
    toggleBoardOverlay('disable');
}


function toggleBoardOverlay(functionToCall){
    let overlay = document.getElementById('boardOverlay')
    if (overlay.classList.contains('d-none')){
        overlay.classList.remove('d-none')
        overlay.setAttribute('onclick', functionToCall);
    } else if (functionToCall == 'disable') {
        overlay.classList.add('d-none')
        overlay.removeAttribute('onclick');
    }
}


function showSuccessMessage(){
    if (!document.getElementById('success-message-container')) createSuccessMessageContainer();

    let container = document.getElementById('success-message-container');

    container.classList.remove('successOut');
    container.classList.remove('d-none');
    container.classList.add('successIn');

    setTimeout(() => {
        container.classList.remove('successIn');
        container.classList.add('successOut');
        container.classList.add('d-none');
    }, 2000)
}


function createSuccessMessageContainer(){
    let div = document.createElement("div");

    div.id = "success-message-container";
    div.classList.add("createBtn", "addTaskBtn", "center", "disable");

    let span = document.createElement("span");
    span.classList.add("addTaskBtnText");
    span.textContent = "Task added to the board";


    let imgDiv = document.createElement("div");
    imgDiv.classList.add("addTaskBtnImg");

    div.appendChild(span);
    div.appendChild(imgDiv);

    document.body.appendChild(div);
}


/**
 * Renders the cards inside each category based on the tasks provided.
 *
 * @param {Array} arrayToSearchIn - The array of tasks to search through.
 */
function renderCategories(arrayToSearchIn) {
    categories.forEach(category => {
        let categoryContainer = document.getElementById(category);
        categoryContainer.innerHTML = "";
        let filteredTasks = filterTasks(arrayToSearchIn, category);

        if (filteredTasks.length != 0) {
            for (let j = 0; j < filteredTasks.length; j++) {
                let task = filteredTasks[j];
                categoryContainer.innerHTML += renderTasksHTML(task);
                renderAssignedToButtons(task);
            }
        } else {
            renderEmptyCategory(categoryContainer);
        }});
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
    for (let id in arrayToSearchIn) {
        if (arrayToSearchIn[id]['category'] == category) {
            filteredTasks.push(tasks[id]);
        }
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
    let assignedToContacts = task['assignedTo'];

    for (let i = 0; i < assignedToContacts.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (contacts[j]['id'] == assignedToContacts[i])
                assignedToContainer.innerHTML += renderAssignedToButtonsHTML(contacts[j]);
        }
    }
}


/**
 * 
 * @param {object} categoryContainer html-object from the (emtpy) category
 */
function renderEmptyCategory(categoryContainer) {
    categoryContainer.innerHTML = renderEmptyCategoryHTML();
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
    if(searchInput == null) return;
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
    let countSubtasks = +Object.keys(task['subtasks']).length;
    let completedSubtasks = task['subtasks'].filter(subtask => subtask['completed'] == true).length;
    let completedPercent = completedSubtasks * 100 / countSubtasks;

    if (countSubtasks != 0) {
        return /*html*/`<progress id="progressTodo" value="${completedPercent}" max="100"></progress><div class="cardSubtasksText">${completedSubtasks}/${countSubtasks} Subtasks</div>`
    }else{
        // console.log("parent element have to be d-none");
    }
}


/**
 * Opens a card with the specified task ID.
 *
 * @param {number} taskId - The ID of the task to open.
 */
function openCard(taskId){
    if (!document.getElementById('openCardContainer')){
        let newDiv = document.createElement('div');
        setAttributes(newDiv, {'id': 'openCardContainer', 'class': 'openCardContainer', 'onclick': 'doNotClose(event)'});
        document.body.appendChild(newDiv);
    }
    let openCardContainer = document.getElementById('openCardContainer');
    let task = getTaskOutOfId(taskId)
    openCardContainer.classList.remove('d-none');
    openCardContainer.innerHTML = renderOpenCardHTML(task);
    renderContactsToOpenCard(task);
    renderSubtasksToOpenCard(task);
    toggleBoardOverlay('closeCard()');

    printValueFromSpecificCard('Task open', taskId);
}


/**
 * Returns the task object with the specified taskId from the tasks array.
 *
 * @param {number} taskId - The ID of the task to retrieve.
 * @return {Object|undefined} The task object with the specified taskId, or undefined if no task is found.
 */
function getTaskOutOfId(taskId){
    return tasks.filter(task => task['id'] == taskId)[0]
}


/**
 * Closes the open card by adding the 'd-none' class to the 'openCardContainer' element.
 *
 */
async function closeCard(){
    let openCardContainer = document.getElementById('openCardContainer');
    openCardContainer.remove();
    openCardContainer.classList.add('d-none');
    openCardContainer.removeAttribute('editing');

    await saveTasksToRemoteStorage();
    renderCategories(tasks);
    toggleBoardOverlay('disable');
}


/**
 * Renders the HTML for the open card based on the given task object.
 *
 * @param {Object} task - The task object containing the details to render.
 * @return {string} The HTML string for the open card.
 */
function renderOpenCardHTML(task){
    return /*html*/`
    <div class="cardTypeAndCloseBtn">
        <div class="cardType">${task['type']}</div>
        <div class="boardAddTaskCloseHoverContainer" onclick="closeCard()"></div>
    </div>
    <div class="cardTitle">${task['title']}</div>
    <div class="openCardDescription">${task['description']}</div>
    <div class="openCardTextBox">
        <span class="openCardText">Due Date:</span>
        <span class="openCardValue">${task['dueDate']}</span>
    </div>
    <div class="openCardTextBox">
        <span class="openCardText">Priority:</span>
        <div class="openCardPriority">
            <span class="openCardValue">${task['priority']}</span>
            <div class="openCardPriorityImage">${setPriorityImage(task['priority'])}</div>
        </div>
    </div>
    <div class="openCardAssignedToContainer"><span class="openCardText">Assigned To:</span>
        <div class="openCardAssignedToContactsContainer" id="openCardAssignedToContactsContainer"></div>
    </div>
    <div class="openCardSubtasksContainer">
        <span class="openCardText">Subtasks:</span>
        <div id="openCardSubtasks"></div>
    </div>
    <div class="openCardDeleteEditContainer">
        <div class="openCardDeleteContainer" onclick='openCardDelete(${task.id})'>
            <div class="openCardImgDiv pointer" id="openCardImgDelete"> </div>
            <span>Delete</span>
        </div>
        <div class="vLine"></div>
        <div class="openCardEditContainer"  onclick='openCardEdit(${task.id})'>
            <div class="openCardImgDiv pointer" id="openCardImgEdit"> </div>
            <span>Edit</span>
        </div>
    </div>
        `
}


/**
 * Renders the contacts assigned to a task in the open card.
 *
 * @param {Object} task - The task object containing the assigned contacts.
 */
function renderContactsToOpenCard(task) {
	let content = document.getElementById("openCardAssignedToContactsContainer");
	content.innerHTML = "";

	task["assignedTo"].forEach((id) => {
		contacts.filter((contact) => {
			if (contact["id"] == id)
				content.innerHTML += /*html*/ `
                    <div class="openCardAssignedToContact">${renderAssignedToButtonsHTML(contact)}${contact.name}</div>`;
		});
	});
}


/**
 * Renders subtasks to the open card based on the task object.
 *
 * @param {object} task - The task object containing subtasks to render.
 */
function renderSubtasksToOpenCard(task){
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
function setSubtaskState(taskId, subtaskIndex){
    let task = getTaskOutOfId(taskId);
    task['subtasks'][subtaskIndex]['completed'] = !task['subtasks'][subtaskIndex]['completed'];
    let openCardSubtasks = document.getElementsByClassName('openCardSubtask');

    for (let i = 0; i < openCardSubtasks.length; i++) {
        if(i == subtaskIndex) {
            openCardSubtasks[i].getAttribute('completed') == null
            ? openCardSubtasks[i].setAttribute('completed', '') 
            : openCardSubtasks[i].removeAttribute('completed')
        }
    }
}


/**
 * Deletes a task from the tasks array based on the provided taskId.
 *
 * @param {number} taskId - The ID of the task to be deleted.
 */
function openCardDelete(taskId){
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id == taskId){
            tasks.splice(i, 1);
            break;
        }
    }
    closeCard();
    renderCategories(tasks);

}


/**
 * Opens the edit card for the task with the specified ID.
 *
 * @param {number} taskId - The ID of the task to edit.
 */
function openCardEdit(taskId){
    newTask = getTaskOutOfId(taskId);
    renderEditContainer();
    renderContactsToDropdown();
    renderAssignedContactsContainer();
    renderSubtasks()
    setTaskValuesToFields(newTask);
    printValueFromSpecificCard('Task edit', taskId);
}


/**
 * Renders the edit container by setting the 'editing' attribute, updating the HTML content of the 'openCardContainer' element, and appending the HTML code for the edit header, main content, and footer.
 */
function renderEditContainer(){
    let container = document.getElementById('openCardContainer');
    container.setAttribute('editing','');
    container.innerHTML = createEditHeader();
    container.innerHTML += renderAddTaskMainContentHTML();
    container.innerHTML += createEditFooter(newTask);
}


/**
 * Sets the values of the task fields in the edit card container.
 */
function setTaskValuesToFields(){
    tempAssignedContacts = [];
    document.getElementById('addTaskEnterTitleInput').value = newTask['title'];
    document.getElementById('addTaskDescriptionInput').value = newTask['description'];
    document.getElementById('addTaskDueDateInput').value = newTask['dueDate'];
    document.getElementById('dropdown-category-title').innerHTML = newTask['type'];
    setPriorityAppearance(newTask['priority']);
    renderEditCardAssignedContacts();
}


/**
 * Renders the assigned contacts in the edit card container.
 *
 * This function clears the contents of the 'assignedContactsContainer' element and then iterates over the 'assignedTo' array of the 'newTask' object. For each 'id' in the array, it calls the 'assignContactToTask' function to assign the corresponding contact to the task.
 */
function renderEditCardAssignedContacts(){
    document.getElementById('assignedContactsContainer').innerHTML = '';
    newTask['assignedTo'].forEach(id => {
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
function saveEditedTask(taskId){
    collectInformationsForNewCard();
    let taskToSave = getTaskOutOfId(taskId);
    taskToSave = newTask;
    saveTasksToRemoteStorage();
    closeCard();
    printValueFromSpecificCard('Task saved', taskId);
    printValuesFromEachCard('category')
}


/**
 * Generates the HTML code for the header of the edit task section.
 *
 * @return {string} The HTML code for the edit task header.
 */
function createEditHeader(){
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
function createEditFooter(task){
    return /*html*/`
    <div class="addTaskBodyRight">
        <div class="createBtn addTaskBtn" onclick="saveEditedTask(${task.id})">
            <span class="addTaskBtnText">Ok</span>
            <div class="createBtnImg"></div>
        </div>
    </div>`
}


// DRAG AND DROP

/**
 * Starts the dragging process for a task.
 *
 * @param {string} taskId - The ID of the task element being dragged.
 */
function startDragging(taskId){
    currentDraggedElement = taskId;
    document.getElementById(taskId).classList.add('dragging');
    setDroppableContainers(taskId)
}


/**
 * Sets the droppable containers for a given task ID based on its category.
 *
 * @param {string} taskId - The ID of the task element.
 */
function setDroppableContainers(taskId){
    let category = getTaskOutOfId(taskId)['category']
    switch (category) {
        case 'category-0':
            displayEmptyTask(taskId, ['category-1']);
            break;
        case 'category-1':
            displayEmptyTask(taskId, ['category-0', 'category-2']);
            break;
        case 'category-2':
            displayEmptyTask(taskId, ['category-1', 'category-3']);
            break;
        case 'category-3':
            displayEmptyTask(taskId, ['category-2']);
            break;
    }
}


/**
 * Creates empty cards and appends them to the specified categories.
 *
 * @param {string} taskId - The ID of the task element.
 * @param {Array<string>} categoryArr - An array of category IDs.
 */
function displayEmptyTask(taskId, categoryArr){
    let cardHeight = "height: "+  document.getElementById(taskId).clientHeight + "px";
    let cardWidth = "width: "+  document.getElementById(taskId).clientWidth + "px";
    let cardStyle = cardHeight + "; " + cardWidth;

    for (let i=0; i < categoryArr.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('emptyCard');

        newDiv.style = cardStyle;
        document.getElementById(categoryArr[i]).appendChild(newDiv);
    }

}


/**
 * Stops the dragging process by removing the 'drag-area-highlight' class from all categories
 * and the 'dragging' class from all tasks.
 */
function stopDragging(){
    categories.forEach(category => {
        document.getElementById(category).classList.remove('drag-area-highlight');
    });

    tasks.forEach(task => {
        document.getElementById(task.id).classList.remove('dragging');
    });
}


/**
 * Prevents the default behavior of the event, which is to allow the browser to handle the drag and drop operation.
 *
 * @param {Event} event - The event object representing the drag and drop event.
 */
function allowDrop(event){
    event.preventDefault();
}


/**
 * Moves a task to a specified category.
 *
 * @param {string} category - The category to move the task to.
 */
function moveTo(category){
    let task = getTaskOutOfId(currentDraggedElement);
    task['category'] = category;
    renderCategories(tasks);
    saveTasksToRemoteStorage();
}

// DEBUGGING

let toPrint = 'category';

function printValuesFromEachCard(){
    tasks.forEach(task => console.log("ID: " + task.id + " | " + toPrint + ": " + task[toPrint]))
}

function printValueFromSpecificCard(reason, id){
    let task = getTaskOutOfId(id);
    console.log(reason + " -> ID: " + id + " | " + toPrint + ": " + task[toPrint])
}

