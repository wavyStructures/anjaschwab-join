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

function findFreeId(arrayToCheck) {
  for (let i = 0; i < 1000; i++) {
    let free = true;
    for (let j = 0; j < arrayToCheck.length; j++) {
      if (arrayToCheck[j].id == i) {
        free = false;
      }
    }
    if (free) {
      return i;
    }
  }
}


/**
 * Generates a random color from a predefined list of colors.
 *
 * @function generateRandomColor
 * @returns {string} A randomly selected color.
 */
function generateRandomColor() {
  const colors = [
    "#76b852",
    "#ff7043",
    "#ff3333",
    "#3399ff",
    "#ff6666",
    "#33ccff",
    "#ff9933",
    "#66ff66",
    "#0059ff",
    "#a64dff",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}