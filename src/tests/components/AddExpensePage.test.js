// in ExpenseForm.js comment out moment.locale("en-gb"); line to pass this test

import React from "react";
import { shallow } from "enzyme";

import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {

    addExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={historySpy} />);
});

test("should render AddExpensePage correctly", () => {

    expect(wrapper).toMatchSnapshot();

});

test("should handle addExpense", () => {

    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);

    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith("/");

});
