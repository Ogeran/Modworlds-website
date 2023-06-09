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