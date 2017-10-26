const person = {

    name: "Andrew",
    age: 26,

    location: {
        city: "Philadelphia",
        temp: 92
    }
};

const person2 = {

    age: 21,

    location: {
        city: "Washington",
    }
};

const { name = "Anonymous", age } = person;     // change to person2 to use defaults

console.log(`${name} is ${age}.`);

// const { city, temp } = person.location;
const { location: { city, temp: temperature = 120 } } = person;     // change to person2 to use defaults

console.log(`It's ${temperature} in ${city}.`);

const book = {

    title: "Ego is the enemy",
    author: "Ryan Holiday",

    publisher: {
        name: "Penguin"
    }
};

const { name: publisherName = "Self-Published" } = book.publisher;

console.log(publisherName); 


const address = ["1299 S Juniper Street", "Philadelphia", "Pennsylvania", "19147"];
const [ , cityName, stateName = "Indiana" ] = address; 

console.log(`You are in ${cityName}, ${stateName}.`);


const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [ itemName, , itemMediumPrice ] = item;

console.log(`A medium ${itemName} costs ${itemMediumPrice}.`);



