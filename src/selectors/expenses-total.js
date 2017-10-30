export default (expenses) => {

    return expenses.reduce((acc, curr) => {

        return acc + curr.amount;

    }, 0);

};