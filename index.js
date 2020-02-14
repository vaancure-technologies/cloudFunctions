const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserData = functions.https.onRequest(async (req, res) => {
    const name = req.query.name;
    const vehNo = req.query.vehNo;
    const phoneNo = req.query.vehNol
    var time = req.query.time;
    // const snapshot = await admin.database().ref('/user').push({
    const snapshot = await admin.database().ref('/user').push({
        name: name,
        vehNo: vehNo,
        phoneNo: phoneNo,
        time: time
    });
    console.log(snapshot);
    res.json({
        "name": name,
        "vehicle Number": vehNo,
        "Phone Numbre": phoneNo,
        "Time": time
    });
});