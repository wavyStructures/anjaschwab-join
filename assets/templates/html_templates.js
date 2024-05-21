function renderNavigationHTML() {
  return `<div class="navigation-content">
    <div id="summary" class="nav-btn" onclick="renderSummary()"><img src="./assets/img/icon-summary.png" alt="summary">Summary</div>
    <div id="addTask" class="nav-btn" onclick="renderAddTask()"><img src="./assets/img/icon-addTask.png" alt="add task">Add Task</div>
    <div id="board" class="nav-btn" onclick="renderBoard()"><img src="./assets/img/icon-board.png" alt="board">Board</div>
    <div id="contacts" class="nav-btn" onclick="renderContacts()"><img src="./assets/img/icon-contacts.png" alt="contacts">Contacts</div>
</div>`;
}

function renderHeaderHTML() {
  return `<div class="header-content">
        <img src="/assets/img/logo-small_white.png" alt="join-logo">
        <div class="header-inner-right">
            <span>Kanban Project Management Tool</span>
            <img src="assets/img/icon-help.png" alt="help">
            <svg id="username" width="56px" height="56px" viewBox="0 0 100 100">
                <circle class="kreis" cx="50" cy="50" r="40" />
                <text class="text" x="50" y="55">
                    <tspan id="buchstabe">A</tspan>
                </text>
            </svg>
        </div>
    </div>`;
}

function renderSummaryHTML() {
  return /*html*/ `
  <div class="sub-main-summary">
    <div class="summary-box box-shadow">
        <div id="h1GreetingUser" class="h1-box">
            <h1 id="daytimeGreeting" class="no-wrap">Good morning,</h1>
            <h1 id="usernameForGreeting">Sofia XXX</h1>
        </div>
        <div id="h1GreetingGuest" class="h1-box" style="display: none;">
            <h1 class="no-wrap">Good morning</h1>
        </div>
        <div class="line1">
            <div class="urgentAndDate" id="urgentAndDate">
                <div class="urgentBox">
                    <div class="image-and-amount flex">
                        <img src="./assets/img/icon-blue-urgent_clock-with-border.png" alt="clock symbol"
                            class="white-border">
                        <span class="amount">1</span>
                    </div>
                    <span>Tasks Urgent</span>
                </div>
                <div class="verticalSeparaterLine"></div>
                <div class="dateBox">
                    <div class="date">${getDate()}</div>
                    <span>Upcoming Deadline</span>
                </div>
            </div>
            <div class="square-button">
                <div class="inner-square-button">
                    <div class="image-and-amount flex">
                        <img src="/assets/img/icon-blue-tasks_in_board.png" alt="file shelf">
                        <div class="amount">5</div>
                    </div>
                    <span>Task in Board</span>
                </div>
            </div>
        </div>
        <div class="line2">
            <div class="square-button">
                <div class="inner-square-button">
                    <div class="image-and-amount flex">
                        <img src="./assets/img/icon-blue-todo.png" alt="todo list">
                        <div class="amount">1</div>
                    </div>
                    <span class="no-wrap">Tasks To-do</span>
                </div>
            </div>
            <div class="square-button">
                <div class="inner-square-button">
                    <div class="image-and-amount flex">
                        <img src="/assets/img/icon-blue-in_progress.png" alt="rising chart">
                        <div class="amount">2</div>
                    </div>
                    <span>Task in Progress</span>
                </div>
            </div>
            <div class="square-button">
                <div class="inner-square-button">
                    <div class="image-and-amount flex">
                        <img src="/assets/img/icon-blue-awaiting_feedback.png" alt="feedback card">
                        <div class="amount">2</div>
                    </div>
                    <span>Awaiting Feedback</span>
                </div>
            </div>
            <div class="square-button">
                <div class="inner-square-button">
                    <div class="image-and-amount flex">
                        <img src="./assets/img/icon-blue-done.png" alt="thumbs up">
                        <div class="amount">1</div>
                    </div>
                    <span>Tasks<br>Done</span>
                </div>
            </div>
        </div>
    </div>
</div>

`;
}


// function renderContactsHTML() {
//   return /*html*/ `<div class="contacts-content">Content Of Contacts</div>`;
// }

/**
 *
 * @param {object} content the div the cards will be rendered in
 * @param {array} categoryCards JSON of cards (fitting to the category)
 */
function renderTasksHTML(task) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task.id})" id="${task.id}" class="card" onclick="openCard(${task.id})">
        <div class="cardType">${task.type}</div>
        <div class="cardTitle">${task.title}</div>
        <div class="cardText">${task.description}</div>
        <div class="cardSubtasks">${renderSubtask(task)}</div>
        <div class="cardBottomContainer">
        <div id="cardAssignedToContainerId${
          task["id"]
        }" class="cardAssignedToContainer"></div>
            <div class="cardPriority">${setPriorityImage(
              task["priority"]
            )}</div>
        </div>
    </div>`;
}

function renderEmptyCategoryHTML() {
  return /*html*/ `<div class="empty-category">No tasks to do</div>`;
}

function renderAssignedToButtonsHTML(contact) {
  return /*html*/ `<div class="profile-badge-group" style="background-color: ${
    contact.contactColor
  }">${getInitials(contact.name)}</div>`;
}

