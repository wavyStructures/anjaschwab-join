let tasks = [];

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
        'category': 'todo',
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
        'category': 'awaitFeedback',
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
        'category': 'done',
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
        'category': 'todo',
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
        'category': 'inProgress',
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
        "category": "todo",
        "priority": "Urgent",
        "dueDate": "2024-05-20"
    }
];

async function boardInit() {
    includeHTML();
    await loadContactsStorage();
    await loadTasksFromRemoteStorage();
    renderCategories(tasks);
    openCard(1);
}

function showAddTaskContainer(){
    let container = document.getElementById('addTaskHoverContainer');
    container.classList.remove('d-none');
    container.classList.remove('hideBoard');
    container.classList.add('showBoard');
    document.getElementById('boardOverlay').classList.toggle('d-none')
}

function hideAddTaskContainer(){
    let container = document.getElementById('addTaskHoverContainer');
    container.classList.remove('showBoard');
    container.classList.add('hideBoard');
    document.getElementById('boardOverlay').classList.add('d-none')
    // TODO: ALSO HIDE SUCCESS-MESSAGE-CONTAINER
    setTimeout(() => {
        container.classList.toggle('d-none');

    },200)
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
    div.classList.add("createBtn", "addTaskBtn", "center", "disabled");

    let span = document.createElement("span");
    span.classList.add("addTaskBtnText");
    span.textContent = "Task added to the board";


    let imgDiv = document.createElement("div");
    imgDiv.classList.add("addTaskBtnImg");

    div.appendChild(span);
    div.appendChild(imgDiv);

    document.body.appendChild(div);
}

//FIXME: wird noch gebraucht?!
// /**
//  * All available cards will be filtered for the category
//  * @param {string} toFilterFor the category's name (e.g. 'done')
//  * @returns array with cards fitting category
//  */
// function filterTasksForCategory(toFilterFor) {
//     let task = tasks.filter(c => c['category'] == toFilterFor);
//     return task;
// }



/**
 * Renders the cards inside each category based on the tasks provided.
 *
 * @param {Array} arrayToSearchIn - The array of tasks to search through.
 */
function renderCategories(arrayToSearchIn) {
    let categories = ['todo', 'inProgress', 'awaitFeedback', 'done']

    categories.forEach(category => {
        let categoryContainer = document.getElementById(category);
        categoryContainer.innerHTML = "";
        let filteredTasks = filterTasks(arrayToSearchIn, category);

        if (filteredTasks.length != 0) {
            for (let j = 0; j < filteredTasks.length; j++) {
                let task = filteredTasks[j];
                categoryContainer.innerHTML += renderCardsHTML(task);
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


function searchTask() {
    let searchInput = document.getElementById('findTask');
    if(searchInput == null) return;
    let foundTasks = tasks.filter(task => task['title'].toLowerCase().includes(searchInput.value) || task['description'].toLowerCase().includes(searchInput.value));
    renderCategories(foundTasks);
}


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


function openCard(taskId){
    if (!document.getElementById('openCardContainer')){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'openCardContainer');
        newDiv.setAttribute('class', 'openCardContainer');
        document.body.appendChild(newDiv);
    }    
    let openCardContainer = document.getElementById('openCardContainer');
    let task = tasks.filter(task => task['id'] == taskId)[0];
    openCardContainer.classList.remove('d-none');
    openCardContainer.innerHTML = renderOpenCardHTML(task);
    renderContactsToOpenCard(task)
}

function closeCard(){
    let openCardContainer = document.getElementById('openCardContainer');
    openCardContainer.classList.add('d-none');
}


function renderOpenCardHTML(task){
    
    return /*html*/`
    <div class="cardTypeAndCloseBtn">
        <div class="cardType">User Story</div>
        <div class="boardAddTaskCloseHoverContainer" onclick="closeCard()"></div>
    </div>
    <div class="cardTitle">${task['title']}</div>
    <div class="cardText openCardText">${task['description']}</div>
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
        `
}

function renderContactsToOpenCard(task){
    let content = document.getElementById('openCardAssignedToContactsContainer');
    content.innerHTML = '';

    task['assignedTo'].forEach(id =>{
        console.log(id);
        contacts.filter(contact => {
            if (contact['id'] == id) content.innerHTML += /*html*/`<div class="openCardAssignedToContact">${renderAssignedToButtonsHTML(contact)} ${contact.name}</div>`
        })

    })
        
    //     contact => {
    //     content.innerHTML += /*html*/`<div class="dropdownOption" id="assignedToContact${contact.id}" marked=false onclick="assignContactToTask(${contact.id})">
    //         <div class="dropdownContactBadgeAndName">${renderAssignedToButtonsHTML(contact)} ${contact.name}</div> <img src="../../assets/img/icon-check_button_unchecked.png" alt="">
    //         </div>`
    // })
}
