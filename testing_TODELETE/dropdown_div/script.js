function dropdownInit(){
    renderTestContacts();
}

let test_contacts = [
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
      name: "robin jung",
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
      name: "ulrich fuchs",
      mail: "ulrich@gmail.com",
      password: "ulrich",
      phone: "+49 1111 111 11 22",
      contactColor: "#ff9999"
    },
  ];

function renderArrow(){
    let customArrow = document.getElementById('custom-arrow')
    let arrowImg = customArrow.childNodes[1];
    
    arrowImg.dataset.direction == "down"
    ? arrowImg.dataset.direction = "up"
    : arrowImg.dataset.direction = "down"

    arrowImg.src = `../../assets/img/icon-arrow_dropdown_${arrowImg.dataset.direction}.png`
    document.getElementById('dropdown-content').classList.toggle('d-none')
}

/**
 * Renders the test contacts in the dropdown content.
 *
 * @return {void} This function does not return a value.
 */
function renderTestContacts(){
    let content = document.getElementById('dropdown-content');
    content.innerHTML = '';
    test_contacts.forEach(contact => {
        content.innerHTML += /*html*/`<div class="assignetToContact" id="assignedToContact${contact.id}" marked=false onclick="assignContactToTask(${contact.id})">
            ${contact.name} <img src="../../assets/img/icon-check_button_unchecked.png" alt="">
            </div>`
    })
}


function assignContactToTask(id){
    // let contactToAssign = test_contacts.find(contact => contact.id == id);
    let contactToAssignContainer = document.getElementById('assignedToContact' + id);
    let contactToAssignCheckboxImage = contactToAssignContainer.lastElementChild;
    // console.log(contactToAssignContainer.lastElementChild);

    if (contactToAssignContainer.getAttribute('marked') == 'false'){
        contactToAssignContainer.setAttribute('marked', 'true');
        contactToAssignCheckboxImage.src = '../../assets/img/icon-check_button_checked_white.png';
        // console.log('CHECKED: ', contactToAssignContainer.lastElementChild);
        
        
    }else{
        contactToAssignContainer.setAttribute('marked', 'false');
        contactToAssignCheckboxImage.src = '../../assets/img/icon-check_button_unchecked.png';
        // console.log('UNCHECKED: ', contactToAssignContainer.lastElementChild);
    }
}