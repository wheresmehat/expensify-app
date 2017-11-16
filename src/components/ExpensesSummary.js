import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";

import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {

    const totalFormatted = numeral(expensesTotal / 100).format("$0,0.00");

    return (

        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{expensesCount}</span> {expensesCount === 1 ? "expense" : "expenses"} totalling <span>{totalFormatted}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {

    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return { 
        
        expensesCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    };
}; 

export default connect(mapStateToProps)(ExpensesSummary);