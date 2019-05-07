import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { addExpense } from '../actions/expenses'

//changed to class based component and exported it
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // changed line below for the line that follows when writing tests
        // props.dispatch(addExpense(expense))
        this.props.addExpense(expense)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit={(expense) => {
//                 // changed line below for the line that follows when writing tests
//                 // props.dispatch(addExpense(expense))
//                 props.onSubmit(expense)
//                 props.history.push('/')
//             }}
//         />
//     </div>
// )

//new below when writing tests to make a component that is more testable
const mapDispatchToProps = (dispatch) => {
    return {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
}

// after changing for tests, we know first argument is mapStatesToProp and we don't need that, so pass undefined as first argument
// second function is mapDispatchToProps
export default connect(undefined, mapDispatchToProps)(AddExpensePage)