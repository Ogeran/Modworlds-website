var chatInDisplay = false;
var currentChat;
var shouldUpdate = false;

function toggleChat(toLoad) {
    const display = document.getElementById("chatBackground");

    if(chatInDisplay == true) {
        chatInDisplay = false
        display.style.transform = 'translateX(100vw)';
        shouldUpdate = false;
    }
    else if(chatInDisplay == false) {
        chatInDisplay = true;
        display.style.transform = 'translateX(0)';
        
        console.log("Current chat set: " + toLoad);
        currentChat = toLoad;
        loadChat(toLoad)
    }
}

function loadChat(id) {
    const text = document.getElementById("chatContainer");
    const cn = document.getElementById("cn");

    fetch(`api/getChat?param1=${username}&param2=${typedPassword}&param3=${id}`)
    .then(response => {
        if(response.ok) {
            return response.text();
        }
        else {
            throw new Error(`Error while getting chat ${String(id)}`);
        }
    })
    .then(value => {
        text.innerText = value;
    })
    .catch(error => {
        console.error("Error while loading chat ", error);
    })

    shouldUpdate = true;
    
    startUpdatingChat();

    const buffer = id;

    cn.innerText = buffer.replace('-', ' ');
}

function sendMessage() {
    const text = document.getElementById("chatValue");
    fetch(`api/sendMessage?param1=${username}&param2=${typedPassword}&param3=${String(currentChat)}&param4=${text.value.replace(" ", '+')}`)
    .catch(error => {
        console.error("Error while sending message ", error);
    });
    text.value = "";
}

function startUpdatingChat() {
    const intervalId = setInterval(() => {
    if (!shouldUpdate) {
        clearInterval(intervalId);
        return;
    }

    const text = document.getElementById("chatContainer");

    console.log("CurrentChat: " + currentChat);

    fetch(`api/getChat?param1=${username}&param2=${typedPassword}&param3=${String(currentChat)}`)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Error while getting chat ${String(currentChat)}`);
            }
        })
        .then((value) => {
            text.innerHTML = value;
        })
        .catch((error) => {
            console.error("Error while loading chat ", error);
        });
    }, 1000);
}
