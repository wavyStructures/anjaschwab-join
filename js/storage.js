/**
 * Token-Generator: https://remote-storage.developerakademie.org/token-generator
 */

const STORAGE_TOKEN = '441D59WVPL1TM4PQXPZBMD2DVHMTLLM72U8YTPTA';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

const BASE_URL = "https://join-1ea34-default-rtdb.europe-west1.firebasedatabase.app/";

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

/**
 * 
 * @param {string} key - the key the values are stored in
 * @returns the users json
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with the key "${key}"`;
    });
}


// Firebase Storage
/*
async function remoteStorageSetItem(path="") {
    let response = await fetch(BASE_URL + path, + ".json");
    return responseToJSON = await response.json();
    }

async function getItem(path="", data={}){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}*/

/*
TODO:
- setItem und getItem für Kontakte (contacts[])
- setItem und getItem für cards (cards[])
*/
/*
/**
 * Sets the currently logged in user in the local storage.
 *
 * @param {Object} loggedUser - The user object representing the logged in user.
 * @return {void} This function does not return anything.
 */
function setCurrentUser(loggedUser) {
    localStorage.setItem('currentUser', JSON.stringify(loggedUser)); //TODO   localStorage.setItem('currentUser', loggedUser);
    console.log('setCurrent has run and saved: ', loggedUser);
}

/**
 * Retrieves the currently logged in user from the local storage.
 *
 * @return {Object} The user object representing the logged in user, parsed from the local storage.
 */
function getCurrentUser() {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser;
    }
}
