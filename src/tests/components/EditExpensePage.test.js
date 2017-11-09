// in ExpenseForm.js comment out moment.locale("en-gb"); line to pass this test

import React from "react";
import { shallow } from "enzyme";

import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpenseSpy, startRemoveExpenseSpy, historySpy, wrapper;

beforeEach(() => {

    startEditExpenseSpy = jest.fn();
    startRemoveExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() };

    wrapper = shallow(
        <EditExpensePage
            expense={expenses[1]} 
            startEditExpense={startEditExpenseSpy}
            startRemoveExpense={startRemoveExpenseSpy}
            history={historySpy} 
    />);
});

test("should render EditExpensePage correctly", () => {

    expect(wrapper).toMatchSnapshot();

});

test("should handle editExpense", () => {

    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);

    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith("/");

});

test("should handle startRemoveExpense", () => {

    wrapper.find("button").simulate("click");

    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith({ id: expenses[1].id });
    expect(historySpy.push).toHaveBeenLastCalledWith("/");

});
