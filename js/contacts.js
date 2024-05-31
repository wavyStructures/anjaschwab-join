let contacts = [];
let localVersionIndex = 0;

/**
 * Retrieves the contacts from the remote storage asynchronously.
 *
 * @return {Promise<Array>} A promise that resolves to an array of contacts.
 */
async function getContactsFromRemoteStorage() {
  // REMOTE STORAGE
  // return await remoteStorageGetItem("contacts").then((res) => JSON.parse(res)); 
  
  // FIREBASE
  return firebaseGetItem(FIREBASE_CONTACTS_ID);
}

/**
 * Asynchronously saves the contacts to the remote storage.
 *
 * @return {Promise<void>} A promise that resolves when the contacts are successfully saved.
 */
async function resetContactsOnRemoteStorage() {
  // REMOTE STORAGE
  //  return await remoteStorageSetItem("contacts", JSON.stringify(contacts_old));

   // FIREBASE
   return firebaseUpdateItem(contacts_old, FIREBASE_CONTACTS_ID);
}

/**
 * Asynchronously retrieves the local and remote versions of the application.
 *
 * @return {Promise<[number, string]>} A promise that resolves to an array containing the local version index and the remote version string.
 */
async function getVersions() {
  let localVersion = localVersionIndex;
  let remoteVersion = await remoteStorageGetItem("versionIndex");

  return [localVersion, remoteVersion];
}


/**
 * Loads the contacts from storage.
 */
async function loadContactsStorage() {
  try {
      contacts = await getContactsFromRemoteStorage();
      console.log("Contacts loaded from online storage.")
  } catch (error) {
    console.error("Loading error:", error);
  }
}

/**
 * Finds the maximum id in the contactsArray and returns the next id.
 *
 * @param {Array} contactsArray - An array of contacts with ids.
 * @return {number} The next id after the maximum id in the contactsArray.
 */
function getNextId(contactsArray) {
  let maxId = 0;
  contactsArray.forEach((contact) => {
    if (contact.id > maxId) {
      maxId = contact.id;
    }
  });
  return maxId + 1;
}

/**
 * Initializes the contacts by including the HTML, loading the contacts, and checking the version index.
 */
/*
async function contactsInit() {
  includeHTML();

  // Load contacts from storage
  await loadContactsStorage();

  // Check the version index in online storage
  await ckeckOnlineVersionIndex();

  // Load contacts after ensuring the version index is up to date
  loadContacts();
}*/


/**
 * Saves the version index to Firebase Realtime Database.
 */
async function saveOnlineVersionIndex(versionIndex) {
  await remoteStorageSetItem("versionIndex", versionIndex);
}

/**
 * Saves a contact by pushing it to the contacts array and storing it in local storage.
 */
async function saveContact() {
  await loadContactsStorage(); // Load contacts from online storage to be sure to have the newest contacts.

  try {
    createBtn.disabled = true;
    const newId = getNextId(contacts);
    contacts.push({
      id: newId,
      name: contactName.value,
      mail: contactMail.value,
      phone: contactPhone.value,
      contactColor: generateRandomColor(),
    });

    // FIREBASE
    await firebaseUpdateItem(contacts, FIREBASE_CONTACTS_ID);
    
    resetContactForm();
    closeAddContact();
    loadContacts();
  } catch (error) {
    console.error("Error saving contact:", error);
  }
  displaySuccessMessage()
}

/**
 * Displays the success message container when a contact is successfully created.
 *
 * @returns {void}
 */
function displaySuccessMessage() {
  const overlay = document.querySelector('.contact-succ-created-overlay');
  if (overlay) {
    overlay.classList.add('slide-in'); // Container einblenden

    // Timeout, um den Container nach 3 Sekunden wieder auszublenden
    setTimeout(() => {
      overlay.classList.add('slide-out'); // Animation zum Ausblenden hinzufügen
      setTimeout(() => {
        overlay.classList.remove('slide-in', 'slide-out'); // Animation beenden
      }, 500); // Timeout für die Dauer der Ausblendanimation
    }, 1000); // Timeout für 3 Sekunden Anzeigedauer
  } else {
    console.error("Error: Overlay element not found.");
  }
}

