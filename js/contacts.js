let contacts = [
    {
        name: 'anton mayer',
        mail: 'antom@gmail.com',
        contactColor: '',
    },
    {
        name: 'anja schulz',
        mail: 'schulz@hotmail.com',
        contactColor: '#c2e59c',
    },
    {
        name: 'benedikt ziegler',
        mail: 'benedikt@gmail.com',
        contactColor: '#ffcc80',
    }
];

function loadContacts() {
    let main = document.getElementById('main');
    main.innerHTML = ``;
    createContactsContainer(main);

    let currentFirstLetters = [];

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const name = contact.name;
        const mail = contact.mail;
        const initials = getInitials(name);
        const firstLetter = name.charAt(0).toUpperCase();
        const color = contact.contactColor;

        if (!currentFirstLetters.includes(firstLetter)) {
            createFirstLetter(main, firstLetter);
            currentFirstLetters.push(firstLetter);
        }

        createContactCard(main, color, initials, name, mail);
    }
}

function getInitials(name) {
    let [firstName, lastName] = name.split(' ');
    let firstInitial = firstName.charAt(0).toUpperCase();
    let lastInitial = lastName.charAt(0).toUpperCase();
    return firstInitial + lastInitial;
}

function createFirstLetter(main, firstLetter) {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('contact-list-letter');
    letterDiv.textContent = firstLetter;
    main.querySelector('.contact-list').appendChild(letterDiv);
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
    `;
}

function createContactCard(main, color, initials, name, mail) {
    const shorterMail = mail.length > 20 ? mail.substring(0, 20) + '...' : mail;
    const cardHTML = generateContactCardHTML(color, initials, name, mail, shorterMail);
    const container = main.querySelector('.contacts-container');
    container.querySelector('.contact-list').insertAdjacentHTML('beforeend', cardHTML);
}

function generateContactCardHTML(color, initials, name, mail, shorterMail) {
    return `
        <div class="contact-card choosenContact" id="contact-card">
            <div class="profile-badge-group" style="background-color: ${color};">${initials}</div>
            <div class="">
                <span class="contact-card-name">${name}</span><br>
                <a class="contact-card-email" href="mailto:${mail}">${shorterMail}</a>
            </div>
        </div>
    `;
}

