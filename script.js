/**
 * the init-function in body onload
 */
async function init() {
	includeHTML();
	mobileGreeting();
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
	showInitials();
	setActiveNavButton();
	window.addEventListener('resize', setActiveNavButton);
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



/***************************************ab hier für Header-Elemente und Navigation********************************* */
/**
 * open help page
 */
function openHelp() {
	switchPage('help.html');
}


/**
 * Logs out the current user by removing the 'currentUser' item from the local storage and redirecting to the login page.
 */
function logout() {
	localStorage.removeItem('currentUser');
	switchPage('login.html');
}


/**
 * Displays the initials of the current user in the 'userInitials' element. If no user is logged in, displays 'G' for guest instead.
 */

function showInitials() {
	try {
		let userAsString = localStorage.getItem('currentUser');

		if (userAsString) {
			let userName = JSON.parse(userAsString).name;
			let userInitials = getInitials(userName);
			document.getElementById('userInitials').innerHTML = userInitials;
		} else {
			document.getElementById('userInitials').innerHTML = 'G';
		}
	} catch (error) {
		console.error('Error while retrieving user data from localStorage:', error);
		// Handle the error accordingly, such as setting a default value or displaying an error message.
		document.getElementById('userInitials').innerHTML = 'G';
	}
}


/**
 * opens small menu onclick on intials button inside header
 */
// function openSmallMenu() {
// 	let content = getDiv("smallMenu");
// 	content.classList.toggle("opacityZero");
// 	content.classList.toggle("visible");
// }

function openSmallMenu() {
	let screenWidth = window.innerWidth;
	let smallMenu = getDiv("smallMenu");
	let smallMenuMobile = getDiv("smallMenuMobile");

	if (screenWidth <= 701) {
		smallMenu.classList.remove("opacityZero");
		smallMenu.classList.remove("visible");
		smallMenuMobile.classList.toggle("d-none");
	} else {
		smallMenuMobile.classList.add("d-none");
		smallMenu.classList.toggle("opacityZero");
		smallMenu.classList.toggle("visible");
	}
}


/**
 * Updates the window location pathname to the new URL.
 *
 * @param {string} newUrl - The new URL to navigate to
 */
function switchPage(newUrl) {
	window.location.href = newUrl;
}


/**
 * Opens a new tab with the specified URL.
 *
 * @param {string} newUrl - The URL to open in the new tab
 */
function switchPageNewTab(newUrl) {
	window.open(newUrl, '_blank');
}


/**
 * Sets the active navigation button based on the current location pathname.
 */
function setActiveNavButton() {
	const summaryNavLink = document.getElementById('summary');
	const addTaskNavLink = document.getElementById('addTask');
	const boardNavLink = document.getElementById('board');
	const contactsNavLink = document.getElementById('contacts');
	const activeNavLink = document.querySelector('.nav-btn.active');

	// Remove active class from any previously active nav link
	if (activeNavLink) {
		activeNavLink.classList.remove('active');
	}

	switch (location.pathname) {
		case '/summary.html':
			summaryNavLink.classList.add('active');
			if (window.innerWidth < 700) {
				summaryNavLink.querySelector('img').src = './assets/img/icon-summary-marked.png';
			}
			break;
		case '/addTask.html':
			addTaskNavLink.classList.add('active');
			if (window.innerWidth < 700) {
				addTaskNavLink.querySelector('img').src = './assets/img/icon-addTask-marked.png';
			}
			break;
		case '/board.html':
			boardNavLink.classList.add('active');
			if (window.innerWidth < 700) {
				boardNavLink.querySelector('img').src = './assets/img/icon-board-marked.png';
			}
			break;
		case '/contacts.html':
			contactsNavLink.classList.add('active');
			if (window.innerWidth < 700) {
				contactsNavLink.querySelector('img').src = './assets/img/icon-contacts-marked.png';
			}
			break;
		default:
			break;
	}
}



// function setActiveNavButton() {
// 	switch (location.pathname) {
// 		case '/summary.html':
// 			document.getElementById('summary').classList.add('active');
// 			break;
// 		case '/addTask.html':
// 			document.getElementById('addTask').classList.add('active');
// 			break;
// 		case '/board.html':
// 			document.getElementById('board').classList.add('active');
// 			break;
// 		case '/contacts.html':
// 			document.getElementById('contacts').classList.add('active');
// 			break;
// 		default:
// 			break;
// 	}
// }

async function mobileGreeting() {
	if (window.innerWidth < 800) {
		await greetUserMobile();
		await delay(1200); // Wait 1.2 seconds
		hideGreeting();
	}
}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function greetUserMobile() {
	let userName = await getUserName();
	let greetingElement = document.getElementById('greeting-mobile');
	let currentHour = new Date().getHours();
	let greetingText;

	if (currentHour < 12) {
		greetingText = "Good morning";
	} else if (currentHour < 18) {
		greetingText = "Good afternoon";
	} else {
		greetingText = "Good evening";
	}

	if (userName === 'Gast') {
		greetingElement.textContent = `${greetingText}`;
	} else {
		let greetingElementUser = document.getElementById('greeting-mobile-user');
		greetingElementUser.textContent = `${greetingText},`;
		greetingElement.textContent = `${userName}`;
		greetingElement.style.color = '#005DFF';
	}
}




function getUserName() {
	return new Promise(resolve => {
		let userName = localStorage.getItem('currentUserName');
		resolve(userName);
	});
}

function hideGreeting() {
	let greetingContainer = document.querySelector('.greeting-container');
	greetingContainer.style.display = 'none';
}

mobileGreeting();


/**
 * Locks the screen orientation to portrait.
 */

function lockScreenOrientation() {
	// Check if screen.orientation and screen.orientation.lock are supported
	if (screen.orientation && screen.orientation.lock) {
		screen.orientation.lock('portrait')
			.catch(error => {
				// console.warn('Failed to lock screen orientation:', error);
			});
	} else {
		// console.warn('Screen orientation lock is not supported on this device.');
	}

	// Set the height of the body element to 100vH
	document.body.style.height = '100vH';
}

// Call the function to lock screen orientation and set body height when the page loads
window.addEventListener('load', lockScreenOrientation);

// function lockScreenOrientation() {
// 	if (screen.orientation && screen.orientation.lock) {
// 		screen.orientation.lock('portrait');
// 	}

// 	document.body.style.height = '100vw';
// }

// // Call the function to lock screen orientation when the page loads
// window.addEventListener('load', lockScreenOrientation);

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

