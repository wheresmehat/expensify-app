import React from "react";
import { connect } from "react-redux";

import getVisibleExpenses from "../selectors/expenses";
import ExpenseListItem from "./ExpenseListItem";

export const ExpenseList = (props) => {     // export for testing purposes

    return (

        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>
                <div className="show-for-desktop">Expense</div>
                <div className="show-for-desktop">Amount</div>
            </div>
            <div className="list-body">
                {
                    props.expenses.length === 0 ?
                        <div className="list-item list-item--message">
                            <span>No expenses</span>
                        </div>
                        :
                        props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
                }
            </div>
        </div>
    );

};

const mapStateToProps = (state) => (

    { expenses: getVisibleExpenses(state.expenses, state.filters) }
);

export default connect(mapStateToProps)(ExpenseList);

//const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);
//export default ConnectedExpenseList;
