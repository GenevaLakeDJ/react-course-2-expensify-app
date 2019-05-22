export default (expenses) => {
    // mapping array of expenses(objects) to array of numbers
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0)
}


