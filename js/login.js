/**
 * Initializes the login process by including HTML, setting default inputs, and starting an animation.
 */
async function loginInit() {
    checkIfUserIsRemembered();

    if (!checkIfUserWasPreviouslyRegistered()) {
        addBlueOverlay()
        showOverlay();
    };
}


/**
 * Adds a blue overlay to the 'blueOverlay' element by setting its inner HTML to the result of addBlueOverlayHTML and adding a 'blue-overlay' class to it.
 *
 * @return {void} 
 */
function addBlueOverlay() {
    let overlay = document.getElementById('blueOverlay');
    overlay.classList.add('blue-overlay');
    overlay.innerHTML = addBlueOverlayHTML();
}


/**
 * Generates HTML code for adding a blue overlay element with a logo image.
 *
 * @return {string} The HTML code for the blue overlay element.
 */
function addBlueOverlayHTML() {
    return /*html*/`<div id="logo">
        <img src="./assets/img/logo-big_white.png" alt="logo" class="joinLogoWhite logo-animation">
    </div>`
}


/**
 * Checks if a user was previously registered by retrieving the 'newMail' item from localStorage.
 * If the item exists, it sets the value of the 'loginEmailInput' element to the retrieved email and removes the 'newMail' item from localStorage.
 */
function checkIfUserWasPreviouslyRegistered() {
    if (localStorage.getItem('newMail')) {
        document.getElementById('loginEmailInput').value = localStorage.getItem('newMail');
        localStorage.removeItem('newMail');
        return true;
    }
}


/**
 * Loading users from backend
 */
async function loadUsers() {
    try {
        const response = await fetch(`${BASE_URL}auth/users/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,  // Token is required for authentication
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users. Status: ' + response.status);
        }

        users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users from the backend:', error);
    }
}


/**
 * Shows the overlay if the user is not logged in.
 */
function showOverlay() {
    // document.getElementById("blueOverlay").style.display = "flex";
    if (!getCurrentUser()) {
        document.getElementById('main').classList.add('hide-scroll');

        startAnimation();
    } else {
        switchPage('summary.html');
    }
}


/**
 * Executes an animation by displaying a blue overlay and adding a logo animation class to the logo element after a delay of 3 seconds.
 */
async function startAnimation() {
    return new Promise(resolve => {
        setTimeout(() => {
            const logo = document.getElementById("logo");
            logo.classList.add("goal");
            setTimeout(() => {
                resolve();
                hideOverlay();
            }, 500);
        }, 500);
    });
}


/**
 * Hiding the blue overlay
 */
function hideOverlay() {
    document.getElementById('main').classList.remove('hide-scroll');
    document.getElementById("blueOverlay").style.display = "none";
}


/**
 * Logs in a user by finding the user with matching email and password in the users array.
 * If a matching user is found, it sets the current user and switches the page to 'summary.html'.
 *
 * @return {boolean} Returns false to prevent the form from submitting again.
 */
async function loginUser() {
    let email = document.getElementById('loginEmailInput').value;
    let password = document.getElementById('loginPasswordInput').value;

    login(email, password).then(() => {
        return false;
    }).catch(error => {
        console.error('Error logging in:', error);
    });
}


async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();

        if (!data.token) {
            throw new Error('No token received');
        }
        const token = data.token;
        const loggedUser = data.user;
        localStorage.setItem('authToken', token);
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

        setCurrentUser(loggedUser.username);
        setRememberMe(loggedUser.username);

        loadUsers();
        switchPage('summary.html');

        return loggedUser;
    } catch (error) {
        showUserMessage('Invalid email or password. Please try again.');
        console.error('Error logging in:', error);
        throw error;
    }
}


/**
 * Sets the value of the 'rememberedUser' key in the localStorage if the 'loginCheckbox' element has the 'checked' attribute.
 * @param {string} name - The username to be stored in the 'rememberedUser' object.
 */
function setRememberMe(name) {
    if (document.getElementById('loginCheckbox').hasAttribute('checked')) {
        localStorage.setItem('rememberedUser', JSON.stringify({ username: name }));
    }
}


/**
 * Toggles the appearance of the remember me checkbox image when clicked.
 */
function toggleRememberMeCheckbox() {
    let loginCheckbox = document.getElementById('loginCheckbox');
    let loginCheckboxImg = document.getElementById('loginCheckboxImg');

    if (loginCheckbox.hasAttribute('checked')) {
        loginCheckboxImg.src = './assets/img/icon-check_button_unchecked.png';
        loginCheckbox.removeAttribute('checked');
    } else {
        loginCheckboxImg.src = './assets/img/icon-check_button_checked.png';
        loginCheckbox.setAttribute('checked', '');
    };
}


/**
 * For guest login.
 */
async function loginAsGuest() {
    try {
        const response = await fetch(`${BASE_URL}auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'guest@example.com',
                password: 'guest'
            })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            const loggedUser = data.user;

            localStorage.setItem('authToken', token);
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

            setCurrentUser(loggedUser.username);
            setRememberMe(loggedUser.username);
            switchPage('summary.html');
            return loggedUser;
        } else {
            alert('Failed to log in as guest.');
        }
    } catch (error) {
        console.error("Login error:", error);
    }
}


/**
 * Switches the page to the sign up page.
 */
function gotoSignUp() {
    switchPage('signUp.html');
}


