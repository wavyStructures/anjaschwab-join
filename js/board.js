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
        'category': 'todo',
        'priority': 'urgend'
    },
    {
        'id': 4,
        'type':'Technical Task',
        'title':'CSS Architecture Planning',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'assignedTo': ['AS'],
        'category': 'inProgress',
        'priority': 'low'
    }
]

/**
 * render Cards to each category
 */
function renderCards(){
    let categories = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    let card;
    
    for (let i=0; i<categories.length; i++){
        let category = categories[i];
        let categoryContainer = document.getElementById(category);

        let cardsIds = filterCardsForCategory(category);
        console.log (category, cardsIds)
    }
}


function filterCardsForCategory(toFilterFor){
    let card = cards.filter(c => c['category'] == toFilterFor);
    return card;
}