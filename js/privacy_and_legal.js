/**
 * the init-function in body onload
 */
async function privacyInit() {
	await includeHTML();
	changeLinks();
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
	const searchStringPrivacyExternal = "privacy_external.html";
	const searchStringLegal = "legal_notice.html";
	const searchStringLegalExternal = "legal_notice_external.html";

	if (currentURL.includes(searchStringPrivacy) || currentURL.includes(searchStringPrivacyExternal)) {
		const privacyNavLink = document.getElementById('privacyNav');
		privacyNavLink.classList.add('highlit');
	} else if (currentURL.includes(searchStringLegal) || currentURL.includes(searchStringLegalExternal)) {
		const legalNavLink = document.getElementById('legalNav');
		legalNavLink.classList.add('highlit');
	}
}

function changeLinks(){
	const currentUrl = window.location.href;
	if (currentUrl.includes("external")) {
		document.getElementById('privacyNav').children[0].setAttribute("href", "privacy_external.html");
		document.getElementById('legalNav').children[0].setAttribute("href", "legal_notice_external.html");
	}
}



