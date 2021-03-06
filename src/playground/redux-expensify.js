import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ACTION CREATORS

//  expenses actions

const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({

    type: "ADD_EXPENSE",

    expense: {

        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id } = {}) => ({

    type: "REMOVE_EXPENSE",
    id
});

const editExpense = (id, updates) => ({

    type:"EDIT_EXPENSE",
    id,
    updates
});

// filter actions

const setTextFilter = (text = "") => ({

    type: "SET_TEXT_FILTER",
    text
});

const sortByAmount = () => ({

    type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({

    type: "SORT_BY_DATE"
});

const setStartDate = (startDate) => ({

    type: "SET_START_DATE",
    startDate
});

const setEndDate = (endDate) => ({

    type: "SET_END_DATE",
    endDate
});


// REDUCERS

// expenses reducer

const expensesReducer = (state = [], action) => {

    switch (action.type) {

        case "ADD_EXPENSE":

            return [ ...state, action.expense ];

        case "REMOVE_EXPENSE":

            return state.filter((expense) => expense.id !== action.id)

        case "EDIT_EXPENSE":

            return state.map((expense) => {

                if (expense.id === action.id) {

                    return { ...expense, ...action.updates };
                }

                return expense;
            })

        default:

            return state;

    }

};

// filters reducer

const filtersReducerDefaultState = {

    text: "", sortBy: "date", startDate: undefined, endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {

    switch (action.type) {

        case "SET_TEXT_FILTER":

            return { ...state, text: action.text };

        case "SORT_BY_AMOUNT":

            return { ...state, sortBy: "amount" };

        case "SORT_BY_DATE":

            return { ...state, sortBy: "date" };

        case "SET_START_DATE":

            return { ...state, startDate: action.startDate };

        case "SET_END_DATE":

            return { ...state, endDate: action.endDate };

        default: 

            return state;
    }

};

// get visible expenses selector

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {

        const textMatch = expense.description.toLowerCase().indexOf(text.toLowerCase()) > -1; // or use ES6 includes

        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;

        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate; 

        return textMatch && startDateMatch && endDateMatch;

    }).sort((firstExpense, secondExpense) => {

        if (sortBy === "date") {

            return secondExpense.createdAt - firstExpense.createdAt;
        }
        else if (sortBy === "amount") {

            return secondExpense.amount - firstExpense.amount;  
        }

    });

};


// store creation

const store = createStore(
    
    combineReducers({

        expenses: expensesReducer,

        filters: filtersReducer
    })
    
);

store.subscribe(() => {

    const state = store.getState();

    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log("text:", state.filters.text, "start:", state.filters.startDate, "end:", state.filters.endDate, "sortBy:", state.filters.sortBy);
    console.log("Expenses", visibleExpenses.map(expense => expense.description + " $" + expense.amount + " " + expense.createdAt + "h"));
});

// dispatching expense actions
const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 400, createdAt: 9 }));
const expenseTwo = store.dispatch(addExpense({ description: "Gym", amount: 50, createdAt: 11 }));

const expenseThree = store.dispatch(addExpense({ description: "Renting a car", amount: 200, createdAt: 17 }));

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));

//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));


// dispatching filter actions

store.dispatch(setTextFilter("rent"));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

store.dispatch(setStartDate(200));
store.dispatch(setStartDate());
store.dispatch(setEndDate(100));
store.dispatch(setEndDate());
store.dispatch(setTextFilter())


const demoState = {

    expenses: [
        {
            id: "id123",
            description: "January rent",
            notes: "This was the final payment for that address",
            amount: 54500,  // dollars in cents
            createdAt: 0
        }
    ],

    filters: {

        text: "rent",
        sortBy: "amount", // date or amount
        startDate: undefined,
        endDate: undefined
    }
};