/**
 * Finds the maximum id in the contactsArray and returns the next id.
 */
function getNextId(contactsArray) {
  let maxId = 0;
  contactsArray.forEach((contact) => {
    if (contact.id > maxId) {
      maxId = contact.id;
    }
  });
  return maxId + 1;
}

/**
 * Resets the contact form by clearing the input fields and enabling the create button.
 *
 * @param {void}
 * @return {void}
 */
function resetContactForm() {
  contactName.value = "";
  contactMail.value = "";
  contactPhone.value = "";
  createBtn.disabled = false;
}

/**
 * Array containing contact objects.
 *
 * @type {Object[]}
 * @property {number} id - The unique identifier of the contact.
 * @property {string} name - The name of the contact.
 * @property {string} mail - The email address of the contact.
 * @property {string} phone - The phone number of the contact.
 * @property {string} contactColor - The color associated with the contact.
 */

let contacts_old = [
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
      "id": 2,
      "mail": "schulz@hotmail.com",
      "name": "anja schulz",
      "password": "anja",
      "phone": "+49 1111 111 11 2"
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
      "contactColor": "#ff3333",
      "id": 4,
      "mail": "carolin@gmail.com",
      "name": "carolin schmidt",
      "password": "carolin",
      "phone": "+49 1111 111 11 4"
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
      "contactColor": "#ff6666",
      "id": 6,
      "mail": "emily@gmail.com",
      "name": "emily wagner",
      "password": "emily",
      "phone": "+49 1111 111 11 6"
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
      "contactColor": "#ff9933",
      "id": 8,
      "mail": "gabriela@gmail.com",
      "name": "gabriela müller",
      "password": "gabriela",
      "phone": "+49 1111 111 11 8"
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
      "contactColor": "#ff3333",
      "id": 10,
      "mail": "irene@gmail.com",
      "name": "irene fischer",
      "password": "irene",
      "phone": "+49 1111 111 11 10"
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
      "contactColor": "#ff6666",
      "id": 12,
      "mail": "karolina@gmail.com",
      "name": "karolina schwarz",
      "password": "karolina",
      "phone": "+49 1111 111 11 12"
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
      "id": 14,
      "mail": "max@gmail.com",
      "name": "max schwarz",
      "password": "max",
      "phone": "+49 1111 111 11 14"
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
      "contactColor": "#ff3333",
      "id": 16,
      "mail": "oscar@gmail.com",
      "name": "oscar richter",
      "password": "oscar",
      "phone": "+49 1111 111 11 16"
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
      "id": 18,
      "mail": "quinn@gmail.com",
      "name": "quinn hartmann",
      "password": "quinn",
      "phone": "+49 1111 111 11 18"
  },
  {
      "contactColor": "#33ccff",
      "id": 19,
      "mail": "robin@gmail.com",
      "name": "zist amanfang",
      "password": "robin",
      "phone": "+49 1111 111 11 19"
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
      "contactColor": "#66ff66",
      "id": 21,
      "mail": "timo@gmail.com",
      "name": "timo müller",
      "password": "timo",
      "phone": "+49 1111 111 11 21"
  },
  {
      "contactColor": "#ff3333",
      "id": 22,
      "mail": "ulrich@gmail.com",
      "name": "ulrich anton fuchs",
      "password": "ulrich",
      "phone": "+49 1111 111 11 22"
  }
];

/**
 * Initializes the contacts by including the HTML and loading the contacts.
 *
 * @return {void} This function does not return anything.
 */
async function contactsInit() {
  includeHTML();
  await loadContactsStorage();
  loadContacts();
}

