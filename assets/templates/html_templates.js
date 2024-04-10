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
            <h1 class="no-wrap">Good morning,</h1>
            <h1 id="usernameForGreeting">Sofia XXX</h1>
        </div>
        <div id="h1GreetingGuest" class="h1-box" style="display: none;">
            <h1 class="no-wrap">Good morning</h1>
        </div>
        <div class="line1">
            <div class="urgentAndDate" id="urgentAndDate">
                <div class="urgentBox">
                    <div class="image-and-amount flex">
                        <img src="./assets/img/icon-blue-urgent_clock-with-border.png" alt="clock symbol">
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

function renderAddTaskHTML() {
  return /*html*/ `<div class="addTask-content">Content Of AddTask</div>`;
}

function renderBoardHTML() {
  return /*html*/ `
    <div class="board-Container">
        <div class="boardTopContainer">
            <div class="searchTaskContainer">
                <div class="searchTaskInner"><input id="findTask" placeholder="Find Task" type="text">
                    <div class="searchImg" onclick="searchTask()"> </div>
                </div>
            </div>
        </div>
        <div class="category-container">
            <div class="category">
                <div class="categoryTitle">
                    <h2>To Do</h2>
                    <div class="addTaskButton" onclick="addTask('todo')"></div>
                </div>
                <div id="todo" class="categoryTasks">
                    </div>
                </div>
                <div class="category">
                    <div class="categoryTitle">
                        <h2>In progress</h2>
                        <div class="addTaskButton" onclick="addTask('inProgress')"></div>
                    </div>
                    <div id="inProgress" class="categoryTasks">

                </div>
            </div>
            <div class="category">
                <div class="categoryTitle">
                    <h2>Await feedback</h2>
                    <div class="addTaskButton" onclick="addTask('awaitFeedback')"></div>
                </div>
                <div id="awaitFeedback" class="categoryTasks">
                </div>
            </div>
            <div class="category">
                <div class="categoryTitle">
                    <h2>Done</h2>
                    <div class="addTaskButton" onclick="addTask('done')"></div>
                </div>
                <div id="done" class="categoryTasks">
                </div>
            </div>
        </div>
    </div>`;
}

// function renderContactsHTML() {
//   return /*html*/ `<div class="contacts-content">Content Of Contacts</div>`;
// }

/**
 *
 * @param {object} content the div the cards will be rendered in
 * @param {array} categoryCards JSON of cards (fitting to the category)
 */
function renderCardsHTML(content, categoryCards) {
  if (categoryCards.length != 0) {
    for (let i = 0; i < categoryCards.length; i++) {
      let card = categoryCards[i];
      content.innerHTML += /*html*/ `
        <div draggable="true" id="${card["id"]}" class="card">
            <div class="cardType">${card["type"]}</div>
            <div class="cardTitle">${card["title"]}</div>
            <div class="cardText">${card["text"]}</div>
            <div class="cardSubtasks">${renderSubtask(card)}</div>
            <div class="cardBottomContainer">
                <div class="cardAssignedToContainer">${card["assignedTo"]}</div>
                <div class="cardPriority">${setPriorityImage(card["priority"])}</div>
            </div>
        </div>`;
    }
  } else {
    content.innerHTML += `<div class="emptyCategory">Nothing to do</div>`;
  }
}


function renderLoginPageHTML(){
    return /*html*/`     
    <div class="loginMainContainer">
        <header class="loginHeader">
    <div class="joinLogoBlue">
        <img src="./assets/img/logo-medium_blue.png" alt="logo">
    </div>
    <div class="signUpField">
        <span>Not a join user yet?</span>
        <button class="loginButtons signUpButton" onclick="openSignUpPage()">Sign up</button> <!--TODO-->
    </div>
</header>
<div class="login-page">
    <div class="login-box">
        <div class="h1LoginBox">
            <h1 class="loginH1">Log in</h1>
            <div class="horizontalH1Underline"></div>
        </div>
        <div class="formDiv">
            <form action="">
                <div class="innerLoginBox">
                    <div class="loginEmailBox">
                        <input type="email" id="loginEmailInput" placeholder="Email">
                        <div class="mailIcon"><img src="./assets/img/icon-mail.png" alt="letter"></div>
                    </div>

                    <div class="loginPasswordBox">
                        <input type="password" id="loginPasswordInput" placeholder="Password">
                        <div class="mailIcon"><img src="./assets/img/icon-lock.png" alt="lock"></div>
                    </div>
                </div>
                <input type="checkbox" value="lsRememberMe" id="rememberMe">
                <label for="rememberMe">Remember me</label><br>


                <input class="loginButtons loginButtonUser" type="submit" value="Login"
                    onclick="lsRememberMe()">
                <!--TODO-->
                <input class="loginButtons loginButtonGuest" type="submit" value="Guest log in"
                    onclick="lsRememberMe()"> <!--TODO-->

            </form>
        </div>
    </div>

    <div class="loginFooter">
        <div class="privacyPolicy" onclick=""><span>Privacy policy</span></div>
        <div class="legalNotice" onclick=""><span>Legal notice</span></div>
    </div>
</div>
</div>`;
}


function renderSignUpPageHTML(){
    return /*html*/`<div class="signUpMainContainer"><form onsubmit="register(); return false;">
        <input type="text" id="email">
        <input type="password" id="password">
        <button id="registerBtn">Registrieren</button>
        </form>
    </div>`;
}
