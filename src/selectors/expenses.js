import moment from "moment";

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {

        const createdAtMoment = moment(expense.createdAt);

        const textMatch = expense.description.toLowerCase().indexOf(text.toLowerCase()) > -1; // or use ES6 includes

        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;

        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;

        return textMatch && startDateMatch && endDateMatch;

    }).sort((firstExpense, secondExpense) => {

        if (sortBy === "date") {

            return secondExpense.createdAt - firstExpense.createdAt;
        }
        else if (sortBy === "amount") {

            return secondExpense.amount - firstExpense.amount;  
        }

    });

};

export default getVisibleExpenses;
