let newUsers = [];
let username = '';
let mail = '';
let password = '';
let passwordConfirm = '';
let registerBtn = document.getElementById("registerBtn");




/**
 * init-function run at on loading the body
 */
async function signUpInit() {
    // try {
    //     await loadUsers();
    //     console.log("loadUsers() successful")
    // } catch (error) {
    //     console.error("loadUsers() failed", error)
    // }
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
    username = document.getElementById('signUpNameInput');
    mail = document.getElementById('signUpEmailInput');
    password = document.getElementById('signUpPasswordInput');
    passwordConfirm = document.getElementById('signUpPasswordInputConfirm');

    if (validateForm()) {

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
        showUserMessage('Please confirm the privacy policy and ensure all fields are filled correctly.');
    }
}


/**
 * Validates the form inputs and privacy policy confirmation.
 */
function validateForm() {
    let privacyConfirmed = checkPrivacyPolicyConfirmation();
    let passwordsMatch = checkPasswordsEqual();
    const allFieldsFilled = username.value !== '' && mail.value !== '' && password.value !== '';

    return privacyConfirmed && passwordsMatch && allFieldsFilled;
}



/**
 * reseting the signUp form
 */
function resetForm() {
    let registerBtn = document.getElementById("registerBtn");

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
    // checkBoxImage.src = `../../assets/img/icon-check_button_unchecked.png`;

    privacyCheckbox.addEventListener('click', function () {
        if (checkBoxImage.src.includes('unchecked.png')) {
            checkBoxImage.src = '../../assets/img/icon-check_button_checked.png';
            addNewUser();

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

    return !checkBoxImage.src.includes('unchecked.png');
    // if (checkBoxImage.src.includes('unchecked.png')) {
    //     return false;
    // } else {
    //     return true;
    // }
}


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
    }, 3000); // 100 second
}


function checkPasswordsEqual() {
    if (password.value !== passwordConfirm.value) {
        showUserMessage("Passwords do not match");
        return false;
    } else {
        return true;
    }
}


// Attach the privacy policy toggle functionality on page load
window.onload = function () {
    togglePrivacyPolicyCheckbox();
    let registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener('click', addNewUser);
};


// /**
//  * deleting all users - local and remote
//  */
// async function delAllUsers() {
//     users = [];
//     await remoteStorageSetItem('users', JSON.stringify(users));
//     console.log("USERS: ", users)
// }
