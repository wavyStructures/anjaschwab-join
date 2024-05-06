let loggedUser;

/**
 * Initializes the summary by including the HTML and getting the current date.
 *
 * @return {void} This function does not return anything.
 */
async function summaryInit() {
    includeHTML();
    await loadContactsStorage();
    await loadTasksFromRemoteStorage();
    getLoggedUser();
    getUserNameForGreeting();
    getDate();
    greetAccordingToDayTime();
    loadAmounts();
    getUrgentTasks();
    buttonEventListener();

}

function getLoggedUser() {
    loggedUser = getCurrentUser();
}

/**
 * Generates a greeting based on the current time.
 */
function greetAccordingToDayTime() {
    let nowTime = new Date();
    let hours = nowTime.getHours();
    let status = (hours < 12) ? "Good Morning" :
        ((hours <= 18 && hours >= 12) ? "Good Afternoon" : "Good Night");

    document.getElementById('daytimeGreeting').innerHTML = '';
    console.log('loggedUser Fkt1', loggedUser);
    loggedUser = getCurrentUser();
    if (loggedUser) {
        status += ",";
    }
    document.getElementById('daytimeGreeting').innerHTML = `${status} `;
}


/**
* Retrieves the current user's name and triggers personalized greeting.
*/
function getUserNameForGreeting() {
    if (loggedUser) {
        let capitalizedName = getNameWithCapitalizedFirstLetter(loggedUser.name);
        greet(capitalizedName);
    }
}


/**
 * Greets the user with the capitalized name.
 * @param {string} capitalizedName - The capitalized name of the user to greet.
 */
function greet(capitalizedName) {
    let usernameForGreeting = document.getElementById("usernameForGreeting");
    usernameForGreeting.innerHTML = '';
    usernameForGreeting.innerHTML = capitalizedName;
    adjustGreeting();
}


/**
 * Adjusts the greeting displayed on the page to "Good Morning, ".
 */
function adjustGreeting() {
    let daytimeGreeting = document.getElementById("daytimeGreeting");
    daytimeGreeting.innerHTML = '';
    daytimeGreeting.innerHTML = '';
    daytimeGreeting.classList.remove("daytimeGreeting");
    daytimeGreeting.classList.add("userGreeting");
}


/**
 * get the actual date
 * @returns English (US) formatted Date
 */
function getDate() {
    let today = new Date();
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById("date").innerHTML = today.toLocaleDateString("en-US", options);
}


/**
 * Loads the amounts of tasks in each category and calls function to display them.
 *
 * @param {array} categories - An array of category names.
 * @param {array} categoriesAmounts - An array of category amounts.                                 //TODO  anja: was wäre der Sinn hier was zu returnen?
 */
function loadAmounts() {
    let categories = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    let categoriesAmounts = [0, 0, 0, 0];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let filteredTasks = filterTasks(category);
        categoriesAmounts[i] = filteredTasks.length;
    }
    showAmounts(categoriesAmounts);
}


/**
 * Updates the HTML elements with the amounts from the categoriesAmounts array.
 * * @param {array} categoriesAmounts - An array of category amounts to be displayed.
 */
function showAmounts(categoriesAmounts) {
    let amountTodo = document.getElementById("amountTodo");
    let amountInProgress = document.getElementById("amountInProgress");
    let amountAwaitFeedback = document.getElementById("amountAwaitFeedback");
    let amountDone = document.getElementById("amountDone");
    let amountAllBoardTasks = document.getElementById("amountAllBoardTasks");

    amountTodo.innerHTML = categoriesAmounts[0];

    amountInProgress.innerHTML = categoriesAmounts[1];
    amountAwaitFeedback.innerHTML = categoriesAmounts[2];
    amountDone.innerHTML = categoriesAmounts[3];
    amountAllBoardTasks.innerHTML = categoriesAmounts[0] + categoriesAmounts[1] + categoriesAmounts[2] + categoriesAmounts[3];
}


/* Retrieves the tasks with priority "urgent" from the tasks array.
*
* @return {Array} The array of tasks with priority "urgent".
*/
function getUrgentTasks() {
    let urgentTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.priority === 'urgent' && (task.category === 'todo' || task.category === 'inProgress' || task.category === 'awaitFeedback')) {
            urgentTasks.push(task);
        }
    }
    showUrgentTasks(urgentTasks);
    console.log("urgentTasks: ", urgentTasks);
    return urgentTasks;
}


/**
 * Updates the HTML element with the ID "amountUrgent" to display the number of urgent tasks.
 *
 * @param {Array} urgentTasks - An array of urgent tasks.
  */

function showUrgentTasks(urgentTasks) {
    let amountUrgentTasksContainer = document.getElementById("amountUrgent");
    amountUrgentTasksContainer.innerHTML = urgentTasks.length;
}


function buttonEventListener() {
    const summaryButtons = document.querySelectorAll('.square-button, .urgentAndDate');
    console.log("summaryButtons: ", summaryButtons);

    summaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchPage('board.html');
        });
    });
}

