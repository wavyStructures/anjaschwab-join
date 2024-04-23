

console.log('users = contacts are:', users);

/**
 * init-function run at on loading the body
 */
async function signUpInit() {
    await loadUsers(); f
    console.log("USERS: ", users)
}


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
    let email = document.getElementById('signUpEmailInput');
    let password = document.getElementById('signUpPasswordInput');

    // registerBtn.disabled = true;
    users.push(
        {
            email: email.value,
            password: password.value
        });

    //WEiterleitung zu login-Seite UND Nachricht anzeigen: erfolgreiche Registrierung/ you are signed up now!

    window.location.href = 'login.html?msg=you are signed up now!';

    // await setItem('users', JSON.stringify(users));
    // resetForm();
    // console.log("USERS: ", users)
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
    let privacyPolicyCheckbox = document.getElementById('privacyPolicyCheckbox');

    if (!privacyPolicyCheckbox.checked) {
        alert('please confirm the privacy policy');
        return false;
    }

    // privacyPolicyCheckbox.checked = true;

}




/**
 * reseting the register form
 */
function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
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
    window.location.href = 'login.html';
}

