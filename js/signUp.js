// let users = [];
let users = contacts;
console.log('users = contacts are:', users);

/**
 * init-function run at on loading the body
 */
async function init() {
    await loadUsers();
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
async function register() {


    registerBtn.disabled = true;
    users.push(
        {
            email: email.value,
            password: password.value
        });

    //WEiterleitung zu login-Seite UND Nachricht anzeigen: erfolgreiche Registrierung/ you are signed up now!

    window.location.href = 'login.html?msg=you are signed up now!';

    await setItem('users', JSON.stringify(users));
    resetForm();
    console.log("USERS: ", users)
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
 * open the page for signing up
 */
function renderSignUpPage() {
    document.getElementById('signUpPage').innerHTML = renderSignUpPageHTML();
}