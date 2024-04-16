function startAnimation() {
    // setTimeout(function () {

    let blueOverlay = document.getElementById("blue-overlay");
    console.log(blueOverlay);
    blueOverlay.style.display = "block";
    document.getElementById("logo").classList.add("logo-animation");

    // }, 30000); // 30 seconds
}

function login() {
    let email = document.getElementById('loginEmailInput');
    let password = document.getElementById('loginPasswordInput');
    let user = users.find(user => user.email == email.value && user.password == password);
    console.log(user);
    if (user) {
        console.log('user gefunden');
    }
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if (msg) {
    msgBox.innerHTML = msg;
} else {
    //TODO display: none
}
