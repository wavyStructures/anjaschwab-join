const BASE_URL = 'http://127.0.0.1:8000/';


/**
das wird REGISTER
 */
async function firebaseCreateItem(jsonArray, path = "_") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonArray)
    })
}
/**
UPDATE PUT
 */
async function firebaseUpdateItem(jsonArray, path = "_") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonArray)
    })
}
/**
GET
 */
async function backendGetItem(username, password) {
    try {
        const response = await postRequest(`${BASE_URL}api/token/`, { username, password });

        if (response.ok) {
            const data = await response.json();
            handleSuccessfulLogin(data);
            return data;
        } else {
            await handleLoginError(response);
        }
    } catch (error) {
        handleError(error);
    }
}
async function postRequest(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

function handleSuccessfulLogin(data) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.user_id);
    localStorage.setItem('username', data.username);
    window.location.href = '/dashboard.html';
}

async function handleLoginError(response) {
    const errorData = await response.json();
    const errorMessage = errorData.non_field_errors || 'Login failed. Please try again.';
    document.getElementById('errorMessage').textContent = errorMessage;
}

function handleError(error) {
    console.error('Error:', error);
    document.getElementById('errorMessage').textContent =
        'Something went wrong. Please try again later.';
}


/**
 * 
 * @param {string} key - the key the values are stored in
 * @returns the users json
 */
async function remoteStorageGetItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with the key "${key}"`;
    });
}


/*
/**
 * Sets the currently logged in user in the local storage.
 *
 * @param {Object} loggedUser - The user object representing the logged in user.
 * @return {void} This function does not return anything.
 */
function setCurrentUser(name) {
    sessionStorage.setItem('currentUser', JSON.stringify({ username: name }));
}


/**
 * Retrieves the currently logged in user from the local storage.
 *
 * @return {Object} The user object representing the logged in user, parsed from the local storage.
 */
function getCurrentUser() {
    const currentUserJSON = sessionStorage.getItem('currentUser');
    if (currentUserJSON) {
        const currentUser = JSON.parse(currentUserJSON);
        return currentUser;
    }
}


function restoreUsersOnFirebase() {
    firebaseUpdateItem(users_backup, FIREBASE_USERS_ID);
}


/**
 * 
 * @param {string} key - the key the value can be found
 * @param {string} value - the value for the key
 * @returns 
 */
async function remoteStorageSetItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}