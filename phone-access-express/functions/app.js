var express = require("express");
var serviceAccount = require('./phone-validati0n');
var app = express();
var admin = require("firebase-admin");
var cors = require("cors");
var bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json());phone-validati0n
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const phone = require('phone');
var twilio = require('twilio');
require('dotenv').config();


var client = new twilio('AC47f4e946f8218f0d5796dbde400ab89a', 'e769719f0802f4d03d4f09e89af27059');
const sendAccessCode = (phoneNumber, accessCode) => {
    client.messages.create({
        to: phoneNumber,
        from: '+15127143436',
        body: `Your access code: ${accessCode}`
      });
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phone-validati0n.firebaseio.com"
});
const db = admin.firestore();

app.post('/phone', urlencodedParser, async (req, res) => {
    if (phone(req.body.phoneNumber)[0]) {
        return await (async () => {
            try {
                const object = CreateNewAccessCode(phone(req.body.phoneNumber)[0]);
                await db.collection('items').doc('/' + object.phoneNumber + '/')
                    .set(object, {merge: true});
                sendAccessCode(object.phoneNumber, object.accessCode);
                return res.status(200).send(object.phoneNumber);
            } catch (error) {
              return res.status(500).send(error);
            }
        })();
    } else { return res.status(500).send('Invalid Phone Number'); }
    
});

app.post('/access', urlencodedParser, async (req, res) => {
    return await (async () => {
        try {
            let validate = await ValidateAccessCode(req.body.phoneNumber, req.body.accessCode);
            return res.status(200).send(validate.success);
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

const CreateNewAccessCode = (phoneNumber) => {
    var minm = 100000; 
    var maxm = 999999; 
    let num = Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    let accessCode = num.toString();
    return {phoneNumber, accessCode}
}

const ValidateAccessCode = async(phoneNumber, accessCode) => {
    const pN = phone(phoneNumber)[0];
    const document = db.collection('items').doc(pN);  
    let item = await document.get();
    let response = item.data();
    if (response.accessCode === accessCode) {
        return { success: true }
    } else {
        return { success: false }
    }
}

module.exports = app;