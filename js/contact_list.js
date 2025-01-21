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
  console.log("Rendered contacts:", contacts);

  contacts.forEach((contact) => {
    const { id, username, additional_info, mail, phone, color } = contact;


    const initials = getInitials(name);
    const firstLetter = name
      .split(" ")
    [name.split(" ").length - 1].charAt(0)
      .toUpperCase();

    console.log(`Contact name: ${name}, First letter: ${firstLetter}`);

    if (!currentFirstLetters.includes(firstLetter)) {
      console.log("Adding first letter section:", firstLetter);

      createFirstLetter(main, firstLetter);
      currentFirstLetters.push(firstLetter);
    }

    console.log("Creating contact card for:", name);

    createContactCard(main, id, contactColor, initials, name, mail);
  });
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
