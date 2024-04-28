let loggedUsers = [];

/**
 * Sets the users list stored in users.js as an array of objects to the remote storage
 */
function setUsersRemote() {
    setItem('users', JSON.stringify(users));
}


/**
 * Initializes the login process by including HTML, setting default inputs, and starting an animation.
 */
function loginInit() {
    includeHTML();
    setUsersRemote();
    getItem('users');

    // startAnimation();
}


/**
 * Logs in a user by finding the user with matching email and password in the users array.
 * If a matching user is found, it adds the user to the loggedUsers array and sets the current user.
 * Then, it switches the page to 'summary.html'.
 *
 * @return {boolean} Returns false to prevent the form from submitting.
 */
function loginUser() {
    let email = document.getElementById('loginEmailInput');
    let password = document.getElementById('loginPasswordInput');
    let loggedUser = users.find(user => user.mail == email.value && user.password == password.value);

    loggedUsers.push(loggedUser);
    setCurrentUser(loggedUser);

    switchPage('summary.html');
    return false;
}


/**
 * Toggles the appearance of the remember me checkbox image when clicked.
 */
function toggleRememberMeCheckbox() {
    let rememberMeCheckbox = document.getElementById('loginCheckbox');
    let loginCheckboxImg = document.getElementById('loginCheckboxImg');


    if (loginCheckboxImg.src.includes('unchecked.png')) {
        loginCheckboxImg.src = '../../assets/img/icon-check_button_checked.png';

    } else {
        loginCheckboxImg.src = '../../assets/img/icon-check_button_unchecked.png';
    };
}


/**
 * Switches the page to the sign up page.
 */
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




// let users = [
//     {
//         id: 1,
//         name: "anton mayer",
//         mail: "antom@gmail.com",
//         password: 'anton',
//         phone: "+49 1111 111 11 1",
//         contactColor: "",
//     },
//     {
//         id: 2,
//         name: "anja schulz",
//         mail: "schulz@hotmail.com",
//         password: 'anja',
//         phone: "+49 1111 111 11 2",
//         contactColor: "#c2e59c",
//     },
//     {
//         id: 3,
//         name: "benedikt ziegler",
//         mail: "benedikt@gmail.com",
//         password: 'benedikt',
//         phone: "+49 1111 111 11 3",
//         contactColor: "#ffcc80",
//     }];




// function setDefaultInputs() {
//     let email = document.getElementById('loginEmailInput');
//     let password = document.getElementById('loginPasswordInput');
//     email.value = "benedikt@gmail.com";
//     password.value = "benedikt";
// }


