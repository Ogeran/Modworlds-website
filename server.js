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
    if(!filePath.includes('api') && !filePath.includes('cookie')) {
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
                "rank": 0,
                "projects": []
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

function hashCode(string){
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash;
    }
    return hash;
}