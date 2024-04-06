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
        <div class="h1-box">
            <h1>Good morning</h1>
        </div>
        <div class="line1">
            <div class="urgentAndDate" id="urgentAndDate">
                <div class="urgentBox">
                    <div class="image-and-amount">
                        <img src="./assets/img/icon-blue-urgent_clock.png" alt="clock symbol" class="white-border">
                        <span>1</span>
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
                    <span>Task in Bord</span>
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
                    <span>Tasks To-do</span>
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
                    <span>Tasks Done</span>
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
    <div class="boardTopContainer">
        <input class="searchTaskInput" type="text" onclick="searchTask()">
    </div>
    </div>
    <div class="category-container">
        <div id="categoryTodo" class="category">
            <div class="categoryTitle">
                <h2>To Do</h2>
                <img src="./assets/img/icon-plus button.png">
            </div>
            <div class="categoryTasks">
                <div draggable="true" id="task_1" class="card"></div>
                <div draggable="true" id="task_2" class="card"></div>
                <div draggable="true" id="task_3" class="card"></div>
            </div>
        </div>
        <div id="categoryInProgress" class="category">
            <div class="categoryTitle">
                <h2>In progress</h2>
                <img src="./assets/img/icon-plus button.png">
            </div>
            <div class="categoryTasks">
                <div draggable="true" id="task_3" class="card"></div>
            </div>
        </div>
        <div id="categoryAwaitFeedback" class="category">
            <div class="categoryTitle">
                <h2>Await feedback</h2>
                <img src="./assets/img/icon-plus button.png">
            </div>
            <div class="categoryTasks">
                <div draggable="true" id="task_3" class="card"></div>
            </div>
        </div>
        <div id="categoryDone" class="category">
            <div class="categoryTitle">
                <h2>Done</h2>
                <img src="./assets/img/icon-plus button.png">
            </div>
            <div class="categoryTasks">
                <div draggable="true" id="task_3" class="card"></div>
            </div>
        </div>`;
}

function renderContactsHTML() {
  return /*html*/ `<div class="contacts-content">Content Of Contacts</div>`;
}

function renderCardsHTML(){
    console.log('aktualisiert!')
}