/**
 * Loads the contacts and renders them into the main element.
 *
 * @function loadContacts
 * @returns {void}
 */
function loadContacts() {
  const main = document.getElementById("main");
  main.innerHTML = ``;
  createContactsContainer(main);
  const sortedContacts = sortContactsByName(contacts);
  renderSortedContacts(main, sortedContacts);
}

/**
 * Sorts an array of contacts by their last name.
 *
 * @param {Array} contacts - The array of contacts to be sorted.
 * @return {Array} - The sorted array of contacts.
 */
function sortContactsByName(contacts) {
  let sortedContacts = contacts.slice().sort((a, b) => {
    const lastNameA = getSecondOrFullName(a).toLowerCase();
    const lastNameB = getSecondOrFullName(b).toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });
  return sortedContacts;
}

/**
 * A function that extracts and returns the last name if multiple names are provided, otherwise returns the single name.
 *
 * @param {Object} contact - The contact object containing the name to extract from.
 * @return {string} The extracted last name or single name from the contact.
 */
function getSecondOrFullName(contact) {
  const names = contact.name.split(" ");
  if (names.length === 1) {
    return names[0]; // Wenn nur ein Name vorhanden ist, diesen zurückgeben
  } else {
    return names[names.length - 1]; // Sonst den letzten Namen zurückgeben
  }
}

/**
 * Renders the sorted contacts into the main element.
 *
 * @function renderSortedContacts
 * @param {HTMLElement} main - The main element to render contacts into.
 * @param {Array} sortedContacts - The sorted array of contacts.
 * @returns {void}
 */
function renderSortedContacts(main, sortedContacts) {
  const currentFirstLetters = [];

  sortedContacts.forEach((contact) => {
    const { id, name, mail, phone, contactColor } = contact;
    const initials = getInitials(name);
    const firstLetter = name
      .split(" ")
      [name.split(" ").length - 1].charAt(0)
      .toUpperCase();

    if (!currentFirstLetters.includes(firstLetter)) {
      createFirstLetter(main, firstLetter);
      currentFirstLetters.push(firstLetter);
    }

    createContactCard(main, id, contactColor, initials, name, mail);
  });
}

/**
 * Displays the add contact card by removing the d-none class from the corresponding container.
 *
 * @function addContactCard
 * @returns {void}
 */
function addContactCard() {

  if (!document.getElementById("addContact")){
    renderAddContacts();
  }
  document.getElementById("addContact").innerHTML = renderAddContactsHTML();
  addOverlay("closeOverlay('addContact')");
}

function addOverlay(functionToAdd){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const bodyContent = document.getElementById("bodyContent");
    overlay.setAttribute("onclick", functionToAdd);

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
}

// /**
//  * Hides the add contact card by removing it from the DOM.
//  *
//  * @function closeAddContact
//  * @returns {void}
//  */
// function closeAddContact() {
//   const addContactContainer = document.getElementById("addContact");
//   if (!addContactContainer.classList.contains("d-none")) {
//     addContactContainer.classList.add("move-out-right");
//     setTimeout(() => {
//       addContactContainer.classList.add("d-none");
//       addContactContainer.classList.remove("move-out-right");
//     }, 125);
//     const overlay = document.querySelector(".overlay");
//     if (overlay) {
//       overlay.remove();
//     }
//     document.body.style.overflow = "auto";
//   }
//   hideAddContactContainer();
// }

function closeOverlay(id) {
	const container = document.getElementById(id);
	container.classList.add("move-out-right");
	setTimeout(() => {
		addContactContainer.classList.remove("move-out-right");
	}, 125);
	const overlay = document.querySelector(".overlay");
	if (overlay) overlay.remove(); 
  
	document.body.style.overflow = "auto";

	removeContainer(id);
}

/**
 * Generates initials from a full name.
 *
 * @param {string} name - The full name from which to generate initials.
 * @returns {string} The initials generated from the provided full name.
 */
