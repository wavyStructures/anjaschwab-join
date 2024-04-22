function loginInit() {
    includeHTML();
    // startAnimation();
    // login();
}

let currentUser = "Gast";

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
    console.log('user gefunden, user is:', user);
    console.log('users are:', users);


    if (user) {
        isLoggedIn: true;

        currentUser = user;
        console.log('currentUser inside login.js is:', currentUser);

        let userInitials = getInitials(user.name);
        // console.log('intials inside login.js are:', userInitials);

        greeting(user.name);
        // TODO wie übergebe ich den eingeloggten User? für    getInitials(name)
    } else {
        console.log('user NICHT gefunden');
        alert("user not found. please try again.")
    }

    // const urlParams = new URLSearchParams(window.location.search);
    // const msg = urlParams.get('msg');

    // if (msg) {
    //     msgBox.innerHTML = msg;
    // } else {
    //     msgBox.style.display = 'none';
    // }
}

function greeting(userName) {
    const isLoggedIn = true;        //TODO is loggedIn setting
    let currentName = userName;


    let findUser = users.find(user => user.name === currentName);
    let greetingName = findUser.name;
    console.log('greetingName is:', greetingName);

    const h1GreetingUser = document.getElementById("h1GreetingUser");
    const usernameForGreeting = document.getElementById("usernameForGreeting");

    if (isLoggedIn) {
        h1GreetingUser.dataset.userType = "user";
        usernameForGreeting.innerText = `, ${greetingName}`;
    } else {
        h1GreetingUser.dataset.userType = "guest";
        usernameForGreeting.innerText = '';
    }

    window.location.href = `summary.html?msg=successfully_logged_in`;
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
