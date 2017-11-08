import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { 
    addExpense, 
    startAddExpense, 
    editExpense, 
    removeExpense, 
    setExpenses,
    startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {

    const expensesData = {};

    expenses.forEach(({ id, description, amount, note, createdAt }) => {

        expensesData[id] = { description, amount, note, createdAt };
    });

    database.ref("expenses").set(expensesData)
        .then(() => done());

});

test("should setup add expense action object with provided values", () => {

    const action = addExpense(expenses[1]);

    expect(action).toEqual({ 
        
        type: "ADD_EXPENSE",
        expense: expenses[1]
    
    });

});

test("should add expense with defaults to database and store", () => {

    const expenseDefaults = { 
        
        description: "",
        amount: 0, 
        note: "", 
        createdAt: 0
    };

    const store = createMockStore({});

    return store.dispatch(startAddExpense())
        .then(() => {

            const actions = store.getActions();

            expect(actions[0]).toEqual({
                
                type: "ADD_EXPENSE",
                expense: {

                    id: expect.any(String),
                    ...expenseDefaults
                }
            });

            return database.ref(`expenses/${actions[0].expense.id}`).once("value");
            
        })
        .then((snapshot) => {

            expect(snapshot.val()).toEqual(expenseDefaults);
            
        });

});

test("should add expense to database and store", () => {

    const expenseData = { 
        
        description: "Cinema",
        amount: 3400, 
        note: "Blade Runner 2049", 
        createdAt: 1000
    };

    const store = createMockStore({});

    return store.dispatch(startAddExpense(expenseData)) // return promise so jest knows it is async or use done()
        .then(() => {

            const actions = store.getActions();

            expect(actions[0]).toEqual({
                
                type: "ADD_EXPENSE",
                expense: {

                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`expenses/${actions[0].expense.id}`).once("value");
            
        })
        .then((snapshot) => {

            expect(snapshot.val()).toEqual(expenseData);
            
        });

});

test("should setup edit expense action object", () => {

    const action = editExpense("123abc", { note: "New note value" });

    expect(action).toEqual({ 
        
        type: "EDIT_EXPENSE", 
        id: "123abc",
        updates: { note: "New note value" } 
    });

});

test("should setup remove expense action object", () => {

    const action = removeExpense({ id: "123abc" });

    expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });

});

test("should setup set expenses action object with data", () => {

    const action = setExpenses(expenses);

    expect(action).toEqual({ type: "SET_EXPENSES", expenses });

});

test("should fetch expenses from firebase", () => {

    const store = createMockStore({});

    return store.dispatch(startSetExpenses())   // return promise so jest knows it is async
        .then(() => {

            const actions = store.getActions();

            expect(actions[0]).toEqual({
                
                type: "SET_EXPENSES",
                expenses
            });

        });
        
});





/*

// nested inside then vs chaining promises above 

test("should add expense to database and store", () => {

    const expenseData = { 
        
        description: "Cinema",
        amount: 3400, 
        note: "Blade Runner 2049", 
        createdAt: 1000
    };

    const store = createMockStore({});

    return store.dispatch(startAddExpense(expenseData))
        .then(() => {

            const actions = store.getActions();

            expect(actions[0]).toEqual({
                
                type: "ADD_EXPENSE",
                expense: {

                    id: expect.any(String),
                    ...expenseData
                }
            });

            database.ref(`expenses/${actions[0].expense.id}`).once("value") // above we return this and chain another then
                .then((snapshot) => {

                    expect(snapshot.val()).toEqual(expenseData);
                    
                });
            
            
        });

});



*/