/**
 * Token-Generator: https://remote-storage.developerakademie.org/token-generator
 */

const STORAGE_TOKEN = '441D59WVPL1TM4PQXPZBMD2DVHMTLLM72U8YTPTA';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

const BASE_URL = "https://join-1ea34-default-rtdb.europe-west1.firebasedatabase.app/";
const FIREBASE_TASKS_ID = '-NyjPfIkvaXKtVoSc38U';
const FIREBASE_USERS_ID = '-NyjPrly5jgHTGp4FS99';
// const FIREBASE_CONTACTS_ID = '-NyjPZcKfIcCe2Aj8RQT';


/* 
--- FIREBASE ---
    
IMPORTANT:

Path ist set to default as "_" --> path="_"
because when you want tu use "firebaseUpdateItem", insert the JSON-Array to save but FORGET to insert the ID,
everything would be overwritten with path="". 

*/


/**
 * Asynchronously creates an item in Firebase using the given JSON array and path.
 *
 * @param {Array} jsonArray - The JSON array to be posted.
 * @param {string} [path="_"] - The path to the Firebase location where the item will be created. Defaults to "_".
 * @return {Promise} A Promise that resolves with the response from the Firebase server.
 */
async function firebaseCreateItem(jsonArray, path="_") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonArray)
    })
}


/**
 * Updates an item in Firebase using a PUT request.
 *
 * @param {Object} jsonArray - The JSON array to update.
 * @param {string} [path="_"] - The path to the item in Firebase. Defaults to "_".
 * @return {Promise<Response>} A Promise that resolves to the response from the PUT request.
 */
async function firebaseUpdateItem(jsonArray, path="_") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonArray)
    })
}


/**
 * Retrieves an item from Firebase using the provided path.
 *
 * @param {string} [path="_"] - The path (the id) to the item in Firebase.
 * @return {Promise<Object>} A Promise that resolves to the retrieved item as a JSON object.
 */
