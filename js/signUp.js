let newUser = {
    id: '',
    username: '',
    mail: '',
    password: '',
    contactColor: '',
    phone: '+49 0123 456789'
};

let newUsername = '';
let newMail = '';
let newPassword = '';
let newPasswordConfirm = '';

/**
 * Asynchronously saves a new user to the Firebase database.
 * @return {Promise<void>} A promise that resolves when the user is successfully saved.
 */
async function saveNewUser() {
    users = await loadUsers();
    users.push(newUser);
}


/**
 * Retrieves the values of the input fields and assigns them to the corresponding variables.
 */
function getInputValues() {
    newUsername = document.getElementById('signUpNameInput').value;
    newMail = document.getElementById('signUpEmailInput').value;
    console.log('newMail:', newMail);
    console.log('newUsername:', newUsername);

    newPassword = document.getElementById('signUpPasswordInput').value;
    newPasswordConfirm = document.getElementById('signUpPasswordInputConfirm').value;
}


/**
 * Sets the values of the newUser object based on the input values.
 */
function setNewUserValues() {
    newUser.username = newUsername;
    newUser.mail = newMail;
    newUser.password = newPassword;
    // newUser.id = findFreeId(users)
    // newUser.contactColor = generateRandomColor();
}


/**
 * Adds a new user to the system.
 * @return {Promise<void>} A promise that resolves when the user is added.
 */
async function addNewUser() {
    getInputValues();
    setNewUserValues();
    checkPasswordsEqual();

    const emailExists = await checkMailExists(newMail);

    if (emailExists) {
        showUserMessage('The email already exists!');
        return;
    }
    else {
        try {
            const response = await fetch(`${BASE_URL}auth/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        username: newUser.username,
                        email: newUser.mail,
                        password: newUser.password,
                        phone: newUser.phone,
                    }),
            });

            if (response.ok) {
                const data = await response.json();
                showUserMessage('You signed up successfully!');
                setTimeout(() => switchPage('index.html'), 3000);
            } else {
                const errorData = await response.json();
                console.log('Error during sign-up:', errorData);
                showUserMessage(errorData.error || 'Failed to sign up. Please try again.');
            }
        }
        catch (error) {
            console.error('Error during sign-up:', error);
            showUserMessage('An error occurred. Please try again.');
        }
    }
}


/**
 * Checks if a given email exists in the list of users.
 * @param {string} mailToCheck - The email to check for existence.
 * @return {boolean} Returns true if the email exists, false otherwise.
 */

async function checkMailExists(email) {
    try {
        const response = await fetch(`${BASE_URL}auth/check-email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            const data = await response.json();
            return data.exists;
        }
        return false;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
}

//     contacts = await getContactsFromRemoteStorage();

//     if (contacts) {
//         for (let i = 0; i < contacts.length; i++) {
//             if (contacts[i].email === emailToCheck) {
//                 console.log('inside CHECK-Mailexist-function contacts[i].email:', contacts[i].email);
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     }
// }

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


/**
 * Updates the email validation message and its color based on the input value of the email field.
 */
function throwMsgErrorWrongMailaddress() {
    let emailMessage = document.getElementById("msgBoxValidateEmail");
    let inputMail = document.getElementById('signUpEmailInput');

    if (inputMail.value) {
        if (!testMailinputWithRegex()) {
            emailMessage.innerHTML = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
            emailMessage.style.color = "red"; // Added color for error message
        } else {
            emailMessage.innerHTML = "E-Mail-Adresse ist gültig.";
            emailMessage.style.color = "green";
        }
    } else {
        emailMessage.innerHTML = "";
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
        showUserMessage("Passwords do not match");
        return false;
    } else {
        return true;
    }
}
