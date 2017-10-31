const p = new Promise((resolve, reject) => {

    setTimeout(() => {

        //reject("Rejected promise");
        resolve("This is my resolved data");
       
    }, 4000);
    
});

p
.then((data) => {
    //throw new Error("First then error");
    console.log(data);
})
.catch((err) => {

    console.log("Error:", err);
});

console.log("Recompiled");


/*

const p = new Promise((resolve, reject) => {

    setTimeout(() => {

        //reject("Rejected promise");
        resolve("This is my resolved data");
       
    }, 4000);
    
});

p
.then((data) => {
    throw new Error("First then error");
    console.log(data);
}, (err) => {

    console.log("Error:", err); // doesn't catch error in first then, but catch does
});

*/