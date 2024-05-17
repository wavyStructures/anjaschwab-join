let users = [];
let loggedUsers = [];


/**
 * Sets the users list stored in users.js as an array of objects to the remote storage
 */
async function setUsersRemote() {
    await remoteStorageSetItem('users', JSON.stringify(users));
}


/**
 * Initializes the login process by including HTML, setting default inputs, and starting an animation.
 */
async function loginInit() {
    // includeHTML();
    getInformations();
    await setUsersRemote();
    await loadUsers();
    // setUsersToLocalStorage(); //Später wird Contacts[] (ohne Kennwörter) im LocalStorage gespeichert!

    // startAnimation();
}


/**
 * Asynchronously loads the users from the 'contacts' item in local storage and parses it into a JavaScript object.
 * @return {Promise<void>} A promise that resolves when the users have been loaded and parsed.
 */
async function loadUsers() {
    users = JSON.parse(await remoteStorageGetItem('contacts'));
    console.log('users in login.js on loginInit(): ', users);
}


/**
 * Saves the users array to the local storage as a JSON string.
 */
function setUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}


/**
 * Logs in a user by finding the user with matching email and password in the users array.
 * If a matching user is found, it adds the user to the loggedUsers array and sets the current user.
 * Then, it switches the page to 'summary.html'.
 *
 * @return {boolean} Returns false to prevent the form from submitting again.
 */
function loginUser() {
    let email = document.getElementById('loginEmailInput').value;
    let password = document.getElementById('loginPasswordInput').value;
    let rememberMe = localStorage.getItem('rememberMe') === 'true';

    let loggedUser = users.find(user => user.mail == email && user.password == password);
    console.log('loggedUser from the users.find is: ', loggedUser);

    if (loggedUser) {
        loggedUsers.push(loggedUser);
        setCurrentUser(loggedUser);

        let user = { username: loggedUser.name }

        if (rememberMe) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
        }

        switchPage('summary.html');
    } else {
        alert("Invalid email or password. Please try again.");
    }
    return false;
}



/**
 * Toggles the appearance of the remember me checkbox image when clicked.
 */
function toggleRememberMeCheckbox() {
    let loginCheckboxImg = document.getElementById('loginCheckboxImg');
    if (loginCheckboxImg.src.includes('unchecked.png')) {
        loginCheckboxImg.src = '../../assets/img/icon-check_button_checked.png';
        localStorage.setItem('rememberMe', 'true');
    } else {
        loginCheckboxImg.src = '../../assets/img/icon-check_button_unchecked.png';
        localStorage.removeItem('rememberMe');
    };
}


/**
 * Switches the page to the summary page for guest login.
 */
function loginAsGuest() {
    switchPage('summary.html');
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