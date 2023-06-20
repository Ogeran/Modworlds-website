const express = require('express');
const app = express();
const path = require('path');
const mime = require('mime');
const fs = require('fs');

const numberToRank = new Map();

function setRanks() {
    var count = 0;
    numberToRank.set(count, "NONE");
    count += 1;

    numberToRank.set(count, "Dirt");
    count += 1;

    numberToRank.set(count, "Iron");
    count += 1;

    numberToRank.set(count, "Gold");
    count += 1;

    numberToRank.set(count, "Diamond");
    count += 1;

    numberToRank.set(count, "Emerald");
    count += 1;

    count = 10000
    numberToRank.set(count, "Test Supporter");
    count = 10001
    numberToRank.set(count, "Supporter");
    count = 10002
    numberToRank.set(count, "Moderator");
    count = 10003
    numberToRank.set(count, "Inter-mod");
    count = 10004
    numberToRank.set(count, "Manager");
    count = 10005
    numberToRank.set(count, "Admin");
    count = 10006
    numberToRank.set(count, "Owner");
    count = 10007
    numberToRank.set(count, "Dev");
    count = 10008
    numberToRank.set(count, "Ur MOM");
}

setRanks();

app.use(express.static(path.join(__dirname, 'resources')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sites/modworlds/index.html'));
});

app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.path);
    const contentType = mime.getType(filePath) || 'application/octet-stream';

    console.log(filePath);
    if(!filePath.includes('api')) {
        res.setHeader('Content-Type', contentType);
        res.sendFile(filePath);
    }
    else if(filePath.includes('api')) {
        if(filePath.includes('api/addAccount')) {

            addAccount(req, res);
        }
        else if(filePath.includes('api/getAccount')) {
            
            getAccount(req, res);
        }
        else if(filePath.includes('api/getRank')) {
            
            getRank(req, res);
        }
        else if(filePath.includes('api/setProfilePicture')) {
            setProfilePicture(req, res);
        }
        else if(filePath.includes('api/changePassword')) {
            changePassword(req, res);
        }
        else if(filePath.includes('api/deleteAccount')) {
            deleteAccount(req, res);
        }
        else if(filePath.includes('api/sendMessage')) {
            sendMessage(req, res);
        }
        else if(filePath.includes('api/getChat')) {
            getChatHistory(req, res);
        }
    }
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

function addAccount(req, res) {
    console.log("Adding account");

    const mail = req.query.param1;
    const password = req.query.param2;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const json = JSON.parse(data);
        const newAccount = {
            [mail] : {
                "password": String(password),
                "rank": 1,
                "projects": [],
                "chats":[
                    "Main-Chat"
                ],
                "profilePicture":"../../recources/graphics/profilePictures/white.png"
            }
        };

        json.accounts.push(newAccount);
        const updatedJSON = JSON.stringify(json);

        // Write the updated JSON back to the file
        fs.writeFile('data/accounts.json', updatedJSON, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('JSON file updated successfully.');
        });
    });
}

function getAccount(req, res) {
    const name = req.query.param1;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject(err);
            return;
        }

        console.log(data);

        const json = JSON.parse(data);

        for(var i = 0; i < json.accounts.length; i++) {
            if (json.accounts[i] != null) {
                if (json.accounts[i][name] != null) {
                    console.log(json.accounts[i][name]);
                    res.json(json.accounts[i][name]);
                    return;
                }
            }
        }

        res.json(null);
    });
}

function getRank(req, res) {
    const name = req.query.param1;
    const pw = req.query.param2;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject(err);
            return;
        }

        const json = JSON.parse(data);

        for(var i = 0; i < json.accounts.length; i++) {
            if (json.accounts[i] != null) {
                if (json.accounts[i][name] != null) {

                    if(String(hashCode(pw)) == String(json.accounts[i][name].password)) {
                        const id = parseInt(json.accounts[i][name].rank, 10);
                        res.send(numberToRank.get(id));
                        return;
                    }
                }
            }
        }

        res.send("NONE");
    });
}

function setProfilePicture(req, res) {
    const name = req.query.param1;
    const password = req.query.param2;
    const PBpath = req.query.param3;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const json = JSON.parse(data);
        
        for(var i = 0; i < json.accounts.length; i++) {
            if (json.accounts[i] != null) {
                if (json.accounts[i][name] != null) {
                    if(String(json.accounts[i][name].password) == String(hashCode(password))) {
                        json.accounts[i][name].profilePicture = PBpath;

                        const updated = JSON.stringify(json);

                        fs.writeFileSync('data/accounts.json', updated, 'utf8');
                    }
                }
            }
        }
    });
}

