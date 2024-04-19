function loginInit() {
    includeHTML();
    startAnimation();
    login();
}

let users = [
    {
        id: 1,
        name: "anton mayer",
        mail: "antom@gmail.com",
        password: 'anton',
        phone: "+49 1111 111 11 1",
        contactColor: "",
    },
    {
        id: 2,
        name: "anja schulz",
        mail: "schulz@hotmail.com",
        password: 'anja',
        phone: "+49 1111 111 11 2",
        contactColor: "#c2e59c",
    },
    {
        id: 3,
        name: "benedikt ziegler",
        mail: "benedikt@gmail.com",
        password: 'benedikt',
        phone: "+49 1111 111 11 3",
        contactColor: "#ffcc80",
    }];

function login() {
    let email = document.getElementById('loginEmailInput');
    let password = document.getElementById('loginPasswordInput');

    let user = users.find(user => user.mail == email.value && user.password == password.value);
    console.log('user is:', user);
    console.log('users are:', users);

    console.log('login: ', email.value, password.value);
    if (user) {
        console.log('user gefunden');
        getInitials(user.name)
        window.location.href = `summary.html?msg=successfully_logged_in`;      // TODO wie übergebe ich den eingeloggten User? für    getInitials(name)
    } else {
        console.log('user NICHT gefunden');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg) {
        msgBox.innerHTML = msg;
    } else {
        //TODO display: none
    }
}





function gotoSignUp() {
    window.location.href = 'signUp.html';
}

// function startAnimation() {
//     // setTimeout(function () {

//     let blueOverlay = document.getElementById("blue-overlay");
//     console.log(blueOverlay);
//     blueOverlay.style.display = "block";
//     document.getElementById("logo").classList.add("logo-animation");

//     // }, 30000); // 30 seconds
// }

// function login() {
//     let email = document.getElementById('loginEmailInput');
//     let password = document.getElementById('loginPasswordInput');
//     let user = users.find(user => user.mail == email.value && user.password == password);
//     console.log(user);
//     if (user) {
//         console.log('user gefunden');
//     }
// }

// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get('msg');

// if (msg) {
//     msgBox.innerHTML = msg;
// } else {
//     //TODO display: none
// }
