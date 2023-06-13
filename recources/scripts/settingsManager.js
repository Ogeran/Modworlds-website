const { response } = require("express");

var collectionThere = false;
var settingsThere = false;

function toggleSettings() {

    if(settingsThere == false) {
        settingsThere = true;

        const settings = document.getElementById("settingsContainer");
        settings.style.transform = 'translateY(0vh)';
    }
    else if(settingsThere == true) {
        settingsThere = false;

        const settings = document.getElementById("settingsContainer");
        settings.style.transform = 'translateY(-100vh)';
    }
}

function setProfilePicture(path) {
    const PB = document.getElementById("accIcon");
    const BPB = document.getElementById("PBbig");
    PB.src = path;
    BPB.src = path;

    fetch(`api/setProfilePicture?param1=${username}&param2=${typedPassword}&param3=${path}`)
    .catch(error => {
        console.log("Error while setting profile picture: " + error);
    });

    slideTogglePBCollection();
}

function slideTogglePBCollection() {
    if(collectionThere == false) {

        collectionThere = true;

        const collection = document.getElementById("PBcollection");
        collection.style.transform = 'translateY(0)';
    }
    else if(collectionThere == true) {

        collectionThere = false;

        const collection = document.getElementById("PBcollection");
        collection.style.transform = 'translateY(-100vh)';
    }
}

function changePassword() {
    const pwOld = document.getElementById("PWresetOriginal").value;
    const pwNew1 = document.getElementById("PWresetNew1").value;
    const pwNew2 = document.getElementById("PWresetNew2").value;

    fetch(`api/changePassword?param1=${username}&param2=${typedPassword}&param3=${pwNew1}&param4=${pwNew2}`)
    .then(response => {
        if(response.ok) {
            return response.text();
        }
        else {
            throw new Error('Error calling server-side function');
        }
    })
    .then(result => {
        if(result == "pass") {
            document.getElementById("PWresetOriginal").value = "";
            document.getElementById("PWresetNew1").value = "";
            document.getElementById("PWresetNew2").value = "";
        }
    })
    .catch(error => {
        console.error("Error while changing password: " + error);
    });
}

function deleteAccount() {
    fetch(`api/changePassword?param1=${username}&param2=${typedPassword}`)
    .then(response => {
        if(response.ok) {
            return response.text();
        }
        else {
            throw new Error('Error calling server-side function');
        }
    })
    .then(result => {
        if(result == "pass") {
            logout();
        }
    })
    .catch(error => {
        console.error("Error while changing password: " + error);
    });
}