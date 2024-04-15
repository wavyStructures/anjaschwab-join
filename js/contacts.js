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
let contacts = [
  {
    id: 1,
    name: "anton mayer",
    mail: "antom@gmail.com",
    phone: "+49 1111 111 11 1",
    contactColor: "",
  },
  {
    id: 2,
    name: "anja schulz",
    mail: "schulz@hotmail.com",
    phone: "+49 1111 111 11 2",
    contactColor: "#c2e59c",
  },
  {
    id: 3,
    name: "benedikt ziegler",
    mail: "benedikt@gmail.com",
    phone: "+49 1111 111 11 3",
    contactColor: "#ffcc80",
  },
  {
    id: 4,
    name: "carolin schmidt",
    mail: "carolin@gmail.com",
    phone: "+49 1111 111 11 4",
    contactColor: "#ff9999",
  },
  {
    id: 5,
    name: "daniel huber",
    mail: "daniel@gmail.com",
    phone: "+49 1111 111 11 5",
    contactColor: "#99ccff",
  },
  {
    id: 6,
    name: "emily wagner",
    mail: "emily@gmail.com",
    phone: "+49 1111 111 11 6",
    contactColor: "#ffb3b3",
  },
  {
    id: 7,
    name: "fabian koch",
    mail: "fabian@gmail.com",
    phone: "+49 1111 111 11 7",
    contactColor: "#b3d9ff",
  },
  {
    id: 8,
    name: "gabriela müller",
    mail: "gabriela@gmail.com",
    phone: "+49 1111 111 11 8",
    contactColor: "#ffcc99",
  },
  {
    id: 9,
    name: "hans schneider",
    mail: "hans@gmail.com",
    phone: "+49 1111 111 11 9",
    contactColor: "#ccffcc",
  },
  {
    id: 10,
    name: "irene fischer",
    mail: "irene@gmail.com",
    phone: "+49 1111 111 11 10",
    contactColor: "#ff9999",
  },
  {
    id: 11,
    name: "johann weber",
    mail: "johann@gmail.com",
    phone: "+49 1111 111 11 11",
    contactColor: "#99ccff",
  },
  {
    id: 12,
    name: "karolina schwarz",
    mail: "karolina@gmail.com",
    phone: "+49 1111 111 11 12",
    contactColor: "#ffb3b3",
  },
  {
    id: 13,
    name: "lisa meier",
    mail: "lisa@gmail.com",
    phone: "+49 1111 111 11 13",
    contactColor: "#b3d9ff",
  },
  {
    id: 14,
    name: "max schwarz",
    mail: "max@gmail.com",
    phone: "+49 1111 111 11 14",
    contactColor: "#ffcc99",
  },
  {
    id: 15,
    name: "nina kramer",
    mail: "nina@gmail.com",
    phone: "+49 1111 111 11 15",
    contactColor: "#ccffcc",
  },
  {
    id: 16,
    name: "oscar richter",
    mail: "oscar@gmail.com",
    phone: "+49 1111 111 11 16",
    contactColor: "#ff9999",
  },
  {
    id: 17,
    name: "paula vogel",
    mail: "paula@gmail.com",
    phone: "+49 1111 111 11 17",
    contactColor: "#99ccff",
  },
  {
    id: 18,
    name: "quinn hartmann",
    mail: "quinn@gmail.com",
    phone: "+49 1111 111 11 18",
    contactColor: "#ffb3b3",
  },
  {
    id: 19,
    name: "robin jung",
    mail: "robin@gmail.com",
    phone: "+49 1111 111 11 19",
    contactColor: "#b3d9ff",
  },
  {
    id: 20,
    name: "sophie lehmann",
    mail: "sophie@gmail.com",
    phone: "+49 1111 111 11 20",
    contactColor: "#ffcc99",
  },
  {
    id: 21,
    name: "timo müller",
    mail: "timo@gmail.com",
    phone: "+49 1111 111 11 21",
    contactColor: "#ccffcc",
  },
  {
    id: 22,
    name: "ulrich fuchs",
    mail: "ulrich@gmail.com",
    phone: "+49 1111 111 11 22",
    contactColor: "#ff9999",
  },
];

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

  const currentFirstLetters = [];

  contacts.forEach((contact) => {
    const { id, name, mail, phone, contactColor } = contact;
    const initials = getInitials(name);
    const firstLetter = name.charAt(0).toUpperCase();

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

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  }
}

/**
 * Hides the add contact card by adding the d-none class to the corresponding container
 * and applying the move-out-right animation.
 *
 * @function closeAddContact
 * @returns {void}
 */
