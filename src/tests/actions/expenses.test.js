import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup add expense action object with provided values", () => {

    const expenseData = {

        description: "Rent",
        amount: 34000,
        note: "Last month's rent",
        createdAt: 1000
    };

    const action = addExpense(expenseData);

    expect(action).toEqual({ 
        
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        } 
    
    });

});

test("should setup add expense action object with default values", () => {

    const expenseDefaults = { 
        
        description: "",
        amount: 0, 
        note: "", 
        createdAt: 0
    };

    const action = addExpense();

    expect(action).toEqual({ 
        
        type: "ADD_EXPENSE",
        expense: {
            ...expenseDefaults,
            id: expect.any(String)
        } 
    
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

