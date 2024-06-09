let users = [];
let contacts = [];
let isMobileView = window.innerWidth <= 801;

/**
 * Retrieves the contacts from the remote storage asynchronously.
 *
 * @return {Promise<Array>} A promise that resolves to an array of contacts.
 */
async function getContactsFromRemoteStorage() {
  try {
    users = await firebaseGetItem(FIREBASE_USERS_ID);
  } catch (error) {
    console.error("Loading error:", error);
  }
}

/**
 * Retrieves contacts from the users array and sorts them by name.
 *
 * @return {Array} An array of contacts sorted by name.
 */
function getContactsOutOfUsers() {
  temp_contacts = [];
  users.forEach((user) => {
    temp_contacts.push({
      contactColor: user.contactColor,
      id: user.id,
      mail: user.mail,
      name: user.name,
      phone: user.phone,
    });
  });
  users = [];
  contacts = sortContactsByName(temp_contacts);
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
 * Saves a contact by pushing it to the contacts array and storing it in local storage.
 */
async function saveContact() {
  await getContactsFromRemoteStorage();
  if (checkMailExist(document.getElementById("contactMail").value)) {
    console.warn("MAIL EXISTIERT!!!!!");
  } else {
    try {
      createBtn.disabled = true;
      const newId = getNextId(users);
      users.push({
        id: newId,
        name: contactName.value,
        mail: contactMail.value,
        phone: contactPhone.value,
        contactColor: generateRandomColor(),
        password: getFirstNameForDefaultPassword(contactName.value),
      });

      await firebaseUpdateItem(users, FIREBASE_USERS_ID);
      getContactsOutOfUsers();
      users = [];
      resetContactForm();
      closeOverlay("addContact");
    } catch (error) {
      console.error("Error saving contact:", error);
    }
    displaySuccessMessage("Contact successfully created");
    loadContacts();
  }
}

/**
 * Returns the first name from a given full name string for use as a default password.
 *
 * @param {string} name - The full name string.
 * @return {string} The first name extracted from the full name string.
 */
function getFirstNameForDefaultPassword(name) {
  return name.split(" ")[0];
}

/**
 * Displays a success message overlay with the given message content.
 *
 * @param {string} message - The message to be displayed in the success overlay.
 * @return {void} This function does not return a value.
 */
function displaySuccessMessage(message) {
  const overlay = document.createElement("div");
  overlay.className = "contact-succ-created-overlay";
  overlay.innerHTML = `
    <div class="contact-succesfully-created-wrapper">
      <div class="contact-succesfully-created">
        ${message}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Trigger slide-in
  setTimeout(() => {
    overlay.classList.add("slide-in"); // Overlay einblenden

    // Timeout, um den Container nach 3 Sekunden wieder auszublenden
    setTimeout(() => {
      overlay.classList.add("slide-out"); // Animation zum Ausblenden hinzufügen
      setTimeout(() => {
        overlay.remove(); // Overlay aus dem DOM entfernen
      }, 500); // Timeout für die Dauer der Ausblendanimation
    }, 2000); // Timeout für 3 Sekunden Anzeigedauer
  }, 10); // Minimaler Timeout, um das Hinzufügen der Klasse zu triggern
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
 * Initializes the contacts by including the HTML and loading the contacts.
 *
 * @return {void} This function does not return anything.
 */
async function contactsInit() {
  includeHTML();
  await getContactsFromRemoteStorage();
  getContactsOutOfUsers();
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
  renderSortedContacts(main, contacts);
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
function renderSortedContacts(main, contacts) {
  const currentFirstLetters = [];

  contacts.forEach((contact) => {
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
  if (!document.getElementById("addContact")) {
    renderAddContacts();
  }
  document.getElementById("addContact").innerHTML = renderAddContactsHTML();
  addOverlay("closeOverlay('addContact')");
}

/**
 * Creates an overlay element and appends it to the document body. The overlay element
 * has a class of "overlay" and an onclick attribute set to the provided functionToAdd.
 * Additionally, the overflow style of the document body is set to "hidden" to prevent
 * scrolling while the overlay is active.
 *
 * @param {string} functionToAdd - The function to be called when the overlay is clicked.
 * @return {void} This function does not return a value.
 */
function addOverlay(functionToAdd) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const bodyContent = document.getElementById("bodyContent");
  overlay.setAttribute("onclick", functionToAdd);

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

/**
 * Closes an overlay by adding the "move-out-right" class to the container element, removing the class after a delay, and removing the overlay element if it exists. Also enables scrolling on the body element and removes the container element.
 *
 * @param {string} id - The ID of the container element.
 * @return {void}
 */
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
<div class="contacts-container-outer">
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
</div>
<section class="right-side d-none" id="rightSide">

</section>
    `;
}


/**
 * Renders the "Add Contact" button by creating a new div element and appending it to the "addContactContainer" element.
 *
 * @return {void} This function does not return a value.
 */
function renderAddContacts() {
  let newDiv = document.createElement("div");
  newDiv.id = "addContact";
  setAttributes(newDiv, {
    class: "add-contact",
    onclick: "doNotClose(event)",
  });
  document.getElementById("addContactContainer").appendChild(newDiv);
}

/**
 * Renders the HTML code for the add contact form.
 *
 * @return {string} The HTML code for the add contact form.
 */
function renderAddContactsHTML() {
  return /*html*/ `
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
                    <input id="contactPhone" pattern="[0-9]*" type="tel" placeholder="Phone" autofocus required>
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
</div>`;
}

/**
 * Creates a new `<div>` element with the id 'editContact' and adds it as a child to the element with the id 'contactMainEdit'.
 * The new `<div>` element has a class attribute set to 'edit-contact'.
 *
 * @return {void} This function does not return anything.
 */
function renderEditContact() {
  let newDiv = document.createElement("div");
  newDiv.id = "editContact";
  setAttributes(newDiv, {
    class: "edit-contact",
  });
  document.getElementById("contactMainEdit").appendChild(newDiv);
}

/**
 * Renders the HTML code for the edit contact form with the given ID.
 *
 * @param {number} id - The ID of the contact to be edited.
 * @return {string} The HTML code for the edit contact form.
 */
function renderEditContactHTML(id, name, contactColor) {
  console.log("COLOR: ", contactColor);
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
                <div class="contact-details-badge" style="background-color: ${contactColor}">
            <div class="contact-details-badge-initials">${getInitials(
              name
            )}</div>
          </div>
                </div>
            </div>
            <form action="" onsubmit="saveEditedContact(${id}); return false" class="add-contact-input-group">
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
                    <button class="createButton">Save
                        <img id="createIcon" onclick="saveEditedContact(${id})" src="./assets/img/icon-check.png" alt="">
                    </button>
                </div>
            </form>
        </div>`;
}

/**
 * Shows the add contact container by removing the "hidden" class from the element with the id "addContactContainer".
 *
 * @return {void} This function does not return anything.
 */
function showAddContactContainer() {
  const addContactContainer = document.getElementById("addContactContainer");
  addContactContainer.classList.remove("hidden");
}

/**
 * Removes a container element from the DOM based on the provided id.
 *
 * @param {string} id - The ID of the container element to remove.
 * @return {void} This function does not return anything.
 */
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
  currentContactId = id; // Setze die aktuelle Kontakt-ID
  const contact = contacts.find(({ id: contactId }) => contactId === id);
  const { name, mail, phone, contactColor } = contact;
  let contactDetailsHTML;

  if (window.innerWidth <= 801) {
    contactDetailsHTML = generateContactDetailsMobileHTML(name, mail, phone, id, contactColor);
  } else {
    contactDetailsHTML = generateContactDetailsHTML(name, mail, phone, id, contactColor);
  }

  const rightSide = document.getElementById("rightSide");
  rightSide.classList.remove("d-none");
  rightSide.innerHTML = contactDetailsHTML;
  highlightSelectedContact(id);
}

window.addEventListener('resize', () => {
  if (currentContactId !== null) {
    if (window.innerWidth <= 801) {
      openContactDetails(currentContactId); 
    } else {
      openContactDetails(currentContactId); 
    }
  }
});


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
  allContactCards.forEach((card) => {
    resetContactCard(card);
    card.classList.remove("highlighted");
  });
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
 * Highlights the selected contact card and shows the right side element.
 *
 * @param {number} id - The ID of the contact card to be highlighted.
 */
function highlightSelectedContact(id) {
  const selectedContactCard = document.getElementById(`contact-card-${id}`);
  const rightSideElement = document.getElementById("rightSide");

  if (selectedContactCard.classList.contains("highlighted")) {
    resetAllContactCards();
    rightSideElement.classList.add("d-none");
    return;
  }

  resetAllContactCards();
  selectedContactCard.classList.add("highlighted");
  applyHighlight();
}

/**
 * Applies highlighting to the selected contact card and shows the right side element.
 *
 * @function applyHighlight
 * @param {HTMLElement} selectedContactCard - The selected contact card element.
 * @param {HTMLElement} rightSideElement - The right side element to be shown.
 * @returns {void}
 */
function applyHighlight() {
  let allContactCards = document.getElementsByClassName("contact-card");
  for (card of allContactCards)
    if (card.classList.contains("highlighted")) {
      highlightContactCard(card);
    } else {
      resetContactCard(card);
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
function generateContactDetailsHTML(name, email, phone, id, color) {
  return /*html*/ `
    <div class="contact-Details">
      <div class="contact-details-header" id="contactDetailsHeader">
        <div class="contact-details-badge-group">
          <div class="contact-details-badge" style="background-color: ${color}">
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

function generateContactDetailsMobileHTML(name, email, phone, id, color) {
  return /*html*/ `
  <div class="mobileContactDetails">
      <div class="contact-details">
        <div class="contact-details-header">
          <div class="contact-details-badge-group">
            <div class="contact-details-badge" style="background-color: ${color}">
              <div class="contact-details-badge-initials">${getInitials(name)}</div>
            </div>
            <div class="contact-details-badge-name">${name}</div>
          </div>
        </div>
        <div class="contact-information">
          <div class="contact-email-container">${email}</div>
          <div class="contact-phone-container">${phone}</div>
        </div>
      </div>
      <div class="openEditDeleteResponsive">
        <img src="./assets/img/Menu Contact options.png" alt="">
      </div>
      <div class="editDelete" id="editDelete">
        <div class="editDiv">
          <img src="./assets/img/icon-edit.png" onclick="editContact(${id})">
          <span>Edit</span>
        </div>
        <div class="deleteDiv">
          <img src="./assets/img/icon-delete.png" onclick="removeContact(${id})">
          <span>Delete</span>
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
 * Updates the color of each contact in the contacts_old array by mapping the colors array to the newColors array.
 *
 * @return {void} This function does not return a value.
 */
function changeColor() {
  contacts_old.forEach((contact) => {
    for (let i = 0; i < colors.length; i++) {
      if (contact.contactColor == colors[i]) {
        contact.contactColor = newColors[i];
      }
    }
  });
}
/**
 * Deletes all contacts by clearing the contacts array and updating the storage.
 *
 * @return {Promise<void>} Promise that resolves once contacts are deleted.
 */
async function delAllContacts() {
  contacts = [];
  await remoteStorageSetItem("contacts", JSON.stringify(contacts));
}

let currentContactId = null;

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

    editContactCard(contact);
    document.getElementById("contactName").value = contact.name;
    document.getElementById("contactMail").value = contact.mail;
    document.getElementById("contactPhone").value = contact.phone;

    currentContactId = id; // Setze die aktuelle Kontakt-ID

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
async function saveEditedContact(id) {
  let users = await firebaseGetItem(FIREBASE_USERS_ID);
  const userIndex = users.findIndex((contact) => contact.id === id);

  if (userIndex !== -1) {
    const user = users[userIndex];

    user.name = document.getElementById("contactName").value;
    user.mail = document.getElementById("contactMail").value;
    user.phone = document.getElementById("contactPhone").value;

    console.log(users.findIndex((users) => users.id === id));

    await firebaseUpdateItem(users, FIREBASE_USERS_ID);
    users = [];
    console.log("Contact saved:", user);
    closeOverlay("editContact");
    await displaySuccessMessage("Contact successfully edited");
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  } else {
    console.error("Contact not found with ID:", id);
  }
}

/**
 * Removes the "d-none" class from the "editContact" element, making it visible.
 *
 * @return {void} This function does not return a value.
 */
function editContactCard(contact) {
  if (!document.getElementById("editContact")) {
    renderEditContact();
  }
  document.getElementById("editContact").innerHTML = renderEditContactHTML(
    contact.id,
    contact.name,
    contact.contactColor
  );
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
 * Deletes a contact from the Firebase database and local storage.
 *
 * @param {number} id - The ID of the contact to be deleted.
 * @return {Promise<void>} A promise that resolves when the contact is successfully deleted.
 */
async function deleteContact(id) {
  let users = await firebaseGetItem(FIREBASE_USERS_ID);
  console.log("delUser users: ", users);
  const userIndex = users.findIndex((user) => user.id === id);
  console.log("USER TO DELETE: ", users[userIndex]);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    await firebaseUpdateItem(users, FIREBASE_USERS_ID);
    users = [];
    await displaySuccessMessage("Contact successfully deleted");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
