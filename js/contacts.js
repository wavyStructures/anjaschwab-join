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

  createPartingLine(main);
}

function createContactsContainer(main) {
  const containerHTML = generateContactsContainerHTML();
  main.innerHTML += containerHTML;
}


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

function generateContactsContainerHTML() {
  return `
        <div class="contacts-container" id="contacts-container"> <!-- frame 156 -->
        
            <div class="button-add-contact-card" id="button-add-contact-card"> <!-- Button-->
                <div onclick="addContactCard()" class="button-add-contact"> <!-- secondary contact -->
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

function resetContactCard(card) {
  card.style.backgroundColor = "";
  card.style.color = "";
  const badgeGroup = card.querySelector('.profile-badge-group');
  if (badgeGroup) {
    badgeGroup.classList.remove('profileBadgeChoosen');
  }
  const emailElement = card.querySelector('.contact-card-email');
  if (emailElement) {
    emailElement.style.color = "";
  }
}

function resetAllContactCards() {
  const allContactCards = document.querySelectorAll(".contact-card");
  allContactCards.forEach(resetContactCard);
}

function highlightContactCard(card) {
  card.style.backgroundColor = "#4589ff";
  card.style.color = "white";
  const badgeGroup = card.querySelector('.profile-badge-group');
  if (badgeGroup) {
    badgeGroup.classList.add('profileBadgeChoosen');
  }
  const emailElement = card.querySelector('.contact-card-email');
  if (emailElement) {
    emailElement.style.color = "white";
  }
}

function highlightSelectedContact(id) {
  const selectedContactCard = document.getElementById(`contact-card-${id}`);
  if (!selectedContactCard) return;

  if (selectedContactCard.style.backgroundColor === "rgb(69, 137, 255)") {
    // Wenn die Karte bereits ausgewählt ist, setze sie zurück und beende die Funktion
    resetContactCard(selectedContactCard);
    return;
  }

  resetAllContactCards(); // Erst alle Karten zurücksetzen
  highlightContactCard(selectedContactCard); // Dann die ausgewählte Karte hervorheben
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
