function addTaskInit(){
    includeHTML();
    renderContactsToDropdown();
}

function addTask(category){
    console.log("Task added to:", category);
    console.log("Add function to addTask-Buttons");
}
let tempAssignedContacts = [];

let temporaryTask = 
    {
        'id': 999,
        'type': '',
        'title': '',
        'text': '',
        'subtasks': 0,
        'completedSubtasks': 0,
        'assignedTo': [],
        'category': '',
        'priority': '',
        'dueDate': ""
};


/**
 * Updates the priority styling for the task buttons based on the selected priority.
 *
 * @param {string} priority - The selected priority ('Urgent', 'Medium', or 'Low').
 */
function setPriority(priority) {
    document.querySelectorAll('.addTaskPriorityButton').forEach(button => {
        button.style.backgroundColor = 'white';
        button.classList.remove('active');
        button.querySelector('.priorityButtonText').style.color = 'black';
        button.querySelector('img').src = `./assets/img/icon-priority_${button.id.toLowerCase().slice(21)}.png`;
    });
    
    const button = document.getElementById(`addTaskPriorityButton${priority}`);
    button.style.backgroundColor = getButtonColor(priority);
    button.classList.add('active');
    button.querySelector('.priorityButtonText').style.color = 'white';
    button.querySelector('img').src = `./assets/img/icon-priority_${priority.toLowerCase()}_white.png`;
}


/**
 * Returns the background color for a given priority level.
 *
 * @param {string} priority - The priority level ('Urgent', 'Medium', or 'Low').
 * @return {string} The corresponding background color ('red', 'orange', 'green', or 'white').
 */
function getButtonColor(priority) {
    switch (priority) {
        case 'Urgent':
            return '#ff3d00';
        case 'Medium':
            return '#ffa800';
        case 'Low':
            return '#7ae229';
        default:
            return 'white';
    }
}


/**
 * Toggles the visibility of the dropdown content and updates the arrow image based on its current direction.
 */
function renderArrow(arrowContainer, contentContainer){
    let customArrow = document.getElementById(arrowContainer)
    let arrowImg = customArrow.childNodes[1];
    arrowImg.dataset.direction == "down"
    ? arrowImg.dataset.direction = "up"
    : arrowImg.dataset.direction = "down"

    arrowImg.src = `../../assets/img/icon-arrow_dropdown_${arrowImg.dataset.direction}.png`
    document.getElementById(contentContainer).classList.toggle('d-none')
}


/**
 * Renders the test contacts in the dropdown content.
 */
function renderContactsToDropdown(){
    let content = document.getElementById('dropdown-content-assignedTo');
    content.innerHTML = '';
    contacts.forEach(contact => {
        content.innerHTML += /*html*/`<div class="dropdownOption" id="assignedToContact${contact.id}" marked=false onclick="assignContactToTask(${contact.id})">
            ${contact.name} <img src="../../assets/img/icon-check_button_unchecked.png" alt="">
            </div>`
    })
}


/**
 * Assigns a contact to a task based on the provided id.
*
* @param {number} id - The id of the task to assign the contact to.
*/
function assignContactToTask(id){
    let dropdownContact = document.getElementById('assignedToContact' + id);
    let dropdownCheckboxImage = dropdownContact.lastElementChild;

    setDropdownContactAppearance(dropdownContact, dropdownCheckboxImage);
    toggleAssignedContactsContainer();
    pushContactToTempAssignedContacts(id);
}


function pushContactToTempAssignedContacts(id){
    if (tempAssignedContacts.indexOf(id) == -1){
        tempAssignedContacts.push(id)
    }else{
        tempAssignedContacts.splice(tempAssignedContacts.indexOf(id), 1)
    }
}


/**
 * Sets the appearance of the dropdown contact based on the 'marked' attribute.
 *
 * @param {Element} dropdownContact - The dropdown contact element to modify.
 * @param {Element} dropdownCheckboxImage - The image element representing the checkbox.
 */
function setDropdownContactAppearance(dropdownContact, dropdownCheckboxImage){
    if (dropdownContact.getAttribute('marked') == 'false'){
        dropdownContact.setAttribute('marked', 'true');
        dropdownCheckboxImage.src = '../../assets/img/icon-check_button_checked_white.png';
    }else{
        dropdownContact.setAttribute('marked', 'false');
        dropdownCheckboxImage.src = '../assets/img/icon-check_button_unchecked.png';
    }
}


/**
 * Toggles the visibility of the assigned contacts container based on the marked attribute of the contact cards.
 */
function toggleAssignedContactsContainer(){
    let contactCards = document.getElementById('dropdown-content-assignedTo').childNodes;
    let assignedContactsContainer = document.getElementById('assignedContactsContainer');
    let empty = true;
    for(let i = 0; i < contactCards.length; i++){
        if(contactCards[i].getAttribute('marked') == 'true'){
            assignedContactsContainer.classList.remove('d-none');
            empty = false;
            break;
        }
    }
    if (empty){
        assignedContactsContainer.classList.add('d-none');
    }
}

function chooseCategory(category){
    let dropdownContentContainer = document.getElementById('dropdown-content-category')
    let categoryContainer = document.getElementById('dropdown-category-title');
    categoryContainer.innerHTML = category;
    dropdownContentContainer.classList.add('d-none');

    
}
// function renderAssignedToContacts() {
//     const assignedToContactsList = document.getElementById('assignedToContactsList');
    
//     contacts.forEach(contact => {
//         assignedToContactsList.innerHTML +=`
//         <li>
//             <input type="checkbox" id="${contact.name}" name="${contact.name}">
//             <span class="contactName">${contact.name}</span>
//         </li>`;
//     });
// }
/**
 * Checks if any contact is assigned to a task by iterating through the child nodes of the 'dropdown-content' element.
 * If any contact is marked as 'true', the 'assignedContactsContainer' element is made visible and the function returns true.
 * If no contact is marked as 'true', the 'assignedContactsContainer' element is made hidden and the function returns false.
 *
 * @return {boolean} Returns true if any contact is assigned to a task, false otherwise.
 */
// function checkIfAnyContactIsAssignedToTask(){
//     let contactCards = document.getElementById('dropdown-content').childNodes;
//     let assignedContactsContainer = document.getElementById('assignedContactsContainer');
//     let empty = true;
//     for(let i = 0; i < contactCards.length; i++){
//         if(contactCards[i].getAttribute('marked') == 'true'){
//             assignedContactsContainer.classList.remove('d-none');
//             empty = false;
//             // return true;
//             addContacTemp(contactCards[i]);
//         }
//     }
//     if (empty){
//         assignedContactsContainer.classList.add('d-none');
//         return false;
//     }
// }