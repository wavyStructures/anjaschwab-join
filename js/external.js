let toBeHighlighted;

function externalPagesInit() {
  hideNavigation();
  addClassOfActive('.legalHighlight');
}

function hideNavigation() {
  let navigation = document.querySelector(".navigation-container .navigation-content");
  if (navigation) {
    navigation.style.opacity = 0;
  } else {
    console.error("Navigation content not found.");
  }
}

function addClassOfActive(linkClass) {
  let toBeRemovedHighlights = document.querySelectorAll(".active");
  if (toBeRemovedHighlights) {
    toBeRemovedHighlights.forEach(toBeHighlighted => toBeHighlighted.classList.remove('active'));
  }

  toBeHighlighted = document.querySelector(linkClass);
  if (toBeHighlighted) {
    toBeHighlighted.classList.add('active');
  } else {
    console.error("ToBeHighlighted content not found.");
  }
}