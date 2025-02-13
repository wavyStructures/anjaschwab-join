/**
 * Saves a contact by pushing it to the contacts array and storing it in local storage.
 */
async function saveContact() {
  await getContactsFromRemoteStorage();
  const contactEmail = document.getElementById("contactMail").value;

  if (checkMailExists(contactEmail)) {
    alert("Contact already exists");
    return;
  }

  try {
    createBtn.disabled = true;

    const newContact = {
      username: contactName.value,
      phone: contactPhone.value,
      additional_info: "",
      email: contactEmail,
    };

    const response = await fetch(`${BASE_URL}contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(newContact),
    });

    if (!response.ok) {
      throw new Error("Failed to save contact. Please try again.");
    }

    const savedContact = await response.json();

    resetCloseReload();
  } catch (error) {
    alert("Failed to save contact. Please try again.");
    // displayErrorMessage("Failed to save contact. Please try again.");
  } finally {
    createBtn.disabled = false;
  }
}

async function resetCloseReload() {
  await getContactsFromRemoteStorage();
  renderSortedContacts(main, contacts);

  resetContactForm();
  closeOverlay("addContact");
  displaySuccessMessage("Contact successfully created");
  contactsInit();
}


// const newId = getNextId(users);
// users.push({
//   id: newId,
//   name: contactName.value,
//   mail: contactMail.value,
//   phone: contactPhone.value,
//   contactColor: generateRandomColor(),
//   password: getFirstNameForDefaultPassword(contactName.value),
// });


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

  setTimeout(() => {
    overlay.classList.add("slide-in");

    setTimeout(() => {
      overlay.classList.add("slide-out");
      setTimeout(() => {
        overlay.remove();
      }, 500);
    }, 2000);
  }, 10);
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

  if (container) {
    container.classList.add("move-out-right");
    setTimeout(() => {
      container.classList.remove("move-out-right");
    }, 125);
  }

  const overlay = document.querySelector(".overlay");
  if (overlay) overlay.remove();

  document.body.style.overflow = "auto";

  setTimeout(() => {
    if (id && document.getElementById(id)) {
      removeContainer(id);
    }
  }, 100);
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
 * Shows the add contact container by removing the "hidden" class from the element with the id "addContactContainer".
 *
 * @return {void} This function does not return anything.
 */
function showAddContactContainer() {
  const addContactContainer = document.getElementById("addContactContainer");
  addContactContainer.classList.remove("hidden");
}


/**
 * A function that hides the openEditDeleteResponsive element and shows the editDelete element.
 *
 */
function openEditDelete() {
  document.getElementById("openEditDeleteResponsive").classList.add("d-none");
  document.getElementById("editDelete").classList.remove("d-none");
}

/**
 * A function that closes the edit delete elements by showing 'openEditDeleteResponsive' and hiding 'editDelete'.
 *
 * @param {} - No parameters
 * @return {} - No return value
 */
function closeEditDelete() {
  document
    .getElementById("openEditDeleteResponsive")
    .classList.remove("d-none");
  document.getElementById("editDelete").classList.add("d-none");
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

    contact.username = getNameWithCapitalizedFirstLetter(contact.username);
    editContactCard(contact);

    document.getElementById("contactName").value = contact.username;
    document.getElementById("contactMail").value = contact.email;
    document.getElementById("contactPhone").value = contact.phone;

    currentContactId = id; // Setze die aktuelle Kontakt-ID
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
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("User is not authenticated!");
    return;
  }

  const updatedContact = {
    username: document.getElementById("contactName").value,
    email: document.getElementById("contactMail").value,
    phone: document.getElementById("contactPhone").value,
  };

  try {
    const response = await fetch(`${BASE_URL}contacts/${id}/`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedContact),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update contact:", errorData);
      // displayErrorMessage("Failed to edit contact. Please try again.");
      return;
    }

    closeOverlay("editContact");
    displaySuccessMessage("Contact successfully edited");
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  } catch (error) {
    console.error("Error while updating contact:", error);
    // displayErrorMessage("An error occurred. Please try again.");
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
    contact.username,
    contact.contactColor
  );
  addOverlay("closeOverlay('editContact')");
}


/**
 * Deletes a contact 
 *
 * @param {number} id - The ID of the contact to be deleted.
 * @return {Promise<void>} A promise that resolves when the contact is successfully deleted.
 */
async function deleteContact(id) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("User is not authenticated!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}contacts/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete contact:", errorData);
      // displayErrorMessage("Failed to delete contact. Please try again.");
      return;
    }

    closeOverlay("editContact");
    displaySuccessMessage("Contact successfully deleted");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.error("Error while deleting contact:", error);
    // displayErrorMessage("An error occurred. Please try again.");
  }
}

/**
 * Removes a contact from the local storage and reinitializes the contacts list.
 *
 * @param {number} id - The unique identifier of the contact to be removed.
 * @return {void} This function does not return anything.
 */
function removeContact(id) {
  deleteContact(id);
  contactsInit();
}
