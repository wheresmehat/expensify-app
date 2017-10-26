import moment from "moment";

export default [

    { 
        id: "1",
        description: "Gum bill second",
        amount: 195,
        note: "",
        createdAt: 0
    },
    { 
        id: "2",
        description: "Rent first",
        amount: 109500,
        note: "",
        createdAt: moment(0).subtract(4, "days").valueOf()
    },
    { 
        id: "3",
        description: "Credit Card bill third",
        amount: 4500,
        note: "",
        createdAt: moment(0).add(4, "days").valueOf()
    }
];