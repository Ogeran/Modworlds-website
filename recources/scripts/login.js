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
    });
}

function login() {
    
    const user = document.getElementById("UN").value;
    const password = document.getElementById("PW").value;

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
            return
        }

        if(String(hashCode(password)) === String(acc.password)) {
            const name = document.getElementById("name");
            name.innerText = user;
            name.innerHTML += `<br> <a id="logout" onclick="logout()">Log out</a>`;

            username = user;
            typedPassword = password;

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

    typedPassword = null;
    username = null;

    const name = document.getElementById("name");
    name.innerHTML = "";
    name.innerText = "Guest";

    toggleLoggedMode();
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