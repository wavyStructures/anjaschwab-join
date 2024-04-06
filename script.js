async function init() {
  renderHeader();
  renderNavigation();
  renderBoard();
}


/**
 * Includes HTML-Files into container containing "w3-include-html"-attribute 
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


function getDiv(id) {
  let content = document.getElementById(id);
  return content;
}


function renderNavigation() {
  let content = getDiv('navigation-container');
  content.innerHTML = renderNavigationHTML();
}


function renderHeader() {
  let content = getDiv('header');
  content.innerHTML = renderHeaderHTML();
}


function renderSummary() {
  let content = getDiv('main');
  content.innerHTML = renderSummaryHTML();
}


function renderAddTask() {
  let content = getDiv('main');
  content.innerHTML = renderAddTaskHTML();
}


function renderBoard() {
  let content = getDiv('main');
  content.innerHTML = renderBoardHTML();
}


function renderContacts() {
  let content = getDiv('main');
  content.innerHTML = renderContactsHTML();
}


let today = new Date();
let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
let formattedDate = today.toLocaleDateString("en-US", options);

/**
 * summary current date insertion into template
 */
document.querySelector('.date').textContent = formattedDate;

// /**
//  *
//  * @param {String} folderPath
//  */
// function dynamicallyLoadScriptsFromFolder(folderPath) {
//   var scripts = [
//     'allTasks.js',
//     'board.js',
//     'contacts.js',
//     'contact_list.js',
//     'contact_popups.js',
//     'login.js',
//     'navigation.js',
//     'register.js',
//     'storage.js',
//     'summary.js'
//   ];



//   scripts.forEach(function(script) {
//       var scriptElement = document.createElement("script");
//       scriptElement.src = folderPath + "/" + script;
//       scriptElement.setAttribute("defer","");
//       document.head.appendChild(scriptElement);
//   });
//   console.log("JS imported")
// }

