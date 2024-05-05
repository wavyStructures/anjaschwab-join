let tasks = [
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
        'dueDate': "welches Format?"
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
        'dueDate': "welches Format?"
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
        'priority': 'urgend',
        'dueDate': "welches Format?"
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
        'priority': 'low',
        'dueDate': "welches Format?"
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
        'dueDate': "welches Format?"
    }
];

async function boardInit() {
    includeHTML();
    await loadContactsStorage();
    renderCategories();
}
/**
 * All available cards will be filtered for the category
 * @param {string} toFilterFor the category's name (e.g. 'done')
 * @returns array with cards fitting category
 */
function filterTasksForCategory(toFilterFor) {
    let task = tasks.filter(c => c['category'] == toFilterFor);
    return task;
}


/**
 * render the cards inside each category
 */
function renderCategories() {
    let categories = ['todo', 'inProgress', 'awaitFeedback', 'done']

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let categoryContainer = document.getElementById(category);
        let filteredTasks = filterTasks(category);
        if (filteredTasks.length != 0) {
            for (let j = 0; j < filteredTasks.length; j++) {
                let task = filteredTasks[j];
                categoryContainer.innerHTML += renderCardsHTML(task);
                renderAssignedToButtons(task);
            }
        } else {
            renderEmptyCategory(categoryContainer);
        }
    };

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
 * @param {string} category 
 * @returns array with the cards for each category
 */
function filterTasks(category) {
    let filteredTasks = [];
    for (let id in tasks) {
        if (tasks[id]['category'] == category) {
            filteredTasks.push(tasks[id]);
        }
    }
    return filteredTasks;
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
    console.log('TBD');
}


function renderSubtask(task) {
    let countSubtasks = +Object.keys(task['subtasks']).length;
    let completedSubtasks = task['subtasks'].filter(subtask => subtask['completed'] == true).length;
    let completedPercent = completedSubtasks * 100 / countSubtasks;

    if (countSubtasks == 0) {
        return `Nothing`
    } else {
        return /*html*/`<progress id="progressTodo" value="${completedPercent}" max="100"></progress><div class="cardSubtasksText">${completedSubtasks}/${countSubtasks} Subtasks</div>`
    }

}