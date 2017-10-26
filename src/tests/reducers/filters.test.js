import moment from "moment";

import filtersReducer from "../../reducers/filters";

test("should setup default filter state values", () => {

    const state = filtersReducer(undefined, { type: "@@INIT" });

    expect(state).toEqual({

        text: "", 
        sortBy: "date", 
        startDate: moment().startOf("month"), 
        endDate: moment().endOf("month")
    });

});

test("should set sortBy to amount", () => {

    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });

    expect(state.sortBy).toBe("amount");

});

test("should set sortBy to date", () => {

    const currentState = {

        text: "", 
        sortBy: "amount", 
        startDate: undefined, 
        endDate: undefined
    };

    const action = { type: "SORT_BY_DATE" };

    const state = filtersReducer(currentState, action);

    expect(state.sortBy).toBe("date");

});

test("should set text filter", () => {

    const state = filtersReducer(undefined, { type: "SET_TEXT_FILTER", text: "test text" });

    expect(state.text).toBe("test text");

});

test("should set startDate filter", () => {

    const state = filtersReducer(undefined, { type: "SET_START_DATE", startDate: "123" });

    expect(state.startDate).toBe("123");

});

test("should set endDate filter", () => {

    const state = filtersReducer(undefined, { type: "SET_END_DATE", endDate: "789" });

    expect(state.endDate).toBe("789");

});