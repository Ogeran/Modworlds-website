var b = false;

var loginIsOpen = false;
var registerIsOpen = false;

var logged = false;

window.onload = function() {
    const accIcon = document.getElementById('accIcon');
    const sidebar = document.getElementById('sidebar');
}

function toggleSidebar() {
    if(b == false) {
        sidebar.style.transform = 'translateX(0)';

        accIcon.style.border = '0.1cm solid dodgerblue';
        accIcon.style.margin = '0.4cm'

        b = true;
    }
    else if(b == true) {
        sidebar.style.transform = 'translateX(-30vw)';

        accIcon.style.border = '0 solid dodgerblue';
        accIcon.style.margin = '0.5cm'

        b = false;
    }
}

function OpenLogin() {

    if(registerIsOpen == true) {
        CloseRegister();
    }

    const loginScreen = document.getElementById("loginScreen");
    
    loginIsOpen = true;
    loginScreen.style.display = 'block';

    setTimeout(() => {
        loginScreen.style.opacity = '1';
    }, 1);
}

function OpenRegister() {

    if(loginIsOpen == true) {
        CloseLogin();
    }

    const registerScreen = document.getElementById("registerScreen");
    
    registerIsOpen = true;
    registerScreen.style.display = 'block';

    setTimeout(() => {
        registerScreen.style.opacity = '1';
    }, 1);
}

function CloseLogin() {

    const loginScreen = document.getElementById("loginScreen");
    
    loginIsOpen = false;

    setTimeout(() => {
        loginScreen.style.opacity = '0';
    }, 1);

    setTimeout(() => {
        loginScreen.style.display = 'none';
    }, 1000)
}

function CloseRegister() {

    const registerScreen = document.getElementById("registerScreen");
    
    registerIsOpen = false;

    setTimeout(() => {
        registerScreen.style.opacity = '0';
    }, 1);

    setTimeout(() => {
        registerScreen.style.display = 'none';
    }, 1000)
}

function toggleLoggedMode() {
    if(logged == true) {
        logged = false;

        const PB = document.getElementById("accIcon");
        const BigPB = document.getElementById("PBbig");

        const invises = document.getElementsByClassName("log");
        Array.from(invises).forEach(element => {
            element.classList.add('invisible');
        });

        const lb = document.getElementById('login');
        const rb = document.getElementById('register');

        lb.classList.remove("invisible");
        rb.classList.remove("invisible");
    }
    else if(logged == false) {
        logged = true;

        const PB = document.getElementById("accIcon");
        const BigPB = document.getElementById("PBbig");

        fetch(`api/getAccount?param1=${username}`)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error('Error calling server-side function');
            }
        })
        .then(acc => {
            if(acc == null) {
                console.log("No account");
                return;
            }

            PB.src = acc.profilePicture;
            BigPB.src = acc.profilePicture;
        })
        .catch(error => {
            console.error("Error while getting account: " + error);
        });

        fetch(`api/getRank?param1=${username}&param2=${typedPassword}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error calling server-side function');
            }
        })
        .then(rankName => {
            const rankNameField = document.getElementById("rank");
            rankNameField.innerText = `Rank: ${rankName}`;
        })
        .catch(error => {
            console.error('Error calling server-side function:', error);
        });

        const invises = document.getElementsByClassName("invisible");
        Array.from(invises).forEach(element => {
            element.classList.remove('invisible');
        });

        const lb = document.getElementById('login');
        const rb = document.getElementById('register');

        lb.classList.add("invisible");
        rb.classList.add("invisible")
    }
}
