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
function signUpInit() {
    showUserMessage('LOADING successfully!');
}


async function saveNewUser() {
    users = await firebaseGetItem(FIREBASE_USERS_ID);
    users.push(newUser);
}


function getInputValues() {
    newUsername = document.getElementById('signUpNameInput').value;
    newMail = document.getElementById('signUpEmailInput').value;
    newPassword = document.getElementById('signUpPasswordInput').value;
    newPasswordConfirm = document.getElementById('signUpPasswordInputConfirm').value;
}

function setNewUserValues() {
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
    if (!checkPasswordsEqual()) {
        showUserMessage('Passwords do not match!');
    }
    else if (checkMailExist(newMail)) {
        showUserMessage('The mail already exists!');
    } else {
        localStorage.setItem('newMail', newUser.mail)
        users.push(newUser);
        await firebaseUpdateItem(users, FIREBASE_USERS_ID);
        showUserMessage('You Signed Up successfully!');
        setTimeout(() => {
            switchPage('index.html');
        }, 3000);
    }
}



function checkMailExist(mailToCheck) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].mail === mailToCheck) {
            return true;
        }
    }
    return false;
}

function checkIfFormIsValid() {
    let form = document.getElementById('login-form')
    let btn = document.getElementById('registerBtn');
    if (form.checkValidity() && checkPrivacyPolicyConfirmation()) {
        btn.disabled = false;
        return true;
    } else {
        btn.disabled = true;
        return false;
    }

}

/**
 * reseting the signUp form
 */
// function resetForm() {
//     let inputFields = document.querySelectorAll('input');
//     for (let i = 0; i < inputFields.length; i++) {
//         inputFields[i].value = '';
//     }
//     newUsername = '';
//     newMail = '';
//     newPassword = '';
//     newPasswordConfirm = '';
//     togglePrivacyPolicyCheckbox();
//     checkIfFormIsValid();
// }



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
 * Toggles the privacy policy confirmation checkbox checked to unchecked and vice versa 
 */
// function togglePrivacyPolicyCheckbox() {
//     let privacyCheckbox = document.getElementById('privacyCheckbox');
//     let checkBoxImage = document.querySelector('.checkboxBox img');

//     if (privacyCheckbox.hasAttribute('checked')) {
//         checkBoxImage.src = '../../assets/img/icon-check_button_unchecked.png';
//         privacyCheckbox.removeAttribute('checked');
//     } else {
//         privacyCheckbox.setAttribute('checked', '');
//         checkBoxImage.src = '../../assets/img/icon-check_button_checked.png';
//     }
//     checkIfFormIsValid();
// }


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

function showUserMessage(message) {
    // Create the overlay element
    let overlay = document.createElement("div");
    overlay.id = "userMessageOverlay";

    // Create the inner message element
    let overlayInner = document.createElement("div");
    overlayInner.classList.add("signUp-successfully-created");
    overlayInner.innerHTML = message;

    // Append the inner message element to the overlay
    overlay.appendChild(overlayInner);

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Set up the animation sequence
    requestAnimationFrame(() => {
        overlay.classList.add('slide-in');

        setTimeout(() => {
            overlay.classList.remove('slide-in');
            overlay.classList.add('slide-out');

            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500); // Wait for the slide-out animation to complete

        }, 3000); // Duration the message stays visible
    });
}

// Example usage:
// showUserMessage("Sign up successfully created!");


function checkPasswordsEqual() {
    if (newPassword !== newPasswordConfirm) {
        // showUserMessage("Passwords do not match");
        return false;
    } else {
        return true;
    }
}





function hideMessage() {
    let messageBox = document.getElementById('userMessage');
    //     messageBox.classList.add('slide-out');
    //     messageBox.classList.remove('slide-in');
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
