var express = require("express");
var app = express();
var admin = require("firebase-admin");
var cors = require("cors");
app.use(cors());

var serviceAccount = require('./phone-validati0n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phone-validati0n.firebaseio.com"
});
const db = admin.firestore();

app.post('/api/phone', (req, res) => {
    console.log('body: ', req.body);
    (async () => {
        try {
          await db.collection('items').doc('/' + '3602236419' + '/')
              .create({item: '3602236419', accessCode: 'asdasdasdsd'});
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