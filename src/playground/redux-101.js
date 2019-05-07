import { createStore } from 'redux'

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count }) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
})

// Reducers
// 1. Reducers are pure functions (don't rely on anything not directly passed in, or don't change anything outside of the scope)
// 2. Never change state or action (just read off of them, and return a new state)

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
            return { count: state.count + incrementBy }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return { count: state.count - decrementBy }
        case 'SET':
            return { count: action.count }
        case 'RESET':
            return { count: state.count = 0 }
        default: return state
    }
    
    // if (action.type === 'INCREMENT') {
    //     return {
    //         count: state.count + 1
    //     }
    // } else {
    //     return state
    // }
}

// createStore needs a function as a first argument
const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

// Actions - than an object that gets sent to the store

// Increment the count
// need to provide 'type' property
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// })

// stops store.subscribe() from running
// unsubscribe()

store.dispatch(incrementCount({ incrementBy: 5 }))

// store.dispatch({
//     type: 'INCREMENT'
// })

store.dispatch(incrementCount())

// Reset the count to zero

store.dispatch(resetCount())

// store.dispatch({
//     type: 'RESET'
// })

// store.dispatch({
//     type: 'DECREMENT'
// })

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// })

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 101 }))

// store.dispatch({
//     type: 'SET',
//     count: 101
// })