function renderLoginPageHTML() {
  return /*html*/ `
  <div id="loginMainContainer" class="loginMainContainer">
    <div class="blue-overlay d-none" id="blue-overlay">
        <div class="joinLogoWhite logo-animation" id="logo">
            <img src="./assets/img/logo-big_white.png" alt="logo">
        </div>
    </div>
    <header class="loginHeader">
        <div class="joinLogoBlue">
            <img src="./assets/img/logo-medium_blue.png" alt="logo">
        </div>
        <div class="signUpField">
            <span>Not a join user yet?</span>
            <button class="loginButtons signUpButton" onclick="renderSignUp()">Sign up</button>
        </div>
    </header>
    <div class=" login-page">
        <div class="login-box">
            <div class="h1LoginBox">
                <h1 class="loginH1">Log in</h1>
                <div class="horizontalH1Underline"></div>
            </div>
            <div class="formDiv">
                <form onsubmit="loginUser(); return false;">
                    <div class=" innerLoginBox">
                        <div class="loginEmailBox">
                            <input type="email" id="loginEmailInput" placeholder="Email" required>
                            <div class="mailIcon"><img src="./assets/img/icon-mail.png" alt="letter"></div>
                        </div>

                        <div class="loginPasswordBox">
                            <input type="password" id="loginPasswordInput" placeholder="Password" required>
                            <div class="mailIcon"><img src="./assets/img/icon-lock.png" alt="lock"></div>
                        </div>
                    </div>
                    <div class="checkboxBox">
                        <label for="rememberMe" class="custom-checkbox">
                            <img src="./assets/img/icon-check_button_unchecked.png" alt="checkbox image">
                            Remember me</label><br>
                    </div>
                    <div class="loginButtonsBox">
                        <button class="loginButtons loginButtonUser" onclick="login()">Log in</button>
                        <!--TODO-->
                        <button class="loginButtons loginButtonGuest">Guest log in</button>
                    </div>
                </form>
                <!-- TODO darf nur angzeigt werden, wenn Nachricht wirklich da (z.B. you are signed up now!) -->
                <div id="msgBox"></div>
            </div>
        </div>
        <div class="signUpField-mobile ">
            <span>Not a join user yet?</span>
            <button class="loginButtons signUpButton signUpButton-mobile" onclick="renderSignUpPage()">Sign
                up</button>
        </div>
        <div class="loginFooter">
            <div class="privacyPolicy" onclick=""><span>Privacy policy</span></div>
            <div class="legalNotice" onclick=""><span>Legal notice</span></div>
        </div>


    </div>
</div>

    `;
}

function renderSignUpPageHTML() {
  return /*html*/ `
    <div id="signUpMainContainer" class="signUpMainContainer">

        <header class="loginHeader">
            <div class="joinLogoSignUpWhite">
                <img class="signUpLogo" src="./assets/img/logo-medium_white.png" alt="logo">
            </div>

        </header>
        <div class="signUp-page">
            <div class="signUp-box">
                <div class="arrowLeft"><img src="./assets/img/icon-arrow_left.png" alt="arrow left"></div>

                <div class="h1SignUpBox">
                    <h1 class="signUpH1">Sign up</h1>
                    <div class="horizontalH1UnderlineSignUp"></div>
                </div>

                <div class="formDiv">
                    <form onsubmit="addUser(); return false">
                        <div class="innerSignUpBox">
                            <div class="signUpEmailBox">
                                <input type="email" id="signUpEmailInput" placeholder="Email" required>
                                <div class="mailIcon"><img src="./assets/img/icon-mail.png" alt="letter"></div>
                            </div>

                            <div class="signUpPasswordBox">
                                <input type="password" id="signUpPasswordInput" placeholder="Password" required>
                                <div class="mailIcon"><img src="./assets/img/icon-lock.png" alt="lock"></div>
                            </div>
                        </div>
                        <input type="checkbox" value="acceptingPrivacyPolicy" id="acceptingPrivacyPolicy">
                        <label for="acceptingPrivacyPolicy">I accept the <a href="#">Privacy Policy</a> </label><br>

                        <button class="signUpButtons signUpButtonUser">Sign up</button>

                        <!--TODO-->
                    </form>
                </div>
            </div>

            <div class="signUpFooter">
                <div class="privacyPolicySignUp" onclick=""><span>Privacy policy</span></div>
                <div class="legalNoticeSignUp" onclick=""><span>Legal notice</span></div>
            </div>


        </div>
    </div>
    `;
}


function renderBoardAddTaskHeaderHTML(){
    return /*html*/`
    <div class="boardAddTaskHeader">
    <div class="boardAddTaskHeaderText"> Add Task</div>
    <div class="boardAddTaskCloseHoverContainer" onclick="hideAddTaskContainer()"></div>
 </div>`
}


