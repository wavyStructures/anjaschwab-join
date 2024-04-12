let cards = {
    1: {
        'type':'User Story',
        'title':'Kochwelt Page & Recipe Recommender',
        'text': 'Build start page with recipe recommendation...',
        'subtasks': 2,
        'completedSubtasks': 1,
        'assignedTo': [21],
        'category': 'todo',
        'priority': 'low'
    },
    2: {
        'type':'Technical Task',
        'title':'HTML Base Template Creation',
        'text': 'Create reusable HTML base templates...',
        'subtasks': 2,
        'completedSubtasks': 0,
        'assignedTo': [21, 2, 5],
        'category': 'todo',
        'priority': 'medium'
    },
    3: {
        'type':'User Story',
        'title':'Daily Kochwelt Recipe',
        'text': 'Implement daily recipe and portion calculator...',
        'subtasks': 2,
        'completedSubtasks': 0,
        'assignedTo': [17],
        'category': 'inProgress',
        'priority': 'urgend'
    },
    4: {
        'type':'Technical Task',
        'title':'CSS Architecture Planning',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'completedSubtasks': 1,
        'assignedTo': [9, 18],
        'category': 'todo',
        'priority': 'low'
    },
    5: {
        'type':'Technical Task',
        'title':'Cooking lunch',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'completedSubtasks': 2,
        'assignedTo': [9],
        'category': 'done',
        'priority': 'low'
    }
}


/**
 * All available cards will be filtered for the category
 * @param {string} toFilterFor the category's name (e.g. 'done')
 * @returns array with cards fitting category
 */
function filterCardsForCategory(toFilterFor){
    let card = cards.filter(c => c['category'] == toFilterFor);
    return card;
}


/**
 * render the cards inside each category
 */
function renderCategories(){
    let categories = ['todo','inProgress','awaitFeedback','done']

    categories.forEach(category => {
        let categoryContainer = document.getElementById(category);
        let filteredCards = filterCards(category);
        if (filteredCards.length != 0){
            renderCardsInCategory(categoryContainer, filteredCards);
        }else{
            renderEmptyCategory(categoryContainer);
        }
    });
}


function filterCards(category){
    let filteredCards = [];
    for (let id in cards){
        if(cards[id]['category'] == category){
            filteredCards.push(cards[id]);
        }
    }
    return filteredCards;
}


function renderCardsInCategory(categoryContainer, filteredCards){
    for (let i = 0; i < filteredCards.length; i++) {
        let card = filteredCards[i];
        categoryContainer.innerHTML += renderCardsHTML(card);
    }
}


function renderEmptyCategory(categoryContainer){
    categoryContainer.innerHTML = renderEmptyCategoryHTML();
}


function renderAssignedToButtons(ids){
    let assignedToDivs = [];

    for(let i=0; i<ids.length; i++){
        let contact = contacts[ids[i]];
        assignedToDivs.push(getAssignedToDivs(contact));
    }
    return assignedToDivs;
}


function getAssignedToDivs(contact){
    let initials = getInitials(contact.name);
    return /*html*/`<div class="profile-badge-group">${initials}</div>`
} 


function setPriorityImage(cardPriority){
    if (cardPriority == 'low') return `<img src="assets/img/icon-priority_low.png">`
    else if (cardPriority == 'medium') return `<img src="assets/img/icon-priority_medium.png">`
    else return `<img src="assets/img/icon-priority_high.png">`
}


function searchTask(){
    console.log('TBD');
}


function renderSubtask(card){
    let countSubtasks = card['subtasks'];
    let completedSubtasks = card['completedSubtasks'];
    let completedPercent = completedSubtasks * 100 / countSubtasks;

    if (countSubtasks == 0){
        return `Nothing`
    }else{
        return `<progress id="progressTodo" value="${completedPercent}" max="100"></progress><div class="cardSubtasksText">${card['completedSubtasks']}/${card["subtasks"]} Subtasks</div>`
    }

}