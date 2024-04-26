/**
 * init-function run at on loading the body
 */
async function signUpInit() {
    console.log("signUpInit() called")
    try {
        await loadUsers();
        console.log("loadUsers() successful")
    } catch (error) {
        console.error("loadUsers() failed", error)
    }
    console.log("USERS: ", users)
    username = document.getElementById('signUpNameInput');
    email = document.getElementById('signUpEmailInput');
    password = document.getElementById('signUpPasswordInput');
    registerBtn = document.getElementById('registerBtn');
}



let users = [];
let username = document.getElementById('signUpNameInput');
let email = document.getElementById('signUpEmailInput');
let password = document.getElementById('signUpPasswordInput');


/**
 * get the users from remote storage
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error: ', e);
    }
}


/**
 * add new user to users and save it to remote storage
 */
async function addUser() {
    let registerBtn = document.getElementById("registerBtn");
    registerBtn.disabled = true;

    let username = document.getElementById('signUpNameInput');
    let email = document.getElementById('signUpEmailInput');
    let password = document.getElementById('signUpPasswordInput');
    users.push(
        {
            username: username.value,
            email: email.value,
            password: password.value
        });

    await setItem('users', JSON.stringify(users));
    resetForm();
}


/**
 * reseting the signUp form
 */
function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}


/**
 * Toggles the privacy policy confirmation checkbox checked to unchecked and vice versa 
 */
function togglePrivacyPolicyCheckbox() {
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
}


/**
 * checking if the user has confirmed the privacy policy
 */
function checkPrivacyPolicyConfirmation() {
    let checkBoxImage = document.querySelector('.checkboxBox img');

    if (checkBoxImage.src.includes('unchecked.png')) {
        alert('please confirm the privacy policy');
        return false;
    }
}


/**
 * deleting all users - local and remote
 */
async function delAllUsers() {
    users = [];
    await setItem('users', JSON.stringify(users));
    console.log("USERS: ", users)
}


/**
 * Redirects the user to the login page.
 *
 * @return {void}
 */
function redirectToLogin() {
    switchPage('login.html?msg=you are signed up now!');
}