function changePassword(req, res) {
    const name = req.query.param1;
    const oldPW = req.query.param2;
    const new1 = req.query.param3;
    const new2 = req.query.param4;

    if(String(new1) == String(new2)) {
        fs.readFile('data/accounts.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
    
            const json = JSON.parse(data);
    
            for(var i = 0; i < json.accounts.length; i++) {
                if (json.accounts[i] != null) {
                    if (json.accounts[i][name] != null) {
                        if(json.accounts[i][name].password == hashCode(String(oldPW))) {
                            json.accounts[i][name].password = hashCode(String(new1));

                            const updated = JSON.stringify(json);

                            fs.writeFileSync('data/accounts.json', updated, 'utf8');

                            res.send("pass");
                            return;
                        }
                        else {
                            res.send("fail");
                            return;
                        }
                    }
                    else {
                        res.send("fail");
                        return;
                    }
                }
                else {
                    res.send("fail");
                    return;
                }
            }
        });
    }
    else {
        res.send("fail");
        return;
    }
}

function deleteAccount(req, res) {
    const name = req.query.param1;
    const pw = req.query.param2;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject(err);
            return;
        }

        const json = JSON.parse(data);

        for(var i = 0; i < json.accounts.length; i++) {
            if (json.accounts[i] != null) {
                if (json.accounts[i][name] != null) {
                    if(json.accounts[i][name].password == hashCode(String(pw))) {

                        delete json.accounts[i][name];

                        const updated = JSON.stringify(json);
                        fs.writeFileSync('data/accounts.json', updated, 'utf8');

                        res.send("pass");
                        return;
                    }
                }
            }
        }
    });
}

function sendMessage(req, res) {
    console.log("Executing send message");

    const name = req.query.param1;
    const password = req.query.param2;

    const id = req.query.param3;
    var message = req.query.param4;

    message = message.replace('+', ' ');

    console.log("Initialized variables: " + name + " " + password + " " + id + " " + message);

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject(err);
            return;
        }

        const json = JSON.parse(data);
        var i2;

        for(var i = 0; i < json.accounts.length; i++) {
            if (json.accounts[i] != null) {
                if (json.accounts[i][name] != null) {
                    if(json.accounts[i][name].password == hashCode(password)) {
                        if(json.accounts[i][name].chats.some(e => e == id)) {
                            i2 = i;
                            fs.readFile(`data/chats/${id}.txt`, 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                var content = data;

                                try {
                                    console.log(json.accounts[i2]);
                                    console.log(json.accounts[i2][name]);
                                    console.log(json.accounts[i2][name].profilePicture);
                                    content += `<br><div class="c"><img class="chatPB" src="${json.accounts[i2][name].profilePicture}"><div class="textSpan"><b><span class="topName">${name}</span></b><br>${message}</div></div>`;
                                }
                                catch(error) {
                                    console.error("Error adding content", error)
                                }

                                fs.writeFile(`data/chats/${id}.txt`, content, 'utf8', (err) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    console.log('File written successfully.');

                                    res.send("pass");
                                    return;
                                });
                            });
                        }
                        else {
                            console.log("No permission");
                        }
                    }
                    else {
                        console.log("Incorrect password");
                    }
                }
            }
        }
    });
}

function getChatHistory(req, res) {
    const name = req.query.param1;
    const password = req.query.param2;

    const id = req.query.param3;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject(err);
            return;
        }

        const json = JSON.parse(data);

        for(var i = 0; i < json.accounts.length; i++) {
            if (json.accounts[i] != null) {
                if (json.accounts[i][name] != null) {
                    if(json.accounts[i][name].password == hashCode(password)) {
                        if(json.accounts[i][name].chats.some(e => e == String(id))) {
                            fs.readFile(`data/chats/${id}.txt`, 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }

                                res.send(data);
                                return;
                            });
                        }
                        else {
                            res.send("Failed to load chat history: No access granted!");
                            return;
                        }
                    }
                    else {
                        res.send("Failed to load chat history: Wrong password.");
                        return;
                    }
                }
            }
        }
    });
}

function hashCode(string){
    if(string == null) {
        return -1;
    }
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash;
    }
    return hash;
}
