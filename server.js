const express = require('express');
const app = express();
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const numberToRank = new Map();

var count = 0;
numberToRank.set(count, "Dirt");
count += 1;

numberToRank.set(count, "Ur mom");
count += 1;

numberToRank.set(count, "Diamond");
count += 1;

app.use(express.static(path.join(__dirname, 'resources')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sites/modworlds/index.html'));
});

app.get('api/addAccount', (req, res) => {

    console.log("Adding account");

    const mail = req.query.param1;
    const passwort = req.query.param2;

    fs.readFile('data/accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const json = JSON.parse(data);
        const newAccount = {
            [mail]: {
                "password": passwort,
                "name": "New User 1234",
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
            
            const mail = req.query.param1;

            fs.readFile('data/accounts.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                const json = JSON.parse(data);
        
                if (json.accounts[0] != null) {
                    if (json.accounts[0][mail] != null) {
                        console.log(json.accounts[0][mail]);
                        res.json(json.accounts[0][mail]);
                    }
                    else {
                        res.json(null);
                    }
                }
                else {
                    res.json(null);
                }
            });
        }
        else if(filePath.includes('api/getRank')) {

            console.log(numberToRank);
            console.log(req.query.param1);
            console.log(numberToRank.get(parseInt(req.query.param1, 10)))

            const id = parseInt(req.query.param1, 10);
            res.send(numberToRank.get(id));
        }
    }
    else if(filePath.includes('cookie')) {
        if(filePath.includes('cookie/set')) {

            console.log("Setting cookie");

            const cookieName = req.query.param1;
            const cookieValue = req.query.param2;

            res.cookie(cookieName, cookieValue, { httpOnly: true });
            res.send('Cookie set');
        }
        else if(filePath.includes('cookie/get')) {
            
            console.log("Getting cookie");

            const cookieName = req.query.param1;
            const cookieValue = req.cookies[cookieName];

            if (cookieValue) {
                console.log("Sending cookie: " + JSON.stringify(cookieValue));
                res.send(JSON.stringify(cookieValue));
            } else {
                console.log("Cookie not found");
                res.send('Cookie not found');
            }
        }
        else if(filePath.includes('cookie/remove')) {
            console.log("Removing cookie");

            const cookieName = req.query.param1;
            res.clearCookie(cookieName);
            res.send('Cookie removed');
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
                "name": "New User 1234",
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

