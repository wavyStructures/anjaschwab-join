/**
 * the init-function in body onload
 */
async function init() {
	includeHTML();
	// startAnimation();
	// renderHeader();
	// renderNavigation();
	// renderBoard();
	// renderLogin();
	// renderSignUp();
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

/**
 *
 * @param {string} id id eines divs
 * @returns div with given id
 */
function getDiv(id) {
	let content = document.getElementById(id);
	return content;
}

/**
 * rendering the navigation on on the left side
 */
function renderNavigation() {
	let content = getDiv("navigation-container");
	content.innerHTML = renderNavigationHTML();
}

/**
 * rendering the header
 */
function renderHeader() {
	let content = getDiv("header");
	content.innerHTML = renderHeaderHTML();
}

/**
 * rendering the login-page
 */
function renderLogin() {
	let content = getDiv("loginPage");
	content.classList.remove("d-none");
	document.getElementById("signUpPage").classList.add("d-none");
	document.getElementById("main-wrapper").classList.add("d-none");
	content.innerHTML = renderLoginPageHTML();
}

/**
 * rendering the signUp-page
 */
function renderSignUp() {
	let content = getDiv("signUpPage");
	content.classList.remove("d-none");
	document.getElementById("loginPage").classList.add("d-none");
	document.getElementById("main-wrapper").classList.add("d-none");
	content.innerHTML = renderSignUpPageHTML();
}

/**
 * rendering the summary-page
 */
function renderSummary() {
	let content = getDiv("main");
	content.innerHTML = renderSummaryHTML();
}

/**
 * rendering the addTask-page
 */
function renderAddTask() {
	let content = getDiv("main");
	content.innerHTML = renderAddTaskHTML();
}

/**
 * rendering the board-page,
 * calling renderCategories to render all available tasks to each category
 */
function renderBoard() {
	let content = getDiv("main");
	content.innerHTML = renderBoardHTML();
	renderCategories();
}

/**
 * rendering contacts-page
 */
function renderContacts() {
	loadContacts();
}

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
