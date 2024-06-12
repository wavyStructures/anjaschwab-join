let isSmallerThan802 = false;
let isSmallerThan802Old = false;


/**
 * the init-function in body onload
 */
async function init() {
	includeHTML();
	mobileGreeting();
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
	addResizeEventListener();
}

/**
 * Adds an event listener to the window's resize event. When the window is resized,
 * it checks if the window's inner width is less than or equal to 802. If it is,
 * it sets the isSmallerThan802 variable to true. Otherwise, it sets it to false.
 * If the value of isSmallerThan802 has changed since the last resize event,
 * it updates isSmallerThan802Old with the new value and calls the setActiveNavButton
 * function.
 *
 * @return {void} This function does not return anything.
 */
function addResizeEventListener(){
	window.addEventListener('resize', () => {
		if (window.innerWidth <= 802) {
			isSmallerThan802 = true;
		} else {
			isSmallerThan802 = false;
		}
		if (isSmallerThan802 !== isSmallerThan802Old){
			isSmallerThan802Old = isSmallerThan802;
			setActiveNavButton(); 
		}
	});
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
 * rendering the board-page,
 * calling renderCategories to render all available tasks to each category
 */
function renderBoard() {
	let content = getDiv("main");
	content.innerHTML = renderBoardHTML();
	renderCategories();
}


/***************************************ab hier für Header-Elemente und Navigation********************************* */
/**
 * open help page
 */
function openHelp() {
	switchPage('help.html');
}


function checkIfUserIsRemembered() {
	if (!sessionStorage.getItem('currentUser')) {
		if (localStorage.getItem('rememberedUser') != null) {
			sessionStorage.setItem('currentUser', localStorage.getItem('rememberedUser'));
			if (window.location.href == 'index.html') switchPage('summary.html');
		}
	}
}


/**
 * Logs out the current user by removing the 'currentUser' item from the local storage and redirecting to the login page.
 */
function logout() {
	localStorage.removeItem('rememberedUser');
	sessionStorage.removeItem('currentUser');
	switchPage('index.html');
}

// document.addEventListener('DOMContentLoaded', function () {
// 	let user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
// 	if (user) {
// 		switchPage('summary.html');
// 	}

// });


/**
 * Displays the initials of the current user in the 'userInitials' element. If no user is logged in, displays 'G' for guest instead.
 */
function showInitials() {
	checkIfUserIsRemembered()
	try {
		let userAsString = sessionStorage.getItem('currentUser');
		let userInitialsElement = document.getElementById('userInitials');

		if (userInitialsElement) {
			if (userAsString) {
				let userName = JSON.parse(userAsString).username;
				let userInitials = getInitials(userName);
				userInitialsElement.innerHTML = userInitials;
			} else {
				userInitialsElement.innerHTML = 'G';
			}
		}
	} catch (error) {
		console.error('Error while retrieving user data from localStorage:', error);
		// Handle the error accordingly, such as setting a default value or displaying an error message.
		let userInitialsElement = document.getElementById('userInitials');
		if (userInitialsElement) {
			userInitialsElement.innerHTML = 'G';
		}
	}
}


/**
 * Function to handle opening the small menu based on screen width.
 */
function openSmallMenu() {
	let screenWidth = window.innerWidth;
	let smallMenu = getDiv("smallMenu");
	let smallMenuMobile = getDiv("smallMenuMobile");

	if (screenWidth <= 801) {
		smallMenu.classList.remove("d-none");
		// smallMenu.classList.remove("visible");
		smallMenuMobile.classList.toggle("d-none");
	} else {
		smallMenuMobile.classList.add("d-none");
		smallMenu.classList.toggle("d-none");
		// smallMenu.classList.toggle("visible");
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


	const privacyNavLink = document.getElementById('privacyNav');

	// Remove active class from any previously active nav link
	if (activeNavLink) {
		activeNavLink.classList.remove('active');
	}

	switch (location.pathname) {
		case '/summary.html':
			summaryNavLink.classList.add('active');
			if (isSmallerThan802) {
				summaryNavLink.querySelector('img').src = './assets/img/icon-summary-marked.png';
			} else {
				summaryNavLink.querySelector('img').src = './assets/img/icon-summary.png';
			}
			break;
		case '/addTask.html':
			addTaskNavLink.classList.add('active');
			if (isSmallerThan802) {
				addTaskNavLink.querySelector('img').src = './assets/img/icon-addTask-marked.png';
			} else {
				addTaskNavLink.querySelector("img").src = './assets/img/icon-addTask.png';
			}
			break;
		case '/board.html':
			boardNavLink.classList.add('active');
			if (isSmallerThan802) {
				boardNavLink.querySelector('img').src = './assets/img/icon-board-marked.png';
			} else {
				boardNavLink.querySelector('img').src = './assets/img/icon-board.png';
			}
			break;
		case '/contacts.html':
			contactsNavLink.classList.add('active');
			if (isSmallerThan802) {
				contactsNavLink.querySelector('img').src = './assets/img/icon-contacts-marked.png';
			} else {
				contactsNavLink.querySelector('img').src = './assets/img/icon-contacts.png';
			}
			break;

		default:
			break;
	}
}


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

	// // Set the height of the body element to 100vH
	// document.body.style.height = '100vH';
}

// Call the function to lock screen orientation and set body height when the page loads
window.addEventListener('load', lockScreenOrientation);


function goBack() {
	const previousURL = document.referrer;
	if (previousURL.includes('index')){
		window.close()
	}else{
		window.history.go(-1);
	}
}


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