function getInitials(name) {
  let returnName = "";
  if (name.includes(" ")) {
    let [firstName, lastName] = name.split(" ");
    let firstInitial = firstName.charAt(0).toUpperCase();
    let lastInitial = lastName.charAt(0).toUpperCase();
    returnName = firstInitial + lastInitial;
  } else {
    returnName = name.charAt(0).toUpperCase();
  }
  return returnName;
}

/**
 * Creates a letter element representing the first letter of a group of contacts.
 *
 * @function createFirstLetter
 * @param {HTMLElement} main - The main element where the letter element will be appended.
 * @param {string} firstLetter - The first letter to be displayed.
 * @returns {void}
 */
function createFirstLetter(main, firstLetter) {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add("contact-list-letter");
  letterDiv.textContent = firstLetter;
  main.querySelector(".contact-list").appendChild(letterDiv);

  createPartingLine(main);
}

/**
 * Creates a container for displaying contacts and appends it to the main element.
 *
 * @function createContactsContainer
 * @param {HTMLElement} main - The main element where the container will be appended.
 * @returns {void}
 */
function createContactsContainer(main) {
  const containerHTML = generateContactsContainerHTML();
  main.innerHTML += containerHTML;
}

/**
 * Creates a parting line element and appends it to the contact list within the main element.
 *
 * @function createPartingLine
 * @param {HTMLElement} main - The main element containing the contact list.
 * @returns {void}
 */
function createPartingLine(main) {
  const partingLineContainer = document.createElement("div");
  partingLineContainer.classList.add("parting-line-container");
  partingLineContainer.id = "parting-line-container";

  const partingLine = document.createElement("div");
  partingLine.classList.add("parting-line");
  partingLine.id = "parting-line";

  partingLineContainer.appendChild(partingLine);
  main.querySelector(".contact-list").appendChild(partingLineContainer);
}

/**
 * Generates HTML code for the contacts container.
 *
 * @function generateContactsContainerHTML
 * @returns {string} The HTML code for the contacts container.
 */
function generateContactsContainerHTML() {
  return /*html*/ ` 
  <div id="contactMainEdit" class="contact-main-edit" onclick="doNotClose(event)">
    
</div>
<div class="contact-list-container">
    <div class="add-contact-overlay"></div>
    <div id="addContactContainer" class="hidden">
        
    </div>
</div>
<div class="contacts-container" id="contacts-container">

    <div class="button-add-contact-card" id="button-add-contact-card" onclick="doNotClose(event)">
        <div onclick="addContactCard()" class="button-add-contact">
            <div class="add-new-contact">Add new contact</div>
            <img src="./assets/img/icon-person_add.png" alt="icon-person_add.png">
        </div>
    </div>
    <div class="contact-list" id="contactList">
    </div>
</div>
<section class="right-side d-none" id="rightSide">

</section>
    `;
}

function renderAddContacts(){
  let newDiv = document.createElement('div');
  newDiv.id = 'addContact';
  setAttributes(newDiv, {
    'class':'add-contact',
    'onclick':'doNotClose(event)'
  })
  document.getElementById('addContactContainer').appendChild(newDiv);
}

