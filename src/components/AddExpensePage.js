import React, { Component } from "react";
import { connect } from "react-redux";

import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

export class AddExpensePage extends Component {     // export for testing purposes

    onSubmit = (expense) => {

        this.props.addExpense(expense);
        this.props.history.push("/");
    };

    render() {

        return (

            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        );
    }

};

export default connect(null, { addExpense })(AddExpensePage);


/*

const mapDispatchToProps = (dispatch) => {

    return {

        myAddExpense: (expense) => {   // we name the prop and use as props.myAddExpense(expense) above

            dispatch(addExpense(expense))   // addExpense is the action creator
        }
    };

};

export default connect(null, mapDispatchToProps)(AddExpensePage);


or without mapDispatchToProps if they have the same parameters in the same order:

export default connect(null, { myAddExpense: addExpense })(AddExpensePage);


or use the same name:

export default connect(null, { addExpense: addExpense })(AddExpensePage);


or using ES6 object shorthand for props and value of same name:

export default connect(null, { addExpense })(AddExpensePage);
*/