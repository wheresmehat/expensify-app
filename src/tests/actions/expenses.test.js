import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { 
    addExpense, 
    startAddExpense, 
    editExpense,
    startEditExpense, 
    removeExpense,
    startRemoveExpense, 
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

test("should add expense to firebase and store", () => {

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

test("should edit expense on firebase", () => {

    const store = createMockStore({});
    const { id, ...noIdExpense } = expenses[0]; // firebase returns expense with no id so we put the id property from expense on a separate id variable and the rest of the properties on the noIdExpense variable, now we can test the expense returned from firebase below; https://codeburst.io/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90
    const updates = { note: "I'm sure eating a lot of gum!" };

    return store.dispatch(startEditExpense(id, updates))   // return promise so jest knows it is async
        .then(() => {

            const actions = store.getActions();

            expect(actions[0]).toEqual({
                
                type: "EDIT_EXPENSE",
                id,
                updates
            });

            return database.ref(`expenses/${id}`).once("value");

        })
        .then((snapshot) => {

            expect(snapshot.val()).toEqual({ ...noIdExpense, ...updates }); // noIdExpense doesn't have id; and that is exactly what we get from firebase
            
        });

});

test("should setup remove expense action object", () => {

    const action = removeExpense({ id: "123abc" });

    expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });

});

test("should remove expense from firebase", () => {

    const store = createMockStore({});
    const id = expenses[0].id;

    return store.dispatch(startRemoveExpense({id}))   // return promise so jest knows it is async
        .then(() => {

            const actions = store.getActions();

            expect(actions[0]).toEqual({
                
                type: "REMOVE_EXPENSE",
                id
            });

            return database.ref(`expenses/${id}`).once("value");

        })
        .then((snapshot) => {

            expect(snapshot.val()).toEqual(null);
            
        });

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

            database.ref(`expenses/${actions[0].expense.id}`).once("value") // above we return this in the first then and now we can chain another then that gets the returned value
                .then((snapshot) => {

                    expect(snapshot.val()).toEqual(expenseData);
                    
                });
            
            
        });

});



*/