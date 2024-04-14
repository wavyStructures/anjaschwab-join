function startAnimation() {
    // setTimeout(function () {

    let blueOverlay = document.getElementById("blue-overlay");
    console.log(blueOverlay);
    blueOverlay.style.display = "block";
    document.getElementById("logo").classList.add("logo-animation");

    // }, 30000); // 30 seconds
}

