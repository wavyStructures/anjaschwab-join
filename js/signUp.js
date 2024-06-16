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
 * Asynchronously saves a new user to the Firebase database.
 * @return {Promise<void>} A promise that resolves when the user is successfully saved.
 */
async function saveNewUser() {
    users = await firebaseGetItem(FIREBASE_USERS_ID);
    users.push(newUser);
}


/**
 * Retrieves the values of the input fields and assigns them to the corresponding variables.
 */
function getInputValues() {
    newUsername = document.getElementById('signUpNameInput').value;
    newMail = document.getElementById('signUpEmailInput').value;
    newPassword = document.getElementById('signUpPasswordInput').value;
    newPasswordConfirm = document.getElementById('signUpPasswordInputConfirm').value;
}


/**
 * Sets the values of the newUser object based on the input values.
 */
function setNewUserValues() {
    newUser.name = newUsername;
    newUser.mail = newMail;
    newUser.password = newPassword;
    newUser.id = findFreeId(users)
    newUser.contactColor = generateRandomColor();
}


/**
 * Adds a new user to the system.
 * @return {Promise<void>} A promise that resolves when the user is added.
 */
async function addNewUser() {
    users = await firebaseGetItem(FIREBASE_USERS_ID);
    getInputValues();
    setNewUserValues();
    if (!checkPasswordsEqual()) {
        showUserMessage('Passwords do not match!');
    }
    else if (checkMailExist(newMail)) {
        showUserMessage('The mail already exists!');
    } else {
        localStorage.setItem('newMail', newUser.mail)
        localStorage.setItem('hasJustSignedUp', '');
        users.push(newUser);
        await firebaseUpdateItem(users, FIREBASE_USERS_ID);
        showUserMessage('You Signed Up successfully!');
        setTimeout(() => {
            switchPage('index.html');
        }, 3000);
    }
}


/**
 * Checks if a given email exists in the list of users.
 * @param {string} mailToCheck - The email to check for existence.
 * @return {boolean} Returns true if the email exists, false otherwise.
 */
function checkMailExist(mailToCheck) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].mail === mailToCheck) {
            return true;
        }
    }
    return false;
}


/**
 * Checks if the form is valid by verifying the form's validity and the confirmation of the privacy policy.
  * @return {boolean} Returns true if the form is valid and the privacy policy is confirmed, otherwise false.
 */
function checkIfFormIsValid() {
    let form = document.getElementById('login-form')
    let btn = document.getElementById('registerBtn');

    if (form.checkValidity() && checkPrivacyPolicyConfirmation() && testMailinputWithRegex()) {
        btn.disabled = false;
        return true;
    } else {
        btn.disabled = true;
        return false;
    }
}


/**
 * Returns a regular expression that can be used to validate an email address.
 *
 * @return {RegExp} A regular expression that matches a valid email address.
 */
function testMailinputWithRegex() {
    let inputMail = document.getElementById('signUpEmailInput');
    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
    return regex.test(inputMail.value);
}


function throwMsgErrorWrongMailaddress() {
    let emailMessage = document.getElementById("msgBoxValidateEmail");

    if (!testMailinputWithRegex()) {
        emailMessage.innerHTML = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        emailMessage.style.color = "red"; // Added color for error message
    } else {
        emailMessage.innerHTML = "E-Mail-Adresse ist gültig.";
        emailMessage.style.color = "green";
    }
}


/**
 * Toggles the appearance of the privacy policy checkbox.
 */
function togglePrivacyPolicyCheckbox() {
    let privacyCheckbox = document.getElementById('privacyCheckbox');
    let checkBoxImage = document.getElementById('checkboxImage');

    if (privacyCheckbox.checked) {
        checkBoxImage.src = './assets/img/icon-check_button_checked.png';
    } else {
        checkBoxImage.src = './assets/img/icon-check_button_unchecked.png';
    }
    checkIfFormIsValid();
}


/**
 * checking if the user has confirmed the privacy policy
 */
function checkPrivacyPolicyConfirmation() {
    let privacyCheckbox = document.getElementById('privacyCheckbox');
    return privacyCheckbox.checked;
}


/**
 * Redirects the user to the login page.
 *
 * @return {void}
 */
function redirectToLogin() {
    switchPage('index.html');
}


/**
 * Saves the newUsers array to the local storage as a JSON string.
 */
function setNewUsersToLocalStorage() {
    localStorage.setItem('newUsers', JSON.stringify(newUsers));
}


/**
 * Displays a user message overlay with a slide-in animation and a slide-out animation after a specified duration.
 * @param {string} message - The message to be displayed in the overlay.
 */
function showUserMessage(message) {
    let overlay = document.createElement("div");
    overlay.id = "userMessageOverlay";

    let overlayInner = document.createElement("div");
    overlayInner.classList.add("signUp-successfully-created");
    overlayInner.innerHTML = message;

    overlay.appendChild(overlayInner);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlayInner.classList.add('slide-in');

        setTimeout(() => {
            overlayInner.classList.remove('slide-in');
            overlayInner.classList.add('slide-out');

            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 1000);
        }, 2000);
    });
}


/**
 * Checks if the new password and the new password confirmation are equal.
 * @return {boolean} Returns true if the passwords are equal, false otherwise.
 */
function checkPasswordsEqual() {
    if (newPassword !== newPasswordConfirm) {
        // showUserMessage("Passwords do not match");
        return false;
    } else {
        return true;
    }
}
