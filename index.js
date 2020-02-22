const functions = require('firebase-functions');

// The firebase admin SDk to acces the Firebase realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text paremeter passed to this http endpoint and inert it into the 
// realtime database under the path /message/:pushId/orignal

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // const name = req.query.name;
//     // const age = req.query.age;
//     // const country = req.query.country;
//     const orignal = req.query.text;
//     // Push the new message into the realtime Database using the firebase Admin SDK.

//     const snapshot = await admin.database().ref('/messages').push({
//         // name: name,
//         // age: age,
//         // country: country
//         orignal: orignal
//     });
//     // Redrict with 303 SEE OTHER to the URL of the pushed object in the firebase console
//     // Reto the node where we have pushed the new data in firebase
//     // res.redirect(303, snapshot.ref.toString());

// });


// // Adding the UpperCaseFunction update the data in firebase.

// // Listen for new message added to / messages/:pushId/orignal and create an
// // upprecase version of the messahe to /message/:pushId/uppercase

exports.updateusr = functions.database.ref('/nishant/{pushId}/{businessId}')
    .onCreate((snapshot, context) => {
        //Grab the current value of what was written to the real time database.
        const orignal = snapshot.val();
        console.log('Snapshot Value', snapshot.val());
        const snapshotvalue = snapshot.val();
        const childvalue = snapshotvalue;
        // console.log("snapshotvaluereftrnce" + snapshotvalue);
        console.log("child value" + snapshotvalue['age']);
        //  

        // console.log("child value" + snapshotvalue.child('/child'));
        // console.log('Snapshot Value', snapshot._path.child('age'));
        // console.log('Snapshot Value', snapshot._path.child('age'));
        // console.log('Snapshot Value', snapshot.child);
        // console.log('Uppercasing', context.params.pushId.ref('{/pushId}'));
        // console.log('Uppercasing', context.params.pushId.val());

        // 
        // const uppercase = orignal.toUpperCase();
        //Yoy must return a Promise when performing asynchronious tasks inside a function such as 
        // writing to firebase realtime database.
        // setting an "uppercase" sibling in the realtime database return a promise.
        console.log("return value of snapshot", snapshot.ref.parent.child('uppercase').set(uppercase));
        console.log("return value of snapshot", snapshot.ref.parent.child('uppercase').set(uppercase));
        // return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

// const todaysDate = admin.database.ServerValue.TIMESTAMP;
// const today = new Date();
// const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
let latitude = '';
let longitude = '';
exports.carnotification = functions.database.ref('/parking_event/{pushId}/{businessId}/{date}/{vehicleId}')
    .onCreate(async (snapshot, context) => {
        //Grab the current value of what was written to the real time database.
        // const orignal = snapshot.val();
        const snapshotvalue = snapshot.val();
        console.log('Snapshot Value', snapshot.val());
        console.log("Vehicle number:- " + snapshotvalue['vehicleNumber']);

        const vehicleNumber = await snapshotvalue['vehicleNumber'];
        const vehicleNumberDigits = await snapshotvalue['vehicleNumberDigits'];
        const vehicleInTimeStamp = await snapshotvalue['vehicleInTimeStamp'];
        const phoneNumber = await snapshotvalue['ownerContactNumber'];
        const groupId = context.params.pushId;
        const businessId = context.params.businessId;
        const operationDate = context.params.date;
        const vehRecordId = context.params.vehicleId;


        // const lat = snapshotvalue['ownerContactNumber'];
        // const long = snapshotvalue['ownerContactNumber'];
        // console.log("Vehicle numberplate didgits:- " + snapshotvalue['vehicleNumberDigits']);

        // console.log("Belongings snapshot:- " + snapshotvalue['belongings']['Baggage']);

        console.log('Todays date:- ' + operationDate);
        // console.log('Todays date:- ' + snapshot.pus);

        var business_setup = await admin.database().ref("/business_setup/" + groupId + "/" + businessId);
        await business_setup.once("value")
            .then(async (snapshot) => {
                const snap = snapshot.val();
                latitude = await snap['latitude'];
                longitude = await snap['longitude'];
                // console.log("sone value" + typeof(snapshot.val()['latitude']));
                console.log("***business_setup function execute*** ");

                return snapshot.val();
            }).catch((error) => {
                return console.log("error in business_setup function:- " + error);
            });

        var setDataToUsercheckOut = await admin.database().ref("valeCheckoutUser/" + vehicleNumber);
        await setDataToUsercheckOut.update({
            inTime: vehicleInTimeStamp,
            groupId: groupId,
            businessId: businessId,
            operationDate: operationDate,
            vehRecordId: vehRecordId,
            latitude: latitude,
            longitude: longitude
        })
            .then(() => {
                // console.log("setDataToUsercheckOut snapshot value:- "+ snap.val);
                console.log("Return setDataToUsercheckOut:--- " + setDataToUsercheckOut.once("value"));
                return setDataToUsercheckOut.once("value");


            }).catch((error) => {
                return console.log("error is generated by nishant");
            });



        var ref = await admin.database().ref("valeCheckoutUser/" + vehicleNumber);
        await ref.once("value")
            .then((snapshot) => {
                var key = snapshot.key;
                const a = snapshot.val();
                // const b = snapshot['age'];

                console.log("businessLocation:- " + a["businessLocation"]);
                console.log("carRequested:- " + a["carRequested"]);
                console.log("FCMToken:- " + a["FCMToken"]);
                console.log("snapshot key:- " + key);
                // console.log("Latitude:- " + a["lat"]);
                // console.log("Longitude:- " + a["long"]);


                return console.log("Return ref:--- ");

            }).catch((error) => {
                return console.log("error is generated by nishant");
            });



        console.log("Vehicle number:- " + snapshot._path);
        console.log("vehNo:- " + vehicleNumber
            + "\n" + "vehnoDigits:- " + vehicleNumberDigits
            + "\n" + "vehInTime:- " + vehicleInTimeStamp
            + "\n" + "phoneNo:- " + phoneNumber);
        console.log("PushId:- " + context.params.pushId);
        console.log("businessId:- " + context.params.businessId);
        console.log("Date:- " + context.params.date);
        console.log("vehicleId:- " + context.params.vehicleId);
        console.log("snapshot._path:- " + snapshot._path);
        // console.log("snapshot._childPath:- " + snapshot.parent);
        // console.log("snapshot._fullPath:- " + snapshot._fullPath);
        // console.log("Nishant values A:- " + a + "Variable B" + b);
        // console.log('Todays date' + today);
        // console.log('Todays date' + todaysDate);
        // const snapshotvalue = snapshot.val();
        // const childvalue = snapshotvalue;
        // console.log("snapshotvaluereftrnce" + snapshotvalue);
        // console.log("child value" + snapshotvalue['age']);
        //  

        // console.log("child value" + snapshotvalue.child('/child'));
        // console.log('Snapshot Value', snapshot._path.child('age'));
        // console.log('Snapshot Value', snapshot._path.child('age'));
        // console.log('Snapshot Value', snapshot.child);
        // console.log('Uppercasing', context.params.pushId.ref('{/pushId}'));
        // console.log('Uppercasing', context.params.pushId.val());

        // 
        // const uppercase = orignal.toUpperCase();
        //Yoy must return a Promise when performing asynchronious tasks inside a function such as 
        // writing to firebase realtime database.
        // // setting an "uppercase" sibling in the realtime database return a promise.
        // console.log("return value of snapshot", snapshot.ref.parent.child('uppercase').set(uppercase));
        // console.log("return value of snapshot", snapshot.ref.parent.child('uppercase').set(uppercase));
        // return snapshot.ref.parent.child('uppercase').set(uppercase);
    });