import React, { Component } from "react";
import { connect } from "react-redux";

import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

export class AddExpensePage extends Component {     // export for testing purposes

    onSubmit = (expense) => {

        this.props.startAddExpense(expense);
        this.props.history.push("/");
    };

    render() {

        return (

            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        onSubmit={this.onSubmit}
                        autofocusSetting={true}
                    />
                </div>
            </div>
        );
    }

};

export default connect(null, { startAddExpense })(AddExpensePage);


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