function renderAddContactsHTML(){
  return /*html*/`
        <div class="add-contact-header">
            <div class="add-contact-header-close">
                <img onclick="closeOverlay('addContact')" src="./assets/img/icon-close_white.png" alt="closeAddContact">
            </div>
        </div>
        <div class="add-contact-header-logo">
            <img src="./assets/img/logo-medium_white.png" alt="">
            <span>Add Contact</span>
            <p>Tasks are better with a team!</p>
        </div>
        <div class="add-contact-bottom">
            <div class="profile-badge-group-add-contact">
                <div class="profile-badge-add-contact">
                    <img src="./assets/img/add.contact-badge.png" alt="">
                </div>
            </div>
            <form onsubmit="saveContact(); return false" class="add-contact-input-group">
                <div class="input-frame">
                    <input id="contactName" type="text" placeholder="Name" autofocus required>
                    <img src="./assets/img/icon-person.png" alt="">
                </div>
                <div class="input-frame">
                    <input id="contactMail" type="email" placeholder="Email" autofocus required>
                    <img src="./assets/img/icon-mail.png" alt="">
                </div>
                <div class="input-frame">
                    <input id="contactPhone" type="tel" placeholder="Phone" autofocus required>
                    <img src="./assets/img/icon-call.png" alt="">
                </div>
                <div id="addContactButton" class="addContactButton">
                    <button class="cancelButton" onclick="closeOverlay('addContact')" onmouseover="changeCancelIcon()"
                        onmouseout="restoreCancelIcon()">Cancel
                        <img id="cancelIcon" src="./assets/img/icon-cancel.png" alt="">
                    </button>
                    <button id="createBtn" class="createButton">Create contact
                        <img id="createIcon" src="./assets/img/icon-check.png" alt="">
                    </button>
                </div>
            </form>
</div>`
}

function renderEditContact(){
  let newDiv = document.createElement('div');
  newDiv.id = 'editContact';
  setAttributes(newDiv, {
    'class':'edit-contact'
  })
  document.getElementById('contactMainEdit').appendChild(newDiv);
}


function renderEditContactHTML() {
  return /*html*/ `
        <div class="edit-contact-header">
            <div class="edit-contact-header-close">
                <img onclick="closeOverlay('editContact')" src="./assets/img/icon-close_white.png" alt="closeAddContact">
            </div>
        </div>
        <div class="edit-contact-header-logo">
            <img src="./assets/img/logo-medium_white.png" alt="">
            <span>Edit contact</span>
            <p>Tasks are better with a team!</p>
        </div>

        <div class="edit-contact-bottom">
            <div class="profile-badge-group-add-contact">
                <div class="profile-badge-add-contact">
                    <img src="./assets/img/add.contact-badge.png" alt="">
                </div>
            </div>
            <form action="" onsubmit="createNewContact(); return false" class="add-contact-input-group">
                <div class="input-frame">
                    <input id="contactName" type="text" placeholder="Name" autofocus required>
                    <img src="./assets/img/icon-person.png" alt="">
                </div>
                <div class="input-frame">
                    <input id="contactMail" type="email" placeholder="Email" autofocus required>
                    <img src="./assets/img/icon-mail.png" alt="">
                </div>
                <div class="input-frame">
                    <input id="contactPhone" type="tel" placeholder="Phone" autofocus required>
                    <img src="./assets/img/icon-call.png" alt="">
                </div>
                <div id="addContactButton" class="addContactButton">
                    <button class="cancelButton" onclick="closeOverlay('editContact')" onmouseover="changeCancelIcon()"
                        onmouseout="restoreCancelIcon()">Cancel
                        <img id="cancelIcon" onclick="closeOverlay('editContact')" src="./assets/img/icon-cancel.png" alt="">
                    </button>
                    <button class="createButton">Edit contact
                        <img id="createIcon" onclick="saveEditedContact()" src="./assets/img/icon-check.png" alt="">
                    </button>
                </div>
            </form>
        </div>`
}


// Funktion zum Anzeigen des Containers
function showAddContactContainer() {
  const addContactContainer = document.getElementById("addContactContainer");
  addContactContainer.classList.remove("hidden");
}

// Funktion zum Ausblenden des Containers
function removeContainer(id) {
  document.getElementById(id).remove();
}

/**
 * Creates a contact card element and appends it to the contact list within the main element.
 *
 * @function createContactCard
 * @param {HTMLElement} main - The main element containing the contacts container.
 * @param {number} id - The unique identifier for the contact.
 * @param {string} color - The color associated with the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @returns {void}
 */
