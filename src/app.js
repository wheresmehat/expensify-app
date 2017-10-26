import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import { addExpense } from "./actions/expenses";
import { setTextFilter, sortByAmount } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.subscribe(() => {

    const state = store.getState();

    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log("text:", state.filters.text, "start:", state.filters.startDate, "end:", state.filters.endDate, "sortBy:", state.filters.sortBy);
    console.log("Expenses", visibleExpenses.map(expense => expense.description + " $" + expense.amount + " " + expense.createdAt + "h " + "note:" + " " + expense.note));
});

store.dispatch(addExpense({ description: "Gas bill", amount: 300, createdAt: 9 }));
store.dispatch(addExpense({ description: "Water bill", amount: 100, createdAt: 17 }));
store.dispatch(addExpense({ description: "Rent", amount: 600, createdAt: 11 }));

//store.dispatch(sortByAmount());

const jsx = (

    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));