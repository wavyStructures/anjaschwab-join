function renderNavigationHTML(){
    return `<div class="navigation-content">
    <div id="summary" class="nav-btn" onclick="renderSummary()"><img src="./assets/img/icon-summary.png" alt="summary">Summary</div>
    <div id="addTask" class="nav-btn" onclick="renderAddTask()"><img src="./assets/img/icon-addTask.png" alt="add task">Add Task</div>
    <div id="board" class="nav-btn" onclick="renderBoard()"><img src="./assets/img/icon-board.png" alt="board">Board</div>
    <div id="contacts" class="nav-btn" onclick="renderContacts()"><img src="./assets/img/icon-contacts.png" alt="contacts">Contacts</div>
</div>`
}


function renderHeaderHTML(){
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
    </div>`
}


function renderSummaryHTML(){
    return `<div class="summary-content">Content Of Summary</div>`
}