var username;
var typedPassword;

function register() {
    const user = document.getElementById("RUN").value;
    const password1 = document.getElementById("RPW1").value;
    const password2 = document.getElementById("RPW2").value;

    if(hashCode(password1) !=  hashCode(password2)) {
        blinkRed();
        return;
    }

    var obj = fetch(`api/getAccount?param1=${user}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error calling server-side function');
        }
    })
    .catch(error => {
        console.error('Error calling server-side function:', error);
    });

    obj.then(acc => {
        if(acc == null) {
            addAccount(user, hashCode(password1));
            CloseRegister();
        }
        else {
            blinkRed();
        }
    }).then(() => {
        console.log("logging in from registering");
        
        const name = document.getElementById("name");

        name.innerText = user;
        name.innerHTML += `<br> <a id="logout" onclick="logout()">Log out</a>`;

        username = user;
        typedPassword = password1;

        const value = `${user}+${password1}`;
        const expire = new Date().setDate(new Date().getDate() + 30);

        document.cookie = `log=${value}; expires=${expire}; path=/`;

        toggleLoggedMode();

    });
}

function login(user, password) {
    
    if(!user & !password) {
        user = document.getElementById("UN").value;
        password = document.getElementById("PW").value;
    }

    console.log(`User: ${user}\nPassword: ${password}`);

    fetch(`api/getAccount?param1=${user}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error calling server-side function');
        }
    })
    .then(acc => {
        if(acc == null) {
            blinkRed();
            return;
        }

        if(String(hashCode(password)) === String(acc.password)) {
            const name = document.getElementById("name");

            name.innerText = user;
            name.innerHTML += `<br> <a id="logout" onclick="logout()">Log out</a>`;

            username = user;
            typedPassword = password;

            const value = `${user}+${password}`;
            const expire = new Date().setDate(new Date().getDate() + 30);

            document.cookie = `log=${value}; expires=${expire}; path=/`;

            toggleLoggedMode();
            CloseLogin();
        }
    })
    .catch(error => {
        console.error('Error calling server-side function:', error);
    });
}

function addAccount(mail, passwort) {

    const m = mail;
    const p = passwort;

    fetch(`api/addAccount?param1=${m}&param2=${p}`)
        .then(response => {
            if (response.ok) {
                console.log('Server-side function called successfully');
            } else {
                console.error('Error calling server-side function');
            }
        })
        .catch(error => {
            console.error('Error calling server-side function:', error);
    });
}

function logout() {

    console.log("Logging out");

    toggleLoggedMode();
    closeSettings();

    typedPassword = null;
    username = null;

    const name = document.getElementById("name");
    name.innerHTML = "";
    name.innerText = "Guest";

    const PB = document.getElementById("accIcon");
    const BigPB = document.getElementById("PBbig");

    PB.src = `../../recources/graphics/profilePictures/white.png`;
    BigPB.src = `../../recources/graphics/profilePictures/white.png`;

    deleteCookie("log");
}

function blinkRed() {
    document.getElementById("registerScreen").style.color = 'crimson'; //loghtcoral
    document.getElementById("loginScreen").style.color = 'crimson';
        
    document.getElementById("RUN").style.borderColor = 'crimson';
    document.getElementById("RPW1").style.borderColor = 'crimson';
    document.getElementById("RPW2").style.borderColor = 'crimson';

    document.getElementById("UN").style.borderColor = 'crimson';
    document.getElementById("PW").style.borderColor = 'crimson';

    setTimeout(() => {
        document.getElementById("registerScreen").style.color = 'dodgerblue';
        document.getElementById("loginScreen").style.color = 'dodgerblue';

        document.getElementById("RUN").style.borderColor = 'dodgerblue';
        document.getElementById("RPW1").style.borderColor = 'dodgerblue';
        document.getElementById("RPW2").style.borderColor = 'dodgerblue'

        document.getElementById("UN").style.borderColor = 'dodgerblue';
        document.getElementById("PW").style.borderColor = 'dodgerblue';

    }, 500)
}

function hashCode(string){
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash;
    }
    return hash;
}

function handleLoad() {
    console.log(`Handling... ${document.cookie}`);
    if(getCookieValue("log")) {
        var elements = getCookieValue("log");
        elements = elements.split('+');
        username = elements[0]
        typedPassword = elements[1];

        login(username, typedPassword);

        console.log(`Logged in with username ${username} and password ${typedPassword}`);
    }
    console.log("Done");
}

function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}

function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}