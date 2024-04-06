let cards = [
    {
        'id': 1,
        'type':'User Story',
        'title':'Kochwelt Page & Recipe Recommender',
        'text': 'Build start page with recipe recommendation...',
        'subtasks': 2,
        'assignedTo': ['SS','MM',"AS"],
        'category': 'todo',
        'priority': 'low'
    },
    {
        'id': 2,
        'type':'Technical Task',
        'title':'HTML Base Template Creation',
        'text': 'Create reusable HTML base templates...',
        'subtasks': 0,
        'assignedTo': ['SS','MM',"AS"],
        'category': 'todo',
        'priority': 'medium'
    },
    {
        'id': 3,
        'type':'User Story',
        'title':'Daily Kochwelt Recipe',
        'text': 'Implement daily recipe and portion calculator...',
        'subtasks': 2,
        'assignedTo': ['SS'],
        'category': 'inProgress',
        'priority': 'urgend'
    },
    {
        'id': 4,
        'type':'Technical Task',
        'title':'CSS Architecture Planning',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'assignedTo': ['AS'],
        'category': 'todo',
        'priority': 'low'
    },
    {
        'id': 5,
        'type':'Technical Task',
        'title':'Cooking lunch',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 0,
        'assignedTo': ['MM'],
        'category': 'done',
        'priority': 'low'
    }
]

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
        let content = document.getElementById(category);
        let filteredCards = cards.filter(card => card['category'] == category);
        clearDiv(category);
        renderCardsHTML(content, filteredCards)
    });
}