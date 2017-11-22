import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import { startSetExpenses, clearLocalExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

const jsx = (

    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {

    if (!hasRendered) {

        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => renderApp());

        if (history.location.pathname === "/") {

            history.push("/dashboard");
        }

    }
    else {
        store.dispatch(logout());
        store.dispatch(clearLocalExpenses());   // clear expenses from local Redux store after logout
        renderApp();
        history.push("/");
    }
});