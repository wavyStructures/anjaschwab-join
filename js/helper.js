function clearDiv(id) {
	return (document.getElementById(id).innerHTML = "");
}

function doNotClose(event) {
	event.stopPropagation();
}
