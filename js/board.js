let cards = [
    {
        'id': 0,
        'type': 'User Story',
        'title': 'Kochwelt Page & Recipe Recommender',
        'text': 'Build start page with recipe recommendation...',
        'subtasks': 2,
        'completedSubtasks': 1,
        'assignedTo': [21],
        'category': 'todo',
        'priority': 'low'
    },
    {
        'id': 1,
        'type': 'Technical Task',
        'title': 'HTML Base Template Creation',
        'text': 'Create reusable HTML base templates...',
        'subtasks': 2,
        'completedSubtasks': 0,
        'assignedTo': [21, 2, 5],
        'category': 'todo',
        'priority': 'medium'
    },
    {
        'id': 2,
        'type': 'User Story',
        'title': 'Daily Kochwelt Recipe',
        'text': 'Implement daily recipe and portion calculator...',
        'subtasks': 2,
        'completedSubtasks': 0,
        'assignedTo': [17],
        'category': 'inProgress',
        'priority': 'urgend'
    },
    {
        'id': 3,
        'type': 'Technical Task',
        'title': 'CSS Architecture Planning',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'completedSubtasks': 1,
        'assignedTo': [9, 18],
        'category': 'todo',
        'priority': 'low'
    },
    {
        'id': 4,
        'type': 'Technical Task',
        'title': 'Cooking lunch',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'completedSubtasks': 2,
        'assignedTo': [9],
        'category': 'done',
        'priority': 'low'
    }
];


/**
 * All available cards will be filtered for the category
 * @param {string} toFilterFor the category's name (e.g. 'done')
 * @returns array with cards fitting category
 */
function filterCardsForCategory(toFilterFor) {
    let card = cards.filter(c => c['category'] == toFilterFor);
    return card;
}


/**
 * render the cards inside each category
 */
function renderCategories() {
    let categories = ['todo', 'inProgress', 'awaitFeedback', 'done']

    for(let i=0; i<categories.length; i++){
        let category = categories[i];
        let categoryContainer = document.getElementById(category);
        let filteredCards = filterCards(category);
        if (filteredCards.length != 0) {
            for (let j=0; j<filteredCards.length; j++){
                let card = filteredCards[j];
                categoryContainer.innerHTML += renderCardsHTML(card);
                renderAssignedToButtons(card);
            }
        } else {
            renderEmptyCategory(categoryContainer);
        }
    };

}
/**
 * render the icons with the initials of the users name on each card
 * @param {object} card 
 */
function renderAssignedToButtons(card){
    let assignedToContainer = document.getElementById('cardAssignedToContainerId' + card['id']);
    let assignedToContacts = card['assignedTo'];

    for (let i=0; i<assignedToContacts.length; i++){
        for (let j=0; j<contacts.length; j++){
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
function filterCards(category) {
    let filteredCards = [];
    for (let id in cards) {
        if (cards[id]['category'] == category) {
            filteredCards.push(cards[id]);
        }
    }
    return filteredCards;
}

/**
 * 
 * @param {object} categoryContainer html-object from the (emtpy) category
 */
function renderEmptyCategory(categoryContainer) {
    console.log(typeof categoryContainer);
    categoryContainer.innerHTML = renderEmptyCategoryHTML();
}

/**
 * 
 * @param {string} cardPriority 
 * @returns html-image-tag
 */
function setPriorityImage(cardPriority) {
    if (cardPriority == 'low') return `<img src="assets/img/icon-priority_low.png">`
    else if (cardPriority == 'medium') return `<img src="assets/img/icon-priority_medium.png">`
    else return `<img src="assets/img/icon-priority_high.png">`
}


function searchTask() {
    console.log('TBD');
}


function renderSubtask(card) {
    let countSubtasks = card['subtasks'];
    let completedSubtasks = card['completedSubtasks'];
    let completedPercent = completedSubtasks * 100 / countSubtasks;

    if (countSubtasks == 0) {
        return `Nothing`
    } else {
        return `<progress id="progressTodo" value="${completedPercent}" max="100"></progress><div class="cardSubtasksText">${card['completedSubtasks']}/${card["subtasks"]} Subtasks</div>`
    }

}