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
];

function loadContacts() {
  let main = document.getElementById("main");
  main.innerHTML = ``;
  createContactsContainer(main);

  let currentFirstLetters = [];

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const id = contact.id;
    const name = contact.name;
    const mail = contact.mail;
    const phone = contact.phone;
    const initials = getInitials(name);
    const firstLetter = name.charAt(0).toUpperCase();
    const color = contact.contactColor;

    if (!currentFirstLetters.includes(firstLetter)) {
      createFirstLetter(main, firstLetter);
      currentFirstLetters.push(firstLetter);
    }

    createContactCard(main, id, color, initials, name, mail);
  }
}

function getInitials(name) {
  let [firstName, lastName] = name.split(" ");
  let firstInitial = firstName.charAt(0).toUpperCase();
  let lastInitial = lastName.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

function createFirstLetter(main, firstLetter) {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add("contact-list-letter");
  letterDiv.textContent = firstLetter;
  main.querySelector(".contact-list").appendChild(letterDiv);
}

function createContactsContainer(main) {
  const containerHTML = generateContactsContainerHTML();
  main.innerHTML += containerHTML;
}

function generateContactsContainerHTML() {
  return `
        <div class="contacts-container" id="contacts-container"> <!-- frame 156 -->
            <div class="button-add-contact-card" id="button-add-contact-card"> <!-- Button-->
                <div onclick="addContactCard()" class="button-add-contact"> <!-- secondary contact -->
                    <div class="add-new-contact">Add new contact</div>
                    <img src="./assets/img/icon-person_add.png" alt="icon-person_add.png">
                </div>
            </div>
            <div class="contact-list" id="contact-list">
                <div class="parting-line-container" id="parting-line-container">
                    <div class="parting-line" id="parting-line"></div>
                </div>
            </div>
        </div>
        <section class="right-side d-none" id="rightSide">
        </section>
    `;
}

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

function highlightSelectedContact(id) {
  const allContactCards = document.querySelectorAll(".contact-card");
  allContactCards.forEach((card) => {
    card.style.backgroundColor = "";
  });

  const selectedContactCard = document.getElementById(`contact-card-${id}`);
  if (selectedContactCard) {
    selectedContactCard.style.backgroundColor = "#4589ff";
  }
}

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
