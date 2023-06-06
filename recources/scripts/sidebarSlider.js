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

        fetch('cookie/get?param1=logged')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error getting cookie');
            }
        })
        .then(cookieValue => {

            fetch(`api/getRank?param1=${JSON.parse(cookieValue).rank}`)
            .then(response2 => {
                if (response2.ok) {
                    return response2.text();
                } else {
                    throw new Error('Error getting cookie');
                }
            })
            .then(rankName => {
                const r = document.getElementById("rank");
                r.textContent = `Rank: ${rankName}`; 
                console.log("Updated name to: " + rankName);
            })
            .catch(error => {
                console.error('Error getting cookie:', error);
            });
        })
        .catch(error => {
            console.error('Error getting cookie:', error);
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