async function firebaseGetItem(path="_") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseAsJSON = await response.json();

    return responseAsJSON;
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
function setCurrentUser(name) {
    sessionStorage.setItem('currentUser', JSON.stringify({ username: name}));
    console.log('setCurrent has run and saved: ', loggedUser);
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




//TODELETE!!!!!!!!!!!!

function restoreUsersOnFirebase(){
    firebaseUpdateItem(users_backup, FIREBASE_USERS_ID);
}

  let users_backup = [
    {
        "contactColor": "#33ccff",
        "id": 19,
        "mail": "robina@gmail.com",
        "name": "Zist Amanfang",
        "password": "zist",
        "phone": "+49 1111 111 11 19"
    },
    {
        "contactColor": "#0059ff",
        "id": 27,
        "mail": "claudi@web.de",
        "name": "Claudi Bär",
        "password": "claudi",
        "phone": "+49 0123 456789"
    },
    {
        "contactColor": "#ff3333",
        "id": 10,
        "mail": "irene@gmail.com",
        "name": "irene fischer",
        "password": "irene",
        "phone": "+49 1111 111 11 10"
    },
    {
        "contactColor": "#ff3333",
        "id": 22,
        "mail": "ulrich@gmail.com",
        "name": "ulrich anton fuchs",
        "password": "ulrich",
        "phone": "+49 1111 111 11 22"
    },
    {
        "contactColor": "#ff6666",
        "id": 18,
        "mail": "quinn@gmail.com",
        "name": "quinn hartmann",
        "password": "quinn",
        "phone": "+49 1111 111 11 18"
    },
    {
        "contactColor": "#0059ff",
        "id": 26,
        "mail": "hanni@gmx.de",
        "name": "Hanni Hauser",
        "password": "hanni",
        "phone": "+49 0123 456789"
    },
    {
        "contactColor": "#3399ff",
        "id": 5,
        "mail": "daniel@gmail.com",
        "name": "daniel huber",
        "password": "daniel",
        "phone": "+49 1111 111 11 5"
    },
    {
        "contactColor": "#33ccff",
        "id": 7,
        "mail": "fabian@gmail.com",
        "name": "fabian koch",
        "password": "fabian",
        "phone": "+49 1111 111 11 7"
    },
    {
        "contactColor": "#66ff66",
        "id": 15,
        "mail": "nina@gmail.com",
        "name": "nina kramer",
        "password": "nina",
        "phone": "+49 1111 111 11 15"
    },
    {
        "contactColor": "#ff9933",
        "id": 20,
        "mail": "sophie@gmail.com",
        "name": "sophie lehmann",
        "password": "sophie",
        "phone": "+49 1111 111 11 20"
    },
    {
        "contactColor": "#0059ff",
        "id": 28,
        "mail": "manuel@maier.de",
        "name": "Manuel Maier",
        "password": "manuel",
        "phone": "012345"
    },
    {
        "contactColor": "#66ff66",
        "id": 29,
        "mail": "Manni@iceage.de",
        "name": "Manni Mammut",
        "password": "manni",
        "phone": "12345"
    },
    {
        "contactColor": "#ff7043",
        "id": 24,
        "mail": "mario.markwart@gmail.com",
        "name": "Mario Markwart",
        "password": "mario",
        "phone": "01753405411"
    },
    {
        "contactColor": "",
        "id": 1,
        "mail": "antom@gmail.com",
        "name": "anton mayer",
        "password": "anton",
        "phone": "+49 1111 111 11 1"
    },
    {
        "contactColor": "#76b852",
        "id": 0,
        "mail": "heinz@gmx.de",
        "name": "Heinz Mehl",
        "password": "heinz",
        "phone": "+49 0123 456789"
    },
    {
        "contactColor": "#33ccff",
        "id": 13,
        "mail": "lisa@gmail.com",
        "name": "lisa meier",
        "password": "lisa",
        "phone": "+49 1111 111 11 13"
    },
    {
        "contactColor": "#ff9933",
        "id": 8,
        "mail": "gabriela@gmail.com",
        "name": "gabriela müller",
        "password": "gabriela",
        "phone": "+49 1111 111 11 8"
    },
    {
        "contactColor": "#66ff66",
        "id": 21,
        "mail": "timo@gmail.com",
        "name": "timo müller",
        "password": "timo",
        "phone": "+49 1111 111 11 21"
    },
    {
        "contactColor": "#ff3333",
        "id": 16,
        "mail": "oscar@gmail.com",
        "name": "oscar richter",
        "password": "oscar",
        "phone": "+49 1111 111 11 16"
    },
    {
        "contactColor": "#ff3333",
        "id": 4,
        "mail": "carolin@gmail.com",
        "name": "carolin schmidt",
        "password": "carolin",
        "phone": "+49 1111 111 11 4"
    },
    {
        "contactColor": "#66ff66",
        "id": 9,
        "mail": "hans@gmail.com",
        "name": "hans schneider",
        "password": "hans",
        "phone": "+49 1111 111 11 9"
    },
    {
        "contactColor": "#3399ff",
        "id": 23,
        "mail": "schult.sebastian@googlemail.com",
        "name": "Sebastian Schult",
        "password": "sebastian",
        "phone": "015732758581"
    },
    {
        "contactColor": "#76b852",
        "id": 2,
        "mail": "schulz@hotmail.com",
        "name": "anja schulz",
        "password": "anja",
        "phone": "+49 1111 111 11 2"
    },
    {
        "contactColor": "#ff6666",
        "id": 12,
        "mail": "karolina@gmail.com",
        "name": "karolina schwarz",
        "password": "karolina",
        "phone": "+49 1111 111 11 12"
    },
    {
        "contactColor": "#ff9933",
        "id": 14,
        "mail": "max@gmail.com",
        "name": "max schwarz",
        "password": "max",
        "phone": "+49 1111 111 11 14"
    },
    {
        "contactColor": "#3399ff",
        "id": 17,
        "mail": "paula@gmail.com",
        "name": "paula vogel",
        "password": "paula",
        "phone": "+49 1111 111 11 17"
    },
    {
        "contactColor": "#ff6666",
        "id": 6,
        "mail": "emily@gmail.com",
        "name": "emily wagner",
        "password": "emily",
        "phone": "+49 1111 111 11 6"
    },
    {
        "contactColor": "#3399ff",
        "id": 11,
        "mail": "johann@gmail.com",
        "name": "johann weber",
        "password": "johann",
        "phone": "+49 1111 111 11 11"
    },
    {
        "contactColor": "#ff7043",
        "id": 3,
        "mail": "benedikt@gmail.com",
        "name": "benedikt ziegler",
        "password": "benedikt",
        "phone": "+49 1111 111 11 3"
    },
    {
        "contactColor": "#76b852",
        "id": 30,
        "mail": "micha@gmail.com",
        "name": "Micha Klein",
        "password": "micha",
        "phone": "012345"
    }
  ]