function renderAddTaskMainContentHTML(){
    return /*html*/ `<div class="addTaskBodyLeft">
        <div class="addTaskBodyTop">
            <div class="addTaskAddTitleContainer">
                <input type="text" id="addTaskEnterTitleInput" placeholder="Enter a title" required>
                <div class="addTaskRequired" id="requiredTitle"></div>
            </div>
            <div class="addTaskDescription">
                <div class="addTaskTitles"><span class="bold">Description</span> (optional)</div>
                <div>
                <div class="textAreaContainer">
                    <textarea id="addTaskDescriptionInput" type="text"></textarea>
                </div>
            </div>
            </div>
            <div class="addTaskDueDate ">
                <div class="addTaskTitles"><span class="bold">Due date</span></div>
                <div>
                    <div class="addTaskDueDateInputContainer border-bottom pointer" id="addTaskDueDateInputContainer" onclick="addTaskDueDateOpenCalendear()">
                        <input id="addTaskDueDateInput" type="date"  value="">
                        <div class="addTaskDueDateImage"></div>
                    </div>
                    <div class="addTaskRequired" id="requiredDueDate"></div>
                </div>
            </div>
        </div>
        <div class="addTaskBodyBottom">
        <div class="addTaskPriority">
            <div class="addTaskTitles bold">Priority</div>
            <div class="addTaskPriorityButtonContainer">
                <div id="addTaskPriorityButtonurgent" class="addTaskPriorityButton"  onclick="setPriority('urgent')">
                    <div class="priorityButtonText">Urgent</div>
                    <img src="./assets/img/icon-priority_urgent.png" alt="Priority urgent">
                </div>
                <div id="addTaskPriorityButtonmedium" class="addTaskPriorityButton" onclick="setPriority('medium')">
                    <div class="priorityButtonText">Medium</div>
                    <img src="./assets/img/icon-priority_medium.png" alt="Priority medium">
                </div>
                <div id="addTaskPriorityButtonlow" class="addTaskPriorityButton"  onclick="setPriority('low')">
                    <div class="priorityButtonText">Low</div>
                    <img src="./assets/img/icon-priority_low.png" alt="Priority low">
                </div>

            </div>
        </div>
        <!-- BEGIN ASSIGNED TO -->
        <div class="addTaskContainer">
            <div class="addTaskTitle"><span class="bold">Assigned to</span> (optional)</div>
            <div class="addTask-dropdown-contact pointer border-bottom" onclick="renderArrow('custom-arrow-assignedTo', 'dropdown-content-assignedTo')">
                <div class="addTask-custom-select">
                    <span id="dropdown-assignedTo-title">Select contacts to assign</span>
                    <div class="addTask-custom-arrow" id="custom-arrow-assignedTo">
                        <img data-direction="down" src="../../assets/img/icon-arrow_dropdown_down.png" alt="">
                    </div>
                </div>
            </div>
                <div class="addTask-dropdown-content d-none" id="dropdown-content-assignedTo">
                </div>
                <div id="assignedContactsContainer" class="assignedContactsContainer cardAssignedToContainer d-none"> CONTACT 1, CONTACT 2</div>
        </div>
        <div class="addTaskContainer ">
            <div class="addTaskTitle bold">Category </div>
            <div class="addTask-dropdown-category pointer border-bottom" onclick="renderArrow('custom-arrow-category', 'dropdown-content-category')">
                <div class="addTask-custom-select">
                    <span id="dropdown-category-title">Select task category</span>
                        <div class="addTask-custom-arrow" id="custom-arrow-category">
                        <img data-direction="down" src="../../assets/img/icon-arrow_dropdown_down.png" alt="">
                        <!-- TODO: <div data-direction="down" src="../../assets/img/icon-arrow_dropdown_down.png" alt=""></div> -->
                    </div>
                </div>
            </div>
            <div class="addTask-dropdown-content d-none no-scroll" id="dropdown-content-category">
                <div class="dropdownOption" onclick="chooseCategory('Technical Task')">Technical Task</div>
                <div class="dropdownOption" onclick="chooseCategory('User Story')">User Story</div>
            </div>
                <!-- <div id="assignedContactsContainer" class="assignedContactsContainer cardAssignedToContainer"> CONTACT 1, CONTACT 2</div> -->
        </div>
        <div class="addTaskSubtasks">
            <div class="addTaskTitles"><span class="bold">Subtasks</span> (optional)
            </div>
            <div id="subtaskBottom" class="subtaskBottom border-bottom" onclick="renderSubtaskInputField()">
                <input type="text" id="subtaskInputField" placeholder="Add new subtask">
                <div id="subtaskImgAddPlus" class="subtaskImgDiv pointer"></div>
            </div>
            <div id="subtasksOutputContainer"></div>
        </div>
        <div class="addTaskEmptyDiv"></div>
        </div>
    </div>`
}
function renderAddTaskFooterHTML(){
    return /*html*/ `
        <div class="addTaskBodyRight">
            <div class="addTaskBtnContainer">
                <div class="clearBtn addTaskBtn">
                    <span class="addTaskBtnText">Clear</span>
                    <div class="clearBtnImg"></div>
                </div>
                <div id="createBtn" class="createBtn addTaskBtn disabled">
                    <span class="addTaskBtnText">Create Task</span>
                    <div class="createBtnImg"></div>
                </div>
            </div>
        </div>
    `
}