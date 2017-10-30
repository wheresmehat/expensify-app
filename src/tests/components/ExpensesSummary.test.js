import React from "react";
import { shallow } from "enzyme";

import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render ExpensesSummary with 0 expenses", () => {

    const wrapper = shallow(<ExpensesSummary expensesCount={0} expensesTotal={0} />);

    expect(wrapper).toMatchSnapshot();

});

test("should render ExpensesSummary with 1 expense", () => {

    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={expenses[1].amount} />);

    expect(wrapper).toMatchSnapshot();

});

test("should render ExpensesSummary with 3 expenses", () => {

    const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={114195} />);

    expect(wrapper).toMatchSnapshot();

});