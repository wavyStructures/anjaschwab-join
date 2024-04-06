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
        'category': 'inProgress',
        'priority': 'medium'
    },
    {
        'id': 3,
        'type':'User Story',
        'title':'Daily Kochwelt Recipe',
        'text': 'Implement daily recipe and portion calculator...',
        'subtasks': 2,
        'assignedTo': ['SS'],
        'category': 'awaitFeedback',
        'priority': 'urgend'
    },
    {
        'id': 4,
        'type':'Technical Task',
        'title':'CSS Architecture Planning',
        'text': 'Define CSS naming conventions and structure...',
        'subtasks': 2,
        'assignedTo': ['AS'],
        'category': 'done',
        'priority': 'low'
    }
]

/**
 * render Cards to each category
 */
function renderCards(category, filteredCards){
    let categories = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    categories.forEach(c => {
        let categorie = document.getElementById(c);
        let cardsInCategorie = filterCardsForCategory(c);
        categorie.innerHTML = "";

        cardsInCategorie.forEach(card => categorie.innerHTML += renderCardsHTML())
    });
}

function filterCardsForCategory(toFilterFor){
    return cards.filter(c => c['category'] == toFilterFor);
}