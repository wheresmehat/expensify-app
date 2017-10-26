import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should setup default expenses state value", () => {

    const state = expensesReducer(undefined, { type: "@@INIT" });

    expect(state).toEqual([]);

});

test("should remove expense by id", () => {

    const action = { type: "REMOVE_EXPENSE", id: "2" };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([ expenses[0], expenses[2] ]);

});

test("should not remove expense if id is not found", () => {

    const action = { type: "REMOVE_EXPENSE", id: "-1" };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);

});

test("should add an expense", () => {

    const foodExpense = {

        id: "4",
        description: "Food",
        amount: 24000,
        note: "",
        createdAt: 20000
    };

    const action = { 
        
        type: "ADD_EXPENSE",
        expense: foodExpense 
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([ ...expenses, foodExpense ]);

});

test("should edit an expense", () => {

    const gumExpenseUpdate = {

        amount: 300,
        note: "Bought more gum",
    };

    const action = { 
        
        type: "EDIT_EXPENSE",
        id: "1",
        updates: gumExpenseUpdate 
    };

    const state = expensesReducer(expenses, action);

    expect(state[0]).toEqual({ ...expenses[0], ...gumExpenseUpdate });

});

test("should not edit an expense if id not found", () => {

    const foodExpenseUpdate = {

        amount: 3000,
        note: "Bought more food",
    };

    const action = { 
        
        type: "EDIT_EXPENSE",
        id: "-1",
        updates: foodExpenseUpdate 
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);

});