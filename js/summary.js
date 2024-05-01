/**
 * Initializes the summary by including the HTML and getting the current date.
 *
 * @return {void} This function does not return anything.
 */
async function summaryInit() {
    includeHTML();
    getDate();
    getUserNameForGreeting();
}

/**
* Retrieves the current user's name and triggers personalized greeting.
*/
function getUserNameForGreeting() {
    let loggedUser = getCurrentUser();
    if (loggedUser) {
        let capitalizedName = getNameWithCapitalizedFirstLetter(loggedUser.name);
        console.log('loggedUser', loggedUser);
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
    daytimeGreeting.innerHTML = 'Good Morning, ';
    daytimeGreeting.classList.remove("daytimeGreeting");
    daytimeGreeting.classList.add("userGreeting");
}




// document.addEventListener('DOMContentLoaded', function () {
//     function greeting(handedOverUser) {

//         const usernameForGreeting = document.getElementById("usernameForGreeting");

//         console.log('inside doc EventListener:', usernameForGreeting);
//         usernameForGreeting.innerHTML = '';
//         usernameForGreeting.innerHTML = handedOverUser.name;


//     }

// });

// function greeting(user) {
//     alert('greetingUserObject is:', user);

//     setTimeout(function () {
//         const usernameForGreeting = document.getElementById("usernameForGreeting");

//         console.log('inside summary greeting(user) timeout:', usernameForGreeting);
//         // usernameForGreeting.innerHTML = '';
//         // usernameForGreeting.innerHTML = user.name; 6000


//     })




// const isLoggedIn = true;        //TODO is loggedIn setting

// const usernameForGreeting = document.getElementById("usernameForGreeting");
// usernameForGreeting.innerHTML = '';
// usernameForGreeting.innerHTML = `${user.name}`;

// } else {
//     h1GreetingUser.dataset.userType = "guest";
//     usernameForGreeting.innerText = '';
// }





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





// function greetAccordingToDayTime() {
//     let nowTime = new Date();
//     let hours = nowTime.getHours();
//     //let hours = 14;
//     let status = (hours < 12) ? "Good Morning" :
//         ((hours <= 18 && hours >= 12) ? "Good Afternoon" : "Good Night");

//     document.getElementById('daytimeGreeting').innerHTML = `${status} `;
// }

// greetAccordingToDayTime();



