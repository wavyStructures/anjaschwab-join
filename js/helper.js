function clearDiv(id) {
	return (document.getElementById(id).innerHTML = "");
}

function doNotClose(event) {
	event.stopPropagation();
}

function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