function createContactCard(main, id, color, initials, name, mail) {
  const shorterMail = mail.length > 20 ? mail.substring(0, 20) + "..." : mail;
  const cardHTML = generateContactCardHTML(
    id,
    color,
    initials,
    name,
    mail,
    shorterMail
  );
  const container = main.querySelector(".contacts-container");
  container
    .querySelector(".contact-list")
    .insertAdjacentHTML("beforeend", cardHTML);
}

/**
 * Generates the HTML code for a contact card.
 *
 * @param {number} contactId - The unique identifier for the contact.
 * @param {string} profileColor - The color associated with the contact's profile.
 * @param {string} initials - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} shortEmail - The shortened version of the email address.
 * @return {string} The HTML code for the contact card.
 */
function generateContactCardHTML(
  contactId,
  profileColor,
  initials,
  name,
  email,
  shorterMail
) {
  let formattedName = getNameWithCapitalizedFirstLetter(name);

  return /*html*/ `
    <div class="contact-card" id="contact-card-${contactId}" onclick="openContactDetails(${contactId})">
      <div class="profile-badge-group" style="background-color: ${profileColor}">${initials}</div>
      <div>
        <span class="contact-card-name">${formattedName}</span><br>
        <a class="contact-card-email">${shorterMail}</a>
      </div>
    </div>
  `;
}

/**
 * Capitalizes the first letter of each word in a given name.
 *
 * @param {string} name - The name to be capitalized.
 * @return {string} The capitalized name.
 */
function getNameWithCapitalizedFirstLetter(name) {
  let [firstname, lastname, surname] = name.split(" ");
  firstname = firstname[0].toUpperCase() + firstname.slice(1);
  if (lastname) {
    lastname = lastname[0].toUpperCase() + lastname.slice(1);
  }
  if (surname) {
    surname = surname[0].toUpperCase() + surname.slice(1);
    return firstname + " " + (lastname ? lastname + " " : "") + surname;
  } else {
    return firstname + (lastname ? " " + lastname : "");
  }
}

/**
 * Displays details of the contact with the given ID.
 * @param {number} id - The unique identifier of the contact.
 */
function openContactDetails(id) {
  const contact = contacts.find(({ id: contactId }) => contactId === id);
  const { name, mail, phone } = contact;
  const contactDetailsHTML = generateContactDetailsHTML(name, mail, phone, id);
  const rightSide = document.getElementById("rightSide");
  rightSide.classList.remove("d-none");
  rightSide.innerHTML = contactDetailsHTML;
  highlightSelectedContact(id);
}

/**
 * Resets contact card styles to their default values.
 *
 * @param {HTMLElement} card The contact card element.
 */
function resetContactCard(card) {
  card.style.backgroundColor = "";
  card.style.color = "";
  const badgeGroup = card.querySelector(".profile-badge-group");
  if (badgeGroup) {
    badgeGroup.classList.remove("profileBadgeChoosen");
  }
  const emailEl = card.querySelector(".contact-card-email");
  if (emailEl) {
    emailEl.style.color = "";
  }
}

/**
 * Resets the styles of all contact cards to their default values.
 *
 * @function resetAllContactCards
 * @returns {void}
 */
function resetAllContactCards() {
  const allContactCards = document.querySelectorAll(".contact-card");
  allContactCards.forEach(resetContactCard);
}

/**
 * Highlights a contact card by applying specific styles.
 *
 * @function highlightContactCard
 * @param {HTMLElement} card - The contact card element to be highlighted.
 * @returns {void}
 */
function highlightContactCard(card) {
  card.style.backgroundColor = "#4589ff";
  card.style.color = "white";
  const badgeGroup = card.querySelector(".profile-badge-group");
  if (badgeGroup) {
    badgeGroup.classList.add("profileBadgeChoosen");
  }
  const emailElement = card.querySelector(".contact-card-email");
  if (emailElement) {
    emailElement.style.color = "white";
  }
}

