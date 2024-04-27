/**
 * Initializes the login process by including HTML, setting default inputs, and starting an animation.
 */
function loginInit() {
    includeHTML();
    setDefaultInputs();
    // startAnimation();
}

// let currentUser = "Gast";
let loggedUsers = [];

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
    let loggedUser = users.find(user => user.mail == email.value && user.password == password.value);

    loggedUsers.push(loggedUser);

    console.log('loggedUser inside loginUser()', loggedUser);
    // greeting(loggedUser);

    // if (loggedUser) {
    //     greeting(loggedUser);
    // } else {
    //     greetingGuest();
    // }

    loggedUsers.push(loggedUser);
    console.log('loggedUser inside loginUser()', loggedUser);

    // Log the updated loggedUsers array after pushing the logged user
    await updateLoggedUsers();

    switchPage('summary.html');
    return false;
}


async function updateLoggedUsers() {
    console.log('loggedUsers after pushing', loggedUsers);
}

console.log('after loginUser() and pushing the loggedUsers-array is:', loggedUsers);

function toggleRememberMeCheckbox() {
    let rememberMeCheckbox = document.getElementById('loginCheckbox');
    let rememberMeCheckboxImg = document.querySelector('#loginCheckbox img');
    console.log('rememberMeCheckboxImg is: ', rememberMeCheckboxImg);
    if (rememberMeCheckboxImg.contains("unchecked")) {
        rememberMeCheckboxImg.src = "/"
    }
}

let privacyCheckbox = document.getElementById('privacyCheckbox');
let checkBoxImage = document.querySelector('.checkboxBox img');
checkBoxImage.src = `../../assets/img/icon-check_button_unchecked.png`;

privacyCheckbox.addEventListener('click', function () {
    if (checkBoxImage.src.includes('unchecked.png')) {
        checkBoxImage.src = '../../assets/img/icon-check_button_checked.png';

    } else {
        checkBoxImage.src = '../../assets/img/icon-check_button_unchecked.png';
    }
});




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
