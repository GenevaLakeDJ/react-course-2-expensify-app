import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

// don't need all props below, so we just destructured it
export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')
    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    )
}

// here is the connected version of the component where we use the two selectors to get the value off the redux store
// set it up to have an actual function body, since we are using selectors
const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}
// connect a new component
// what component are we trying to connect? ExpensesSummary
// what are we trying to do with this component?  trying to get values (set up mapStateToProps)
// we need both the selector to get all the visible expenses and we also need the selector for adding up the visible expenses, so we need to import both of those at the top of the file
export default connect(mapStateToProps)(ExpensesSummary)