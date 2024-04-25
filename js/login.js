/**
 * Initializes the login process by including HTML, setting default inputs, and starting an animation.
 */
function loginInit() {
    includeHTML();
    setDefaultInputs();
    // startAnimation();
}

// let currentUser = "Gast";
let loggedUser;

let users = [
    {
        id: 1,
        name: "anton mayer",
        mail: "antom@gmail.com",
        password: 'anton',
        phone: "+49 1111 111 11 1",
        contactColor: "",
    },
    {
        id: 2,
        name: "anja schulz",
        mail: "schulz@hotmail.com",
        password: 'anja',
        phone: "+49 1111 111 11 2",
        contactColor: "#c2e59c",
    },
    {
        id: 3,
        name: "benedikt ziegler",
        mail: "benedikt@gmail.com",
        password: 'benedikt',
        phone: "+49 1111 111 11 3",
        contactColor: "#ffcc80",
    }];

function setDefaultInputs() {
    let email = document.getElementById('loginEmailInput');
    let password = document.getElementById('loginPasswordInput');
    email.value = "benedikt@gmail.com";
    password.value = "benedikt";
}


async function loginUser() {
    let email = document.getElementById('loginEmailInput');
    let password = document.getElementById('loginPasswordInput');
    loggedUser = users.find(user => user.mail == email.value && user.password == password.value);


    console.log('loggedUser inside loginUser()', loggedUser);
    // greeting(loggedUser);

    // if (loggedUser) {
    //     greeting(loggedUser);
    // } else {
    //     greetingGuest();
    // }

    switchPage('summary.html');
    return false;
}


function gotoSignUp() {
    switchPage('signUp.html');
}

// function startAnimation() {
//     // setTimeout(function () {

//     let blueOverlay = document.getElementById("blue-overlay");
//     console.log(blueOverlay);
//     blueOverlay.style.display = "block";
//     document.getElementById("logo").classList.add("logo-animation");

//     // }, 30000); // 30 seconds
// }

// function login() {
//     let email = document.getElementById('loginEmailInput');
//     let password = document.getElementById('loginPasswordInput');
//     let user = users.find(user => user.mail == email.value && user.password == password);
//     console.log(user);
//     if (user) {
//         console.log('user gefunden');
//     }
// }
