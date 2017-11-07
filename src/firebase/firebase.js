import * as firebase from "firebase";

const config = {

    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };





/*
// child removed
database.ref("expenses")
    .on("child_removed", (snapshot) => {

        console.log(snapshot.key, snapshot.val());
    });

// child changed
database.ref("expenses")
    .on("child_changed", (snapshot) => {

        console.log(snapshot.key, snapshot.val());
    });

// child added
database.ref("expenses")
    .on("child_added", (snapshot) => {

        console.log(snapshot.key, snapshot.val());
    });
*/



/*database.ref("expenses")
    .on("value", (snapshot) => {

        const expenses = [];

        snapshot.forEach((childSnapshot) => {

            expenses.push({

                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        console.log(expenses);
    });*/
    

/*database.ref("expenses")
    .once("value")
    .then((snapshot) => {

        const expenses = [];

        snapshot.forEach((childSnapshot) => {

            expenses.push({

                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        console.log(expenses);
    });*/


/*database.ref("expenses").push({

    description : "Cinema",
    amount: 3400,
    note: "Anka",
    createdAt: 3411102017
});*/


/*database.ref("notes/-Kxx6dlbYwcBkfJidSQF").update({

    body: "My very first novel!"
});

database.ref("notes/-Kxx6dlbYwcBkfJidSQF").remove();*/

/*database.ref("notes").push({

    title: "Second note",
    body: "My second note text"
});*/

/*const firebaseNotes = {

    a12: {

        title: "First note",
        body: "My first note text"
    },

    a14: {

        title: "Second note",
        body: "My second note text"
    },
};

const notes = [

    {
        id: "12",
        title: "First note",
        body: "My first note text"
    },
    {
        id: "14",
        title: "Second note",
        body: "My second note text"
    }
];

database.ref("notes").set(notes);*/


/*const listenToJobChange = database.ref()
    .on("value", (snapshot) => {

        const val = snapshot.val();

        console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);

    }, (err) => {

        console.log("Error with fetching data", err);
    });

database.ref().update({

    stressLevel: 9,
    "job/company": "Amazon",
    "job/title": "Software developer"
});

setTimeout(() => {

    database.ref().update({

        "job/company": "Google",
        "job/title": "manager"
    });

    database.ref().off("value", listenToJobChange);

}, 6000);*/

/*const onValueChange = database.ref()
    .on("value", (snapshot) => {

        console.log(snapshot.val());

    }, (err) => {

        console.log("Error with fetching data", err);
    });

setTimeout(() => {

    database.ref().update({

        stressLevel: 2
    });

}, 6500);

setTimeout(() => {

    database.ref().update({

        stressLevel: 3
    });

    database.ref().off("value", onValueChange);

}, 9500);


setTimeout(() => {

    database.ref().update({

        stressLevel: 7
    });

}, 12500);*/

/*database.ref("location/city")
    .once("value")
    .then((snapshot) => {

        console.log(snapshot.val());

    }).catch((err) => {

        console.log("Fetching error:", err);
    });*/

/*database.ref().set({

    name: "Andy",
    age: 26,
    stressLevel: 6,
    job: {

        title: "Software developer",
        company: "Google"
    },
    location : {

        city: "Philadelphia",
        country: "USA"
    }
}).then(() => {

    console.log("Data is saved.");

}).catch((err) => {

    console.log("Firebase error:", err);
});
*/


/*database.ref("isSingle")
    .remove()
    .then(() => {

        console.log("Remove succeeded.");

    }).catch((err) => {

        console.log("Remove failed:", err)
    });*/


