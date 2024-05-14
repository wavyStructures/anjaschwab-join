/**
 * the init-function in body onload
 */
async function PrivacyInit() {
	includeHTML();
	// mobileGreeting();
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
	highlightPrivacyNavLink();
}



function highlightPrivacyNavLink() {
	const currentURL = window.location.href;
	const searchString = "privacy.html";

	if (currentURL.includes(searchString)) {
		const privacyNavLink = document.getElementById('privacyNav');

		privacyNavLink.classList.add('highlit');
	}
}



