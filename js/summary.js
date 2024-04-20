function summaryInit() {
    includeHTML();
    getDate();

}


/**
 * greet according to logged in user or guest
 * @returns void
 */

// function greeting(name) {
const isLoggedIn = false;
console.log("isLoggedIn: ", isLoggedIn);

const h1GreetingUser = document.getElementById("h1GreetingUser");
const usernameForGreeting = document.getElementById("usernameForGreeting");


if (isLoggedIn) {
    h1GreetingUser.dataset.userType = "user";
} else {
    h1GreetingUser.dataset.userType = "guest";
}

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