/**
 * Highlights the selected contact card and resets all others if already highlighted.
 *
 * @function highlightSelectedContact
 * @param {number} id - The unique identifier of the selected contact.
 * @returns {void}
 */
function highlightSelectedContact(id) {
  const selectedContactCard = document.getElementById(`contact-card-${id}`);
  if (!selectedContactCard) return;

  const rightSideElement = document.getElementById("rightSide");

  if (selectedContactCard.classList.contains("highlighted")) {
    removeHighlight(selectedContactCard, rightSideElement);
  } else {
    applyHighlight(selectedContactCard, rightSideElement);
  }
}

/**
 * Removes the highlighting from the selected contact card and hides the right side element.
 *
 * @function removeHighlight
 * @param {HTMLElement} selectedContactCard - The selected contact card element.
 * @param {HTMLElement} rightSideElement - The right side element to be hidden.
 * @returns {void}
 */
function removeHighlight(selectedContactCard, rightSideElement) {
  if (rightSideElement) {
    rightSideElement.classList.add("d-none");
  }
  resetContactCard(selectedContactCard);
  selectedContactCard.classList.remove("highlighted");
}

/**
 * Applies highlighting to the selected contact card and shows the right side element.
 *
 * @function applyHighlight
 * @param {HTMLElement} selectedContactCard - The selected contact card element.
 * @param {HTMLElement} rightSideElement - The right side element to be shown.
 * @returns {void}
 */
function applyHighlight(selectedContactCard, rightSideElement) {
  resetAllContactCards();
  highlightContactCard(selectedContactCard);
  selectedContactCard.classList.add("highlighted");
  if (rightSideElement) {
    rightSideElement.classList.remove("d-none");
  }
}

/**
 * Generates HTML code for displaying contact details.
 *
 * @function generateContactDetailsHTML
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @returns {string} The HTML code for displaying contact details.
 */
