const STORAGE_URL1 = 'https://join-1ea34-default-rtdb.europe-west1.firebasedatabase.app/';

/*async function setItem(key, value) {
    const payload = { key, value };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
      .then(res => res.json());
}*/
let contacts = [];

/**
 * Loads the contacts.
 * 
 */
async function loadContactsStorrage() {
  try {
      contacts = JSON.parse(await getItem('contacts'));
      console.log('contacts: ', contacts);
      
  } catch (e) {
      console.error('Loading error:', e);
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
  contactsArray.forEach(contact => {
      if (contact.id > maxId) {
          maxId = contact.id;
      }
  });
  return maxId + 1;
}


/**
 * Saves a contact by pushing it to the contactUsers array and storing it in local storage.
 *
 * @return {Promise<void>} A promise that resolves when the contact is saved.
 */
async function saveContact() {
      createBtn.disabled = true;
      const newId = getNextId(contacts);
      contacts.push({
      id: newId,
      name: contactName.value,
      mail: contactMail.value,
      phone: contactPhone.value,
      contactColor: generateRandomColor(),
    });
    await setItem('contacts', JSON.stringify(contacts));

    resetContactForm();
    closeAddContact();
    await loadContactsStorrage();
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
/*
let contacts = [
  
  {
    id: 1,
    name: "anton mayer",
    mail: "antom@gmail.com",
    password: "anton",
    phone: "+49 1111 111 11 1",
    contactColor: ""
  },
  {
    id: 2,
    name: "anja schulz",
    mail: "schulz@hotmail.com",
    password: "anja",
    phone: "+49 1111 111 11 2",
    contactColor: "#c2e59c"
  },
  {
    id: 3,
    name: "benedikt ziegler",
    mail: "benedikt@gmail.com",
    password: "benedikt",
    phone: "+49 1111 111 11 3",
    contactColor: "#ffcc80"
  },
  {
    id: 4,
    name: "carolin schmidt",
    mail: "carolin@gmail.com",
    password: "carolin",
    phone: "+49 1111 111 11 4",
    contactColor: "#ff9999"
  },
  {
    id: 5,
    name: "daniel huber",
    mail: "daniel@gmail.com",
    password: "daniel",
    phone: "+49 1111 111 11 5",
    contactColor: "#99ccff"
  },
  {
    id: 6,
    name: "emily wagner",
    mail: "emily@gmail.com",
    password: "emily",
    phone: "+49 1111 111 11 6",
    contactColor: "#ffb3b3"
  },
  {
    id: 7,
    name: "fabian koch",
    mail: "fabian@gmail.com",
    password: "fabian",
    phone: "+49 1111 111 11 7",
    contactColor: "#b3d9ff"
  },
  {
    id: 8,
    name: "gabriela müller",
    mail: "gabriela@gmail.com",
    password: "gabriela",
    phone: "+49 1111 111 11 8",
    contactColor: "#ffcc99"
  },
  {
    id: 9,
    name: "hans schneider",
    mail: "hans@gmail.com",
    password: "hans",
    phone: "+49 1111 111 11 9",
    contactColor: "#ccffcc"
  },
  {
    id: 10,
    name: "irene fischer",
    mail: "irene@gmail.com",
    password: "irene",
    phone: "+49 1111 111 11 10",
    contactColor: "#ff9999"
  },
  {
    id: 11,
    name: "johann weber",
    mail: "johann@gmail.com",
    password: "johann",
    phone: "+49 1111 111 11 11",
    contactColor: "#99ccff"
  },
  {
    id: 12,
    name: "karolina schwarz",
    mail: "karolina@gmail.com",
    password: "karolina",
    phone: "+49 1111 111 11 12",
    contactColor: "#ffb3b3"
  },
  {
    id: 13,
    name: "lisa meier",
    mail: "lisa@gmail.com",
    password: "lisa",
    phone: "+49 1111 111 11 13",
    contactColor: "#b3d9ff"
  },
  {
    id: 14,
    name: "max schwarz",
    mail: "max@gmail.com",
    password: "max",
    phone: "+49 1111 111 11 14",
    contactColor: "#ffcc99"
  },
  {
    id: 15,
    name: "nina kramer",
    mail: "nina@gmail.com",
    password: "nina",
    phone: "+49 1111 111 11 15",
    contactColor: "#ccffcc"
  },
  {
    id: 16,
    name: "oscar richter",
    mail: "oscar@gmail.com",
    password: "oscar",
    phone: "+49 1111 111 11 16",
    contactColor: "#ff9999"
  },
  {
    id: 17,
    name: "paula vogel",
    mail: "paula@gmail.com",
    password: "paula",
    phone: "+49 1111 111 11 17",
    contactColor: "#99ccff"
  },
  {
    id: 18,
    name: "quinn hartmann",
    mail: "quinn@gmail.com",
    password: "quinn",
    phone: "+49 1111 111 11 18",
    contactColor: "#ffb3b3"
  },
  {
    id: 19,
    name: "zist amanfang",
    mail: "robin@gmail.com",
    password: "robin",
    phone: "+49 1111 111 11 19",
    contactColor: "#b3d9ff"
  },
  {
    id: 20,
    name: "sophie lehmann",
    mail: "sophie@gmail.com",
    password: "sophie",
    phone: "+49 1111 111 11 20",
    contactColor: "#ffcc99"
  },
  {
    id: 21,
    name: "timo müller",
    mail: "timo@gmail.com",
    password: "timo",
    phone: "+49 1111 111 11 21",
    contactColor: "#ccffcc"
  },
  {
    id: 22,
    name: "ulrich anton fuchs",
    mail: "ulrich@gmail.com",
    password: "ulrich",
    phone: "+49 1111 111 11 22",
    contactColor: "#ff9999"
  },
];*/


/**
 * Initializes the contacts by including the HTML and loading the contacts.
 *
 * @return {void} This function does not return anything.
 */
async function contactsInit() {
  includeHTML();
  await loadContactsStorrage();
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
 * Sorts the contacts by last name.
 *
 * @function sortContactsByName
 * @param {Array} contacts - The array of contacts to be sorted.
 * @returns {Array} - The sorted array of contacts.
 */
function sortContactsByName(contacts) {
  return contacts.slice().sort((a, b) => {
    const lastNameA = a.name.split(" ")[1].toLowerCase();
    const lastNameB = b.name.split(" ")[1].toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });
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
    const firstLetter = name.split(" ")[name.split(" ").length -1].charAt(0).toUpperCase();

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
  const addContactContainer = document.getElementById("addContact");
  if (addContactContainer.classList.contains("d-none")) {
    addContactContainer.classList.remove("d-none");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    
    const bodyContent = document.getElementById("bodyContent");
    bodyContent.setAttribute("onclick", "closeAddContact()");

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  }
}


/**
 * Hides the add contact card by removing it from the DOM.
 *
 * @function closeAddContact
 * @returns {void}
 */
function closeAddContact() {
  const addContactContainer = document.getElementById("addContact");
  if (!addContactContainer.classList.contains("d-none")) {
    addContactContainer.classList.add("move-out-right");
    setTimeout(() => {
      addContactContainer.classList.add("d-none");
      addContactContainer.classList.remove("move-out-right");
    }, 125);
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.remove();
    }
    document.body.style.overflow = "auto";
  }
}


/**
 * Generates initials from a full name.
 *
 * @param {string} name - The full name from which to generate initials.
 * @returns {string} The initials generated from the provided full name.
 */
function getInitials(name) {
  let [firstName, lastName] = name.split(" ");
  let firstInitial = firstName.charAt(0).toUpperCase();
  let lastInitial = lastName.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
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
  return /*html*/` 
  <div id="addContact" class="add-contact d-none" onclick="doNotClose(event)">
  <div class="add-contact-header">
      <div class="add-contact-header-close">
          <img onclick="closeAddContact()" src="./assets/img/icon-close_white.png" alt="closeAddContact">
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
                                <button class="cancelButton" onclick="closeAddContact()" onmouseover="changeCancelIcon()"
                                    onmouseout="restoreCancelIcon()">Cancel
                                    <img id="cancelIcon"  src="./assets/img/icon-cancel.png"
                                        alt="">
                                </button>
                                <button id="createBtn" class="createButton">Create contact
                                    <img id="createIcon" src="./assets/img/icon-check.png"
                                        alt="">
                                </button>
                            </div>
                        </form>
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
function generateContactCardHTML(contactId, profileColor, initials, name, email, shorterMail) {
  let formattedName = getNameWithCapitalizedFirstLetter(name);

  return /*html*/`
    <div class="contact-card" id="contact-card-${contactId}" onclick="openContactDetails(${contactId})">
      <div class="profile-badge-group" style="background-color: ${profileColor}">${initials}</div>
      <div>
        <span class="contact-card-name">${formattedName}</span><br>
        <a class="contact-card-email" href="mailto:${email}">${shorterMail}</a>
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
  lastname = lastname[0].toUpperCase() + lastname.slice(1);
  if (surname){
    surname = surname[0].toUpperCase() + surname.slice(1);
    return firstname + " " + lastname + " " + surname;
  }else{
    return firstname + " " + lastname;
  }
}


/**
 * Displays details of the contact with the given ID.
 * @param {number} id - The unique identifier of the contact.
 */
function openContactDetails(id) {
  const contact = contacts.find(({ id: contactId }) => contactId === id);
  const { name, mail, phone } = contact;
  const contactDetailsHTML = generateContactDetailsHTML(name, mail, phone);
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
function generateContactDetailsHTML(name, email, phone) {
  return /*html*/`
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
            <div class="icon-edit">
              <img src="./assets/img/icon-edit.png" alt="">Edit
            </div>
            <div class="icon-delete">
              <img src="./assets/img/icon-delete.png" alt="">Delete
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="contact-information">Contact Information
        <div class="contact-email-container" id="contactEmailContainer">
          <div class="contact-information-mail-header">Email</div>
          <div class="contact-information-mail">${email}</div>
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
    "#c2e59c",
    "#ffcc80",
    "#ff9999",
    "#99ccff",
    "#ffb3b3",
    "#b3d9ff",
    "#ffcc99",
    "#ccffcc",
    "#4589ff",
    "#d9b3ff",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/*
async function loadContactsStorrage() {
  try {
    const response = await fetch(STORAGE_URL);
    const data = await response.json();
    contacts = data;
  } catch (error) {
    console.error("Fehler beim Laden der Kontakte:", error);
  }
}*/


/**
 * Deletes all contacts by clearing the contacts array and updating the storage.
 *
 * @return {Promise<void>} Promise that resolves once contacts are deleted.
 */
async function delAllContacts() {
  contacts = [];
  await setItem('contacts', JSON.stringify(contacts));
  console.log("contacts: ", contacts)
}