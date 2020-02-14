const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserData = functions.https.onRequest(async (req, res) => {
    const name = req.query.name;
    // const snapshot = await admin.database().ref('/user').push({
        const snapshot = await admin.database().ref('/user').push({
        name : name
    });
    console.log(snapshot);
    return res.JSON({
        "value": snapshot,
        "name": name
    })
});