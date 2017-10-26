import React from "react";
import { shallow } from "enzyme";

import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { defaultFilters, altFilters } from "../fixtures/filters";

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {

    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            filters={defaultFilters} 
            setTextFilter={setTextFilterSpy}
            sortByDate={sortByDateSpy}
            sortByAmount={sortByAmountSpy}
            setStartDate={setStartDateSpy}
            setEndDate={setEndDateSpy} 
    />);
});

test("should render ExpenseListFilters correctly", () => {

    expect(wrapper).toMatchSnapshot();

});

test("should render ExpenseListFilters with alt filters correctly", () => {

    wrapper.setProps({ filters: altFilters });

    expect(wrapper).toMatchSnapshot();

});

test("should handle text change", () => {

    wrapper.find("input").simulate("change", { target: { value: "tickets" } })

    expect(setTextFilterSpy).toHaveBeenCalledWith("tickets");

});

test("should sort by date", () => {

    wrapper.find("select").simulate("change", { target: { value: "date" } });

    expect(sortByDateSpy).toHaveBeenCalledWith();

});

test("should sort by amount", () => {

    wrapper.find("select").simulate("change", { target: { value: "amount" } });

    expect(sortByAmountSpy).toHaveBeenCalledWith();

});

test("should handle date changes", () => {

    wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate: 10, endDate: 200 });

    expect(setStartDateSpy).toHaveBeenCalledWith(10);
    expect(setEndDateSpy).toHaveBeenCalledWith(200);

});

test("should handle date focus changes", () => {

    wrapper.find("DateRangePicker").prop("onFocusChange")("startDate");

    expect(wrapper.state("calendarFocused")).toBe("startDate");

});




