var express = require("express");
var app = express();
var admin = require("firebase-admin");
var cors = require("cors");
var bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var serviceAccount = require('./phone-validati0n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phone-validati0n.firebaseio.com"
});
const db = admin.firestore();

app.post('/api/phone', urlencodedParser, (req, res) => {
    (async () => {
        try {
            await db.collection('items').doc('/' + req.body.phoneNumber + '/')
              .create({item: CreateNewAccessCode(req.body.phoneNumber)});
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
    })();
});

app.post('/api/access', urlencodedParser, (req, res) => {
    console.log("MAMAMA", req)
    (async () => {
        try {
            let validate = await ValidateAccessCode(req.body.phoneNumber, req.body.accessCode);
            console.log("HEREeeeee",validate)
            return res.status(200).send(validate);
        } catch (error) {
            console.log("FOUND FUNNY BUG",error);
            return res.status(500).send(error);
        }
    })();
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

const CreateNewAccessCode = (phoneNumber) => {
    var minm = 10000; 
    var maxm = 99999; 
    let accessCode = Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    return {phoneNumber, accessCode}
}

const ValidateAccessCode = async(phoneNumber, accessCode) => {
    const document = db.collection('items').doc(phoneNumber);        
    let item = await document.get();
    let response = item.data();
    if (parseInt(response.item.accessCode) == accessCode) {
        return { success: true }
    } else {
        return { success: false }
    }
}