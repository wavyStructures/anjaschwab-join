// const msgBox = document.getElementById('msgBox');
// console.log('msgBox inside summary.js is: ', msgBox);

// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get('msg');

// if (msg) {
//     msgBox.innerHTML = msg;
// } else {
//     msgBox.style.display = 'none';
// }


function summaryInit() {
    includeHTML();
    getDate();
    greeting(currentUser)
}

function greeting(user) {
    console.log('currentUser 2 inside login.js is:', user);
    // let currentName = userName;


    // let findUser = users.find(user => user.name === currentName);
    // let greetingName = findUser.name;
    // console.log('greetingName is:', greetingName);

    // const usernameForGreeting = document.getElementById("usernameForGreeting");
    // const h1GreetingUser = document.getElementById("h1GreetingUser");
    // if (h1GreetingUser) {
    //     h1GreetingUser.dataset.userType = "user";
    //     h1GreetingUser.dataset.userType = "user";
    //     usernameForGreeting.innerText = `, ${greetingName}`;
    //     // Rest of the code
    // } else {
    //     h1GreetingUser.dataset.userType = "guest";
    //     usernameForGreeting.innerText = '';
    //     console.error("Element with ID 'h1GreetingUser' not found.");
    // }



}

let userInitials = getInitials(user.name);






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

/*
TODO
get greeting according to daytime

cannot set properties of null      innerHTML.....???


function greetAccordingToDayTime() {
    let nowTime = new Date();
    let hours = nowTime.getHours();
    //let hours = 14;
    let status = (hours < 12) ? "Morning" :
        ((hours <= 18 && hours >= 12) ? "Afternoon" : "Night");

    document.getElementById('daytimeGreeting').innerHTML = "Hello";
}

greetAccordingToDayTime();

*/

/**
 * greet according to logged in user or guest
 * @returns void
 */


// document.addEventListener("DOMContentLoaded", function greeting(name) {
//     const isLoggedIn = true;


//     console.log("isLoggedIn summary.js: ", isLoggedIn);
//     console.log('currentUser in summary.js is: ', currentUser);


// });

