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
    const {phoneNumber} = req.body
    console.log('CAT HEADERs', req.headers);
    console.log('CAT body: ', req.body)
    (async () => {
        try {
          await db.collection('items').doc('/' + req.body.phoneNumber + '/')
              .create({item: req.body.phoneNumber});
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});