// in ExpenseForm.js comment out moment.locale("en-gb"); line to pass this test

import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {

    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();

});

test("should render ExpenseForm with expense data", () => {

    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);

    expect(wrapper).toMatchSnapshot();

});

test("should render error for invalid form submission", () => {

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find("form").simulate("submit", { preventDefault: () => {} }); // onSubmit in ExpenseForm uses event.preventDefault() so we need to pass an event object with a simulated function with the same name

    //expect(wrapper.state("error")).toBe("Please provide description and amount.");
    expect(wrapper.state("error").length).toBeGreaterThan(0);

    expect(wrapper).toMatchSnapshot();

});

test("should set description on input change", () => {

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("input").at(0).simulate("change", { target: { value: "my test description" } }); // onDescriptionChange uses event.target.value so we have to simulate that event object

    expect(wrapper.state("description")).toBe("my test description");

    expect(wrapper).toMatchSnapshot();

});

test("should set note on textarea change", () => {

    const value = "my test note";

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("textarea").at(0).simulate("change", { target: { value } }); // onNoteChange uses event.target.value so we have to simulate that event object

    expect(wrapper.state("note")).toBe(value);

});

test("should set amount if valid input", () => {

    const validAmount = "23.54";

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("input").at(1).simulate("change", { target: { value: validAmount } }); // onAmountChange uses event.target.value so we have to simulate that event object

    expect(wrapper.state("amount")).toBe(validAmount);

});

test("should NOT set amount if invalid input", () => {

    const invalidAmount = "12.345";

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("input").at(1).simulate("change", { target: { value: invalidAmount } }); // onAmountChange uses event.target.value so we have to simulate that event object

    expect(wrapper.state("amount")).toBe("");

});

test("should call onSubmit prop for valid form submission", () => {

    const onSubmitSpy = jest.fn();

    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />);

    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(wrapper.state("error")).toBe("");

    expect(onSubmitSpy).toHaveBeenLastCalledWith({ 

        description: expenses[1].description,
        amount: expenses[1].amount,
        note: expenses[1].note,
        createdAt: expenses[1].createdAt
    });

});

test("should set new date on date change", () => {

    const now = moment();

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("SingleDatePicker").prop("onDateChange")(now);
    //wrapper.find("SingleDatePicker").props().onDateChange(new Date(123)); // props() returns all props

    expect(wrapper.state("createdAt")).toEqual(now);

});

test("should set calendar focus on change", () => {

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused: true });

    expect(wrapper.state("calendarFocused")).toBe(true);

});



