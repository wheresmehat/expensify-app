import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";

import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {

    const totalFormatted = numeral(expensesTotal / 100).format("$0,0.00");

    return (

        <div>
            <h1>
                Viewing {expensesCount} {expensesCount === 1 ? "expense" : "expenses"} totalling {totalFormatted}
            </h1>
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