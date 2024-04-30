async function addTaskInit(){
    includeHTML();
    await loadContactsStorage();
    renderContactsToDropdown();
    renderSubtasks();
    
}

function addTask(category){
    console.log("Task added to:", category);
    console.log("Add function to addTask-Buttons");
}
let tempAssignedContacts = [];
let tempCategory = '';
let tempPriority = '';
let tempSubtasks = [];

let newTask = 
    {
        'id': 999,
        'type': '',
        'title': '',
        'description': '',
        'subtasks': [{
            'id': 0,
            'subtaskText': 'Bügeln',
            'completed': false
        },
        {
            'id': 1,
            'subtaskText': 'Making Noodles',
            'completed': false
        },
        {
            'id': 2,
            'subtaskText': 'Making Sauce',
            'completed': false
        }],
        'completedSubtasks': [],
        'assignedTo': [],
        'category': 'todo',
        'priority': '',
        'dueDate': ''
};



/**
 * Updates the priority styling for the task buttons based on the selected priority.
 *
 * @param {string} priority - The selected priority ('Urgent', 'Medium', or 'Low').
 */
function setPriority(priority) {
    setPriorityAppearance(priority);
    setPriorityForNewCard(priority);
}

function setPriorityAppearance(priority){
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

function setPriorityForNewCard(priority){
    tempPriority = priority;
}


function renderSubtaskInputField(){
    let subtaskBottom = document.getElementById('subtaskBottom');
    subtaskBottom.innerHTML = renderSubtaskInputFieldHTML();
    document.getElementById('subtaskInputField').focus();
}


function renderSubtaskInputFieldHTML(){
   return /*html*/`
    <input type="text" id="subtaskInputField" placeholder="Add new subtask" onclick="doNotClose(event)">
    <div class="subtaskAddOrCancel">
        <div id="subtaskImgAddCheck" class="subtaskImgDiv pointer" onclick="subtaskAddOrCancel('add'); doNotClose(event)"></div>|
        <div id="subtaskImgAddCancel" class="subtaskImgDiv pointer" onclick="subtaskAddOrCancel('cancel'); doNotClose(event)"></div>`
}


function subtaskAddOrCancel(option){
    let subtaskBottom = document.getElementById('subtaskBottom');
    console.log(subtaskBottom);
    if (option == 'add'){
        addSubtask();
    }
    else if (option == 'cancel'){
        //TODO: else if can be deleted
        console.log('Cancelling...');
    }
    subtaskBottom.innerHTML = renderSubtaskDefaultHTML();
    subtaskBottom.setAttribute('onclick', 'renderSubtaskInputField()');
}


function renderSubtaskDefaultHTML(){
    console.log("To default");
    return /*html*/`<input id="subTaskAddSubtaskText" placeholder="Add new subtask">
    <div id="subtaskImgAddPlus" class="subtaskImgDiv pointer"></div>
    `
}


function addSubtask(){
    let subtaskInputField = document.getElementById('subtaskInputField');
    if(subtaskInputField.value != ''){

        newTask.subtasks.push({
            'id': newTask.subtasks.length,
            'subtaskText' : subtaskInputField.value,
            'completed': false
        })
    }
        else{
            console.log("Bitte eingeben!");
        }
    renderSubtasks();
}


function renderSubtasks(){
    let outputContainer = document.getElementById('subtasksOutput');
    outputContainer.innerHTML = '';
    for (let i = 0; i < newTask.subtasks.length; i++) {
        let subtask = newTask.subtasks[i];
        renderSubtaskHTML(outputContainer, subtask);
    }
}


function renderSubtaskHTML(outputContainer, subtask){
    outputContainer.innerHTML +=
    /*html*/`
        <div class="subTaskOutputDiv">
            <div class="subtaskText">${subtask.subtaskText}</div>
            <div class="subtaskCheckboxes">
                <div class="subtaskImgDiv pointer" id="subtaskImgEdit" onclick="editSubtask(${subtask.id})"> </div>|
                <div class="subtaskImgDiv pointer" id="subtaskImgDelete" onclick="deleteSubtask(${subtask.id})"> </div>
            </div>
        </div>`
}

/**
 * Deletes a subtask from the `newTask.subtasks` array based on the provided `subtaskId`.
 *
 * @param {number} subtaskId - The ID of the subtask to be deleted.
 */
function deleteSubtask(subtaskId){
    newTask.subtasks.forEach((subtask, index) => {
        if (subtask.id == subtaskId){
            newTask.subtasks.splice(index, 1);
        }
    })
    renderSubtasks();
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
    console.log(arrowImg);
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
    fillAssignedCotactsContainer(assignedContactsContainer)

}


function fillAssignedCotactsContainer(container){
    container.innerHTML = "";
    contacts.forEach(contact => {
        container.innerHTML += renderAssignedToButtonsHTML(contact);
    })
}
function chooseCategory(chosenCategory){
    let dropdownContentContainer = document.getElementById('dropdown-content-category')
    let categoryContainer = document.getElementById('dropdown-category-title');
    categoryContainer.innerHTML = chosenCategory;
    dropdownContentContainer.classList.add('d-none');
    setCategory(chosenCategory);
}

function setCategory(chosenCategory){
    category = chosenCategory;
}



function fetchInformationsForNewCard(){
    newTask.id = getNewTaskId();
    newTask.type = getNewTaskType();
    newTask.title = getNewTaskTitle();
    newTask.description = getNewTaskDescription();
    // newTask.subtasks = getNewTaskSubtasks();
    newTask.completedSubtasks = getNewTaskCompletedSubtasks();
    newTask.assignedTo = getNewTaskAssignedTo();
    newTask.category = getNewTaskCategory();
    newTask.priority = getNewTaskPriority();
    newTask.dueDate = getNewTaskDueDate();

    console.log(newTask);
}

/**
 * Retrieves the new task ID based on the length of the tasks array.
 *
 * @return {number} The new task ID.
 */
function getNewTaskId(){
    return tasks.length;
}


function getNewTaskType(){
    return
}


/**
 * Retrieves the value of the input field with the id 'addTaskEnterTitleInput'
 * and returns it as the title of the new task.
 *
 * @return {string} The title of the new task.
 */
function getNewTaskTitle(){
    return document.getElementById('addTaskEnterTitleInput').value
}




/**
 * Retrieves the description of the new task from the 'addTaskDescriptionInput' element.
 *
 * @return {string} The description of the new task.
 */
function getNewTaskDescription(){
    return document.getElementById('addTaskDescriptionInput').value
}


function getNewTaskSubtasks(){
    return tempSubtasks;
}
function getNewTaskCompletedSubtasks(){
    return [];
}
function getNewTaskAssignedTo(){
    return tempAssignedContacts;
}
function getNewTaskCategory(){
    return 'todo';
}
function getNewTaskPriority(){
    return tempPriority;
}


/**
 * Retrieves the value of the 'addTaskDueDateInput' element and returns it as the due date of the new task.
 *
 * @return {string} The due date of the new task.
 */
function getNewTaskDueDate(){
    return document.getElementById('addTaskDueDateInput').value
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