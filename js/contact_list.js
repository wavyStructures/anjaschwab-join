/**
 * Renders the sorted contacts into the main element.
 *
 * @function renderSortedContacts
 * @param {HTMLElement} main - The main element to render contacts into.
 * @param {Array} sortedContacts - The sorted array of contacts.
 * @returns {void}
 */
async function renderSortedContacts(main, contacts) {
  contacts = await getContactsFromRemoteStorage();
  const currentFirstLetters = [];

  contacts.sort((a, b) => {
    const lastNameA = a.username.split(" ").slice(-1)[0].toLowerCase(); 
    const lastNameB = b.username.split(" ").slice(-1)[0].toLowerCase();
    const firstNameA = a.username.split(" ")[0].toLowerCase(); 
    const firstNameB = b.username.split(" ")[0].toLowerCase();

    if (lastNameA === lastNameB) {
      return firstNameA.localeCompare(firstNameB);
    }
    return lastNameA.localeCompare(lastNameB); 
  });

  contacts.forEach((contact) => {
    const { id, username, phone, contactColor, email } = contact;
    const initials = getInitials(username);

    const firstLetter = username.split(" ").slice(-1)[0].charAt(0).toUpperCase();

    if (!currentFirstLetters.includes(firstLetter)) {
      createFirstLetter(main, firstLetter);
      currentFirstLetters.push(firstLetter);
    }

    createContactCard(main, id, contactColor, initials, username, phone, email);
  });
}

// contacts = contacts.filter(contact => {
//   if (!contact.username || typeof contact.username !== "string") {
//     console.warn("Invalid contact:", contact);
//     return false; // Exclude invalid contacts
//   }
//   return true;
// });
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
