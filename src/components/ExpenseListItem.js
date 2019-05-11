// Export a stateless functional component
// description, amount, createdAt
// need to import react because we are using jsx
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

// Need to add dispatch since we destructured the props item.  Adding dispatch here is the same as calling props.dispatch, but props is undefined right now since we destructured the object
// feed id as an object into removeExpense, as that is how the function is set up
const ExpenseListItem = ( {dispatch, id, description, amount, createdAt} ) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3> {description} </h3>
        </Link>
        <p>
            {numeral(amount/100).format('$0,0.00')}
            -
            {moment(createdAt).format('MMMM Do, YYYY')}
        </p>
    </div>
)

// Don't need anything from the state, so don't need to provide myStateToProps
export default ExpenseListItem