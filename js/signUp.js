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

    username = document.getElementById('signUpNameInput');
    mail = document.getElementById('signUpEmailInput');
    password = document.getElementById('signUpPasswordInput');
    registerBtn = document.getElementById('registerBtn');
}


/**
 * get the users from local storage
 */
async function loadUsers() {
    try {
        users = getArray('users');
    } catch (e) {
        console.error('loadUsers error: ', e);
    }
}


/**
 * add new user to users and save it to local storage
 */
// async 
 function addUser() {
    let registerBtn = document.getElementById("registerBtn");
    registerBtn.disabled = true;

    //TODO  sollte hier Abfrage ob bereits vorhanden???

    let username = document.getElementById('signUpNameInput');
    let mail = document.getElementById('signUpEmailInput');
    let password = document.getElementById('signUpPasswordInput');

    checkPrivacyPolicyConfirmation();
    if (checkPrivacyPolicyConfirmation()) {
        registerBtn.disabled = false;
        users.push(
            {
                username: username.value,
                mail: mail.value,
                password: password.value
            });
            
        resetForm();
        redirectToLogin();
    } else {
        alert('please confirm the privacy policy');
    }
}



/**
 * reseting the signUp form
 */
function resetForm() {
    mail.value = '';
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
        return false;
    } else {
        return true;
    }
}

function checkAllFieldsFilled() {
    let form = document.getElementById('login-form');
    let registerBtn = document.getElementById('registerBtn');
    if (form.checkValidity()) {
        registerBtn.disabled = false;
    } else {
        registerBtn.disabled = true;
    }
    console.log("checkAllFieldsFilled is:", registerBtn.disabled);
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




