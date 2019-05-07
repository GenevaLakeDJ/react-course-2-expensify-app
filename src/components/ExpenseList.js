import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

// const ExpenseList = (props) => (
//     <div>
//         <h1>Expense List</h1>
//         {props.filters.text} 
//         {props.expenses.length}
//     </div>
// )

// ...expense = spread operator to pass all the properties on expense.  Now expenseListItem has access to all of those
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense}/>
                })
            )
        }
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

// API is a little bit different.  mapStateToProps is common practice and defines the things we want to get off the store, then we define the component that we want to create the connected version of (ExpenseList)
// End result is a new component which is just our component with the props from the store
// Allows us to create simple components and scale our code without passing props down through a tree.
export default connect(mapStateToProps)(ExpenseList)
