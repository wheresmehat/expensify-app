import * as firebase from "firebase";

const config = {

    apiKey: "AIzaSyC8JYNaGknDhGsW_baynLlBly9Yr2nMWkI",
    authDomain: "expensify-2cea2.firebaseapp.com",
    databaseURL: "https://expensify-2cea2.firebaseio.com",
    projectId: "expensify-2cea2",
    storageBucket: "expensify-2cea2.appspot.com",
    messagingSenderId: "561831579127"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({

    name: "Andy",
    age: 26,
    isSingle: false,
    location : {

        city: "Philadelphia",
        country: "USA"
    }
}).then(() => {

    console.log("Data is saved.");

}).catch((err) => {

    console.log("Firebase error:", err);
});

//database.ref().set("This is my data.");

/*
database.ref("age").set(27);
database.ref("location/city").set("New York");
*/

database.ref("attributes").set({

    height: 180,
    weight: 70

}).then(() => {

    console.log("Attributes saved.");

}).catch((err) => {

    console.log("Attributes data failed:", err);
});

console.log("A request to save the data was made.");