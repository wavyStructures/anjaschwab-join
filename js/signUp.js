let newUsername = '';
let newMail = '';
let newPassword = '';
let newPasswordConfirm = '';

let newUser = {
    id: '',
    name: '',
    mail: '',
    password: '',
    contactColor: '',
    phone: '+49 0123 456789'
};



/**
 * init-function run at on loading the body
 */
async function signUpInit() {
}


async function saveNewUser(){
    users = await firebaseGetItem(FIREBASE_USERS_ID);
    users.push(newUser);
}


function getInputValues() {
    newUsername = document.getElementById('signUpNameInput').value;
    newMail = document.getElementById('signUpEmailInput').value;
    newPassword = document.getElementById('signUpPasswordInput').value;
    newPasswordConfirm = document.getElementById('signUpPasswordInputConfirm').value;
}

function setNewUserValues(){
    newUser.name = newUsername;
    newUser.mail = newMail;
    newUser.password = newPassword;
    newUser.id = findFreeId(users)
    newUser.contactColor = generateRandomColor();
}

async function addNewUser() {
    users = await firebaseGetItem(FIREBASE_USERS_ID);
    getInputValues();
    setNewUserValues(); 
    if(!checkPasswordsEqual()){
        showUserMessage('Passwords do not match!');
    }
    else if(checkMailExist(newMail)){
        showUserMessage('The mail already exists!');
    }else{
        localStorage.setItem('newMail', newUser.mail)
        users.push(newUser);
        await firebaseUpdateItem(users, FIREBASE_USERS_ID);
        showUserMessage('You Signed Up successfully!');
        switchPage('index.html?msg=you are signed up now!')
    }
}



function checkMailExist(mailToCheck){
    for (let i = 0; i < users.length; i++) {
        if (users[i].mail === mailToCheck) {
            return true;
        }
    }
    return false;
}

function checkIfFormIsValid(){
    let form = document.getElementById('login-form')
    let btn = document.getElementById('registerBtn');
    if (form.checkValidity() !== false && checkPrivacyPolicyConfirmation()) {
        btn.disabled = false;
        return true;
    }else{
        btn.disabled = true;
        return false;
    }

}

/**
 * reseting the signUp form
 */
function resetForm() {
    let inputFields = document.querySelectorAll('input');
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = '';
    }
    newUsername = '';
    newMail = '';
    newPassword = '';
    newPasswordConfirm = '';
    togglePrivacyPolicyCheckbox();
    checkIfFormIsValid();
}


/**
 * Toggles the privacy policy confirmation checkbox checked to unchecked and vice versa 
 */
function togglePrivacyPolicyCheckbox(){
    let privacyCheckbox = document.getElementById('privacyCheckbox');
    let checkBoxImage = document.querySelector('.checkboxBox img');

    if (privacyCheckbox.hasAttribute('checked')){
        checkBoxImage.src = '../../assets/img/icon-check_button_unchecked.png';
        privacyCheckbox.removeAttribute('checked');
    }else{
        privacyCheckbox.setAttribute('checked','');
        checkBoxImage.src = '../../assets/img/icon-check_button_checked.png';
    }
    checkIfFormIsValid();
}


/**
 * checking if the user has confirmed the privacy policy
 */
function checkPrivacyPolicyConfirmation() {
    let privacyCheckbox = document.getElementById('privacyCheckbox');
    return privacyCheckbox.hasAttribute('checked');
}


/**
 * Redirects the user to the login page.
 *
 * @return {void}
 */
function redirectToLogin() {
    switchPage('index.html?msg=you are signed up now!');
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
    setTimeout(() => {
        overlay.style.display = "none";
    }, 3000); // 100 second
}


function checkPasswordsEqual() {
    if (newPassword !== newPasswordConfirm) {
        // showUserMessage("Passwords do not match");
        return false;
    } else {
        return true;
    }
}


// // Attach the privacy policy toggle functionality on page load
// window.onload = function () {
//     togglePrivacyPolicyCheckbox();
//     let registerBtn = document.getElementById("registerBtn");
//     registerBtn.addEventListener('click', addNewUser);
// };


// /**
//  * deleting all users - local and remote
//  */
// async function delAllUsers() {
//     users = [];
//     await remoteStorageSetItem('users', JSON.stringify(users));
//     console.log("USERS: ", users)
// }