function generateContactDetailsHTML(name, email, phone, id) {
  return /*html*/ `
    <div class="contact-Details">
      <div class="contact-details-header" id="contactDetailsHeader">
        <div class="contact-details-badge-group">
          <div class="contact-details-badge">
            <div class="contact-details-badge-initials">${getInitials(
              name
            )}</div>
          </div>
        </div>
        <div class="contact-details-name-group">
          <div class="contact-details-name">${name}</div>
          <div class="contact-details-icons">
            <div class="icon-edit" onclick="editContact(${id})">
              <img src="./assets/img/icon-edit.png" alt="">Edit
            </div>
            <div class="icon-delete" onclick="removeContact(${id})">
              <img src="./assets/img/icon-delete.png" alt="">Delete
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="contact-information">Contact Information
        <div class="contact-email-container" id="contactEmailContainer">
          <div class="contact-information-mail-header" >Email</div>
          <a class="contact-information-mail" href="mailto:${email}">${email}</a>
        </div>
      </div>
      <div>
        <div class="contact-phone-container">
          <div class="contact-phone-container-header">Phone</div>
          <div class="contact-phone-container-phone">${phone}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Changes the cancel icon to its hover state by updating its source.
 *
 * @function changeCancelIcon
 * @returns {void}
 */
function changeCancelIcon() {
  document.getElementById("cancelIcon").src =
    "./assets/img/icon-cancel_hover.png";
}

/**
 * Restores the cancel icon to its default state by updating its source.
 *
 * @function restoreCancelIcon
 * @returns {void}
 */
function restoreCancelIcon() {
  document.getElementById("cancelIcon").src = "./assets/img/icon-cancel.png";
}

/**
 * Generates a random color from a predefined list of colors.
 *
 * @function generateRandomColor
 * @returns {string} A randomly selected color.
 */
function generateRandomColor() {
  const colors = [
    "#76b852",
    "#ff7043",
    "#ff3333",
    "#3399ff",
    "#ff6666",
    "#33ccff",
    "#ff9933",
    "#66ff66",
    "#0059ff",
    "#a64dff",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function changeColor() {
  contacts_old.forEach((contact) => {
    for(let i = 0; i < colors.length; i++) {
      if(contact.contactColor == colors[i]) {
        contact.contactColor = newColors[i];
      }
    }
  })
}
/**
 * Deletes all contacts by clearing the contacts array and updating the storage.
 *
 * @return {Promise<void>} Promise that resolves once contacts are deleted.
 */
async function delAllContacts() {
  contacts = [];
  await remoteStorageSetItem("contacts", JSON.stringify(contacts));
  console.log("contacts: ", contacts);
}

/**
 * Edits the contact with the specified ID.
 *
 * @param {number} id - The unique identifier of the contact to be edited.
 * @returns {void}
 */
function editContact(id) {
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    const contact = contacts[contactIndex];

    // Funktion zum Großschreiben des ersten Buchstabens jedes Wortes im Namen
    const capitalizeWords = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    contact.name = capitalizeWords(contact.name);

    editContactCard();
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactMail').value = contact.mail;
    document.getElementById('contactPhone').value = contact.phone;
    // document.getElementById('contactId').value = contact.id;

    // Logik zum Bearbeiten des Kontakts implementieren,
    // Anzeigen des Formulars mit den vorhandenen Kontaktinformationen
    // Aktualisieren der Kontaktinformationen nach der Bearbeitung.
    console.log("Editing contact:", contact);
  } else {
    console.error("Contact not found with ID:", id);
  }
}

/**
 * Saves the edited contact by updating the contact object with the values from the input fields.
 * If the contact is found in the contacts array, it is updated and logged to the console.
 * If the contact is not found, an error message is logged to the console.
 *
 * @return {undefined} This function does not return a value.
 */
function saveEditedContact() {
  const id = document.getElementById('contactId').value;
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    const contact = contacts[contactIndex];

    contact.name = document.getElementById('contactName').value;
    contact.mail = document.getElementById('contactMail').value;
    contact.phone = document.getElementById('contactPhone').value;

    //await firebaseUpdateItem(contact, id);

    console.log("Contact saved:", contact);
    alert("Contact saved successfully!");
  } else {
    console.error("Contact not found with ID:", id);
  }
}

/**
 * Removes the "d-none" class from the "editContact" element, making it visible.
 *
 * @return {void} This function does not return a value.
 */
function editContactCard() {
   if (!document.getElementById('editContact')){
    renderEditContact();
   }
   document.getElementById("editContact").innerHTML = renderEditContactHTML();
   addOverlay("closeOverlay('editContact')");
}

/**
 * Deletes a contact from the local storage.
 *
 * @param {number} contactId - The ID of the contact to be deleted.
 * @return {undefined} This function does not return a value.
 */
function deleteContactFromLocalStorage(contactId) {
  var contacts = JSON.parse(localStorage.getItem("contacts"));

  if (contacts) {
    contacts = contacts.filter(function (contact) {
      return contact.id !== contactId;
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

/**
 * Deletes the contact with the specified ID.
 *
 * @param {number} id - The unique identifier of the contact to be deleted.
 * @returns {void}
 */
async function deleteContact(id) {
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);
    
    // REMOTE STORAGE
    // await remoteStorageSetItem("contacts", JSON.stringify(contacts));

    // FIREBASE
    await firebaseUpdateItem(contacts, FIREBASE_CONTACTS_ID);
    
    console.log("Contact deleted successfully.");
  } else {
    console.error("Contact not found with ID:", id);
  }
}

/**
 * Removes a contact from the local storage and reinitializes the contacts list.
 *
 * @param {number} id - The unique identifier of the contact to be removed.
 * @return {void} This function does not return anything.
 */
function removeContact(id) {
  deleteContactFromLocalStorage(id);
  deleteContact(id);
  contactsInit();
}
