let newUsers = [];
let username = '';
let mail = '';
let password = '';
let passwordConfirm = '';

/**
 * init-function run at on loading the body
 */
async function signUpInit() {
    // showUserMessage("Versuch");
    // try {
    //     await loadUsers();
    //     console.log("loadUsers() successful")
    // } catch (error) {
    //     console.error("loadUsers() failed", error)
    // }

    // username = document.getElementById('signUpNameInput');
    // mail = document.getElementById('signUpEmailInput');
    // password = document.getElementById('signUpPasswordInput');
    // registerBtn = document.getElementById('registerBtn');
}


// /**
//  * get the users from local storage
//  */
// async function loadUsers() {
//     try {
//         users = getArray('users');
//     } catch (e) {
//         console.error('loadUsers error: ', e);
//     }
// }


function addNewUser() {
    let registerBtn = document.getElementById("registerBtn");
    registerBtn.disabled = true;

    // Get references to input fields
    username = document.getElementById('signUpNameInput');
    mail = document.getElementById('signUpEmailInput');
    password = document.getElementById('signUpPasswordInput');
    passwordConfirm = document.getElementById('signUpPasswordInputConfirm');

    // Perform validation
    let privacyConfirmed = checkPrivacyPolicyConfirmation();
    let passwordsMatch = checkPasswordsEqual();
    const allFieldsFilled = username.value !== '' && mail.value !== '' && password.value !== '';

    // Enable register button only if all validation criteria are met
    if (privacyConfirmed && passwordsMatch && allFieldsFilled) {
        registerBtn.disabled = false;
        newUsers.push({
            username: username.value,
            mail: mail.value,
            password: password.value
        });
        showUserMessage('You Signed Up successfully!');
        resetForm();
        setNewUsersToLocalStorage();
        redirectToLogin();
    } else {
        alert('Please confirm the privacy policy.');
        showUserMessage('Please confirm the privacy policy and ensure all fields are filled correctly.');
    }
}


/**
 * reseting the signUp form
 */
function resetForm() {
    username.value = '';
    mail.value = '';
    password.value = '';
    passwordConfirm.value = '';
    registerBtn.disabled = true;
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
        return false;
    } else {
        return true;
    }
}


// function checkAllFieldsFilled() {
//     let form = document.getElementById('login-form');
//     let registerBtn = document.getElementById('registerBtn');
//     if (form.checkValidity()) {
//         registerBtn.disabled = false;
//     } else {
//         registerBtn.disabled = true;
//     }
// }


/**
 * Redirects the user to the login page.
 *
 * @return {void}
 */
function redirectToLogin() {
    switchPage('login.html?msg=you are signed up now!');
}


/**
 * Saves the newUsers array to the local storage as a JSON string.
 */
function setNewUsersToLocalStorage() {
    localStorage.setItem('newUsers', JSON.stringify(newUsers));
}


function showUserMessage(message) {
    var overlay = document.getElementById("userMessageOverlay");
    var messageDiv = document.getElementById("userMessage");
    messageDiv.innerText = message;
    overlay.style.display = "flex";
    setTimeout(function () {
        overlay.style.display = "none";
    }, 100000); // 100 second
}


function checkPasswordsEqual() {
    if (password.value !== passwordConfirm.value) {
        showUserMessage("Passwords do not match");
        return false;
    } else {
        return true;
    }

}


/**
 * deleting all users - local and remote
 */
async function delAllUsers() {
    users = [];
    await remoteStorageSetItem('users', JSON.stringify(users));
    console.log("USERS: ", users)
}
