let loggedUser;
let globalCapitalizedName;
let dayTime;


/**
 * Initializes the summary by including the HTML and getting the current date.
 */
async function summaryInit() {
    includeHTML();
    contacts = await getContactsFromRemoteStorage();
    await loadUsers();
    getLoggedUser();
    getUserNameForGreeting();
    getDate();
    greetAccordingToDayTime();
    greetUserMobile();
    tasks = await loadTasksFromRemoteStorage();
    loadAmounts();
    getUrgentTasks();
    buttonEventListener();
}


/**
 * Retrieves the currently logged in user by calling the getCurrentUser function and assigns it to the loggedUser variable.
 */
function getLoggedUser() {
    currentUser = getCurrentUser();
    if (currentUser) {
        loggedUser = currentUser.username
    }
}


/**
 * Generates a greeting based on the current time.
 */
function greetAccordingToDayTime() {
    let nowTime = new Date();
    let hours = nowTime.getHours();

    if (hours <= 12) {
        dayTime = "Good Morning";
    } else if (hours <= 18) {
        dayTime = "Good Afternoon";
    } else if (hours > 18) {
        dayTime = "Good Evening";
    }

    document.getElementById('daytimeGreeting').innerHTML = '';
    loggedUser = getCurrentUser();
    if (loggedUser) {
        dayTime += ",";
    }
    document.getElementById('daytimeGreeting').innerHTML = `${dayTime} `;
}


/**
* Retrieves the current user's name and triggers personalized greeting.
*/
function getUserNameForGreeting() {
    if (loggedUser) {
        let capitalizedName = getNameWithCapitalizedFirstLetter(loggedUser);
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
    globalCapitalizedName = capitalizedName;
    adjustGreeting();
}


/**
 * Adjusts the greeting displayed on the page to "Good Morning, ".
 */
function adjustGreeting() {
    let daytimeGreeting = document.getElementById("daytimeGreeting");
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
 * @param {array} categories - An array of category names.
 * @param {array} categoriesAmounts - An array of category amounts.                                 
 */
function loadAmounts() {
    // let categories = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    let categories = ['category-0', 'category-1', 'category-2', 'category-3'];
    let categoriesAmounts = [0, 0, 0, 0];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let filteredTasks = filterTasks(tasks, category);
        categoriesAmounts[i] = filteredTasks.length;
    }
    showAmounts(categoriesAmounts);
}


/**
 * Updates the HTML elements with the amounts from the categoriesAmounts array.
 * @param {array} categoriesAmounts - An array of category amounts to be displayed.
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


/** Retrieves the tasks with priority "urgent" from the tasks array.
* @return {Array} The array of tasks with priority "urgent".
*/
function getUrgentTasks() {
    let urgentTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.priority === 'urgent' && (task.category === 'category-0' || task.category === 'category-1' || task.category === 'category-2')) {
            urgentTasks.push(task);
        }
    }
    showUrgentTasks(urgentTasks);
    return urgentTasks;
}


/**
 * Updates the HTML element with the ID "amountUrgent" to display the number of urgent tasks.
 * @param {Array} urgentTasks - An array of urgent tasks.
  */

function showUrgentTasks(urgentTasks) {
    let amountUrgentTasksContainer = document.getElementById("amountUrgent");
    amountUrgentTasksContainer.innerHTML = urgentTasks.length;
}


/**
 * Attaches a click event listener to all elements with the class 'square-button' and 'urgentAndDate'.
 * When clicked, the function switches the page to 'board.html'.
 */
function buttonEventListener() {
    const summaryButtons = document.querySelectorAll('.square-button, .urgentAndDate');
    summaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchPage('board.html');
        });
    });
}


/**
 * Displays a mobile greeting overlay if the window width is less than 801 pixels.
 */
function greetUserMobile() {

    if (window.innerWidth < 951 && document.referrer.includes('index')) {
        let greetingContainer = document.getElementById('greetingContainer');
        let subMainSummary = document.getElementById('subMainSummary');
        let bitGreeting = document.getElementById('h1GreetingUser');

        greetingContainer.style.display = 'flex';
        document.getElementById('main').classList.add("hide-scroll");
        bitGreeting.style.display = "none";
        subMainSummary.style.overflow = 'hidden';
        subMainSummary.classList.remove('sub-main-summary');
        subMainSummary.classList.add('d-none');

        mobileGreeting();
        setTimeout(hideMobileGreeting, 2500);
    }
}


/**
 * Hides the mobile greeting by setting the display style of the 'greetingContainer' element to 'none'and adding 'sub-main-summary' class to 'subMainSummary' element and removing 'd-none' class.
 */
function hideMobileGreeting() {
    document.getElementById('greetingContainer').style.display = 'none';
    document.getElementById('main').classList.remove("hide-scroll");
    subMainSummary.classList.add('sub-main-summary');
    subMainSummary.classList.remove('d-none');
    subMainSummary.style.overflow = 'none';
}


/**
 * Sets the mobile greeting based on the current state of the application.
 */
function mobileGreeting() {
    let mobileGreeting = document.getElementById('mobileGreeting');
    mobileGreeting.innerHTML = '';
    mobileGreeting.innerHTML = `${dayTime}`;

    if (loggedUser) {
        dayTime += ",";
        document.getElementById('mobileGreetingUsername').innerHTML = globalCapitalizedName;
    } else {
        mobileGreeting.classList.add('mobile-guest-greeting');
        mobileGreeting.style.fontWeight = 'bold';
    }
}

