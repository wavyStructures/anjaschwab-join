/**
 * the init-function in body onload
 */
async function privacyInit() {
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
	highlightPrivacyLegalNavLink();
}



function highlightPrivacyLegalNavLink() {
	const currentURL = window.location.href;
	const searchStringPrivacy = "privacy.html";
	const searchStringLegal = "legal_notice.html";

	if (currentURL.includes(searchStringPrivacy)) {
		const privacyNavLink = document.getElementById('privacyNav');
		privacyNavLink.classList.add('highlit');
	} else if (currentURL.includes(searchStringLegal)) {
		const legalNavLink = document.getElementById('legalNav');
		legalNavLink.classList.add('highlit');
	}
}



