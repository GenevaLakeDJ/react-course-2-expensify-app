import uuid from 'uuid'

// ADD_EXPENSE
export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE
// destructure an object (we destructure id), if nothing is provided we destructure emtpy object
// need to pass id onto the action object, so add it below, otherwise we can't use it in the reducer
export const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
// no need for defaults, if you don't have an id or any updates you aren't editing anything
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})