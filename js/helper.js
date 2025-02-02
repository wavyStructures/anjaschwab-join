/**
 * Clears the inner HTML content of the element with the specified ID.
 *
 * @param {string} id - The ID of the element to clear.
 * @return {string} An empty string.
 */
function clearDiv(id) {
  return (document.getElementById(id).innerHTML = "");
}


/**
 * Prevents the event from propagating further.
 *
 * @param {Event} event - The event object to prevent from further propagation.
 * @return {undefined} 
 */
function doNotClose(event) {
  event.stopPropagation();
}


/**
 * Sets the attributes of the given element based on the key-value pairs in the attrs object.
 *
 * @param {Element} el - The element to set attributes for.
 * @param {Object} attrs - An object containing key-value pairs of attributes to set.
 * @return {undefined}
 */
function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}


/**
* Finds a free ID within the given array by iterating over a range of IDs.
*
* @param {Array} arrayToCheck - The array to check for free IDs.
* @return {number} The first available free ID.
*/
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


// /**
//  * Generates a random color from a predefined list of colors.
//  *
//  * @function generateRandomColor
//  * @returns {string} A randomly selected color.
//  */
// function generateRandomColor() {
//   const colors = [
//     "#76b852",
//     "#ff7043",
//     "#ff3333",
//     "#3399ff",
//     "#ff6666",
//     "#33ccff",
//     "#ff9933",
//     "#66ff66",
//     "#0059ff",
//     "#a64dff",
//   ];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// }