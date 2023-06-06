function register() {
    const mail = document.getElementById("REM").value;
    const passwort1 = document.getElementById("RPW1").value;
    const passwort2 = document.getElementById("RPW2").value;

    if(hashCode(passwort1) !=  hashCode(passwort2)) {
        blinkRed();
        return;
    }

    if(!String(mail).includes('@')) {
        blinkRed();
        return;
    }

    var obj = fetch(`api/getAccount?param1=${mail}`)
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
            addAccount(mail, hashCode(passwort1));
            CloseRegister();
        }
        else {
            blinkRed();
        }
    });
}

function login() {
    
    const mail = document.getElementById("EM").value;
    const password = document.getElementById("PW").value;

    var obj = fetch(`api/getAccount?param1=${mail}`)
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
            blinkRed();
            return
        }

        if(String(hashCode(password)) === String(acc.password)) {
            const name = document.getElementById("name");
            name.innerText = acc.name;
            name.innerHTML += `<br> <a id="logout" onclick="logout()">Log out</a>`;

            const send = JSON.stringify(acc);

            fetch(`cookie/set?param1=logged&param2=${send}`)
            .then(response => {
                if (response.ok) {
                    console.log('Cookie set successfully');
                } else {
                    throw new Error('Error setting cookie');
                }
            })
            .catch(error => {
                console.error('Error setting cookie:', error);
            });

            toggleLoggedMode();
            CloseLogin();
        }
        else {
            blinkRed();
        }
    });
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

    fetch(`cookie/remove?param1=logged`)
    .catch(error => {
        console.error('Error removing cookie:', error);
    });

    const name = document.getElementById("name");
    name.innerHTML = "";
    name.innerText = "Guest";

    toggleLoggedMode();
}

function blinkRed() {
    document.getElementById("registerScreen").style.color = 'crimson'; //loghtcoral
    document.getElementById("loginScreen").style.color = 'crimson';
        
    document.getElementById("REM").style.borderColor = 'crimson';
    document.getElementById("RPW1").style.borderColor = 'crimson';
    document.getElementById("RPW2").style.borderColor = 'crimson';

    document.getElementById("EM").style.borderColor = 'crimson';
    document.getElementById("PW").style.borderColor = 'crimson';

    setTimeout(() => {
        document.getElementById("registerScreen").style.color = 'dodgerblue';
        document.getElementById("loginScreen").style.color = 'dodgerblue';

        document.getElementById("REM").style.borderColor = 'dodgerblue';
        document.getElementById("RPW1").style.borderColor = 'dodgerblue';
        document.getElementById("RPW2").style.borderColor = 'dodgerblue'

        document.getElementById("EM").style.borderColor = 'dodgerblue';
        document.getElementById("PW").style.borderColor = 'dodgerblue';

    }, 500)
}