function closeAddContact() {
  const addContactContainer = document.getElementById("addContact");
  if (!addContactContainer.classList.contains("d-none")) {
    addContactContainer.classList.add("move-out-right"); // Füge die move-out-right-Klasse hinzu
    setTimeout(() => {
      addContactContainer.classList.add("d-none");
      addContactContainer.classList.remove("move-out-right"); // Entferne die move-out-right-Klasse nach der Animation
    }, 200); // Die Dauer der Animation in Millisekunden
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
  return `
  <div id="addContact" class="add-contact d-none">
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
      <form action="" onsubmit="createContact(); return false" class="add-contact-input-group">
      <div class="input-frame">
          <input id="contactName" type="text" placeholder="Name" autofocus required>
          <img src="./assets/img/icon-person.png" alt="">
      </div>
      <div class="input-frame">
          <input id="contactMail" type="email" placeholder="Email" autofocus required>
          <img src="./assets/img/icon-mail.png" alt="">
      </div>
      <div class="input-frame">
          <input id="ContactPhone" type="tel" placeholder="Phone" autofocus required>
          <img src="./assets/img/icon-call.png" alt="">
      </div>
      <div id="addContactButton" class="addContactButton">
          <button class="cancelButton" onclick="closeAddContact()" onmouseover="changeCancelIcon()" onmouseout="restoreCancelIcon()">Cancel
              <img id="cancelIcon" src="./assets/img/icon-cancel.png" alt="">
          </button>
          <button class="createButton" onclick="createContact()">Create contact
          <img id="createIcon" src="./assets/img/icon-check.png" alt="">
      </button>
      </div>
      </form>
  </div>
</div>
        <div class="contacts-container" id="contacts-container"> 
        
            <div class="button-add-contact-card" id="button-add-contact-card"> 
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
 * Generates HTML code for a contact card with specified details.
 *
 * @function generateContactCardHTML
 * @param {number} id - The unique identifier for the contact.
 * @param {string} color - The color associated with the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @param {string} shorterMail - The shortened version of the email address.
 * @returns {string} The HTML code for the contact card.
 */
function generateContactCardHTML(id, color, initials, name, mail, shorterMail) {
  const upperCaseName = name.replace(/\b\w/g, (char) => char.toUpperCase());
  return `
        <div class="contact-card" id="contact-card-${id}" onclick="openContactDetails(${id})">
            <div class="profile-badge-group" style="background-color: ${color};">${initials}</div>
            <div class="">
                <span class="contact-card-name">${upperCaseName}</span><br>
                <a class="contact-card-email" href="mailto:${mail}">${shorterMail}</a>
            </div>
        </div>
    `;
}

/**
 * Opens the details of a contact specified by its ID.
 *
 * @function openContactDetails
 * @param {number} id - The unique identifier of the contact.
 * @returns {void}
 */
function openContactDetails(id) {
  const contact = contacts.find((contact) => contact.id === id);
  const { name, mail, phone } = contact;

  const contactDetailsHTML = generateContactDetailsHTML(name, mail, phone);

  const rightSideElement = document.getElementById("rightSide");
  if (rightSideElement) {
    rightSideElement.innerHTML = contactDetailsHTML;

    rightSideElement.classList.remove("d-none");

    highlightSelectedContact(id);
  } else {
    console.error("Element with ID 'rightSide' not found.");
  }
}

/**
 * Resets the styles of a contact card to their default values.
 *
 * @function resetContactCard
 * @param {HTMLElement} card - The contact card element to be reset.
 * @returns {void}
 */
function resetContactCard(card) {
  card.style.backgroundColor = "";
  card.style.color = "";
  const badgeGroup = card.querySelector(".profile-badge-group");
  if (badgeGroup) {
    badgeGroup.classList.remove("profileBadgeChoosen");
  }
  const emailElement = card.querySelector(".contact-card-email");
  if (emailElement) {
    emailElement.style.color = "";
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

  if (selectedContactCard.style.backgroundColor === "rgb(69, 137, 255)") {
    resetContactCard(selectedContactCard);
    return;
  }

  resetAllContactCards();
  highlightContactCard(selectedContactCard);
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
  return `
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
    "../assets/img/icon-cancel_hover.png";
}

/**
 * Restores the cancel icon to its default state by updating its source.
 *
 * @function restoreCancelIcon
 * @returns {void}
 */
function restoreCancelIcon() {
  document.getElementById("cancelIcon").src = "../assets/img/icon-cancel.png";
}

/**
 * Creates a new contact based on the input values from the form,
 * assigns a random color to the contact, adds it to the contacts array,
 * clears the form inputs, and reloads the contacts.
 *
 * @function createContact
 * @returns {void}
 */
function createContact() {
  const name = document.getElementById("contactName").value;
  const mail = document.getElementById("contactMail").value;
  const phone = document.getElementById("ContactPhone").value;

  const newContact = {
    id: contacts.length + 1,
    name: name.trim(),
    mail: mail.trim(),
    phone: phone.trim(),
    contactColor: generateRandomColor(),
  };

  contacts.push(newContact);

  document.getElementById("contactName").value = "";
  document.getElementById("contactMail").value = "";
  document.getElementById("ContactPhone").value = "";

  loadContacts();
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
