import { createStore, combineReducers } from "redux";

// ACTION CREATORS

const incrementCount = ({ incrementBy = 1 } = {}) => ({ 
    
    type: "INCREMENT", 
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({ 
    
    type: "DECREMENT", 
    decrementBy
});

const resetCount = () => ({ 
    
    type: "RESET"
});

const setCount = ({ count = 0 } = {}) => ({ 
    
    type: "SET",
    count
});


// REDUCERS
/*
1. Reducers are pure functions
2. Never mutate or reassign state or action, just return a new state
*/

const countReducer = (state = { count: 0 }, action) => {

    action.type === "ADD" || console.log(action.type);

    switch (action.type) {

        case "INCREMENT":
        
            return {

                count: state.count + action.incrementBy  
            };

        case "DECREMENT":

            return {

                count: state.count - action.decrementBy
            };

        case "RESET":

            return {

                count: 0
            };

        case "SET":

            return {

                count: action.count
            };
        
        default:

            return state;
    
    }

};

const addReducer = (state = { value: 0 }, action) => {

    action.type === "ADD" && console.log(action.type);
    
    switch (action.type) {

        case "ADD":

            return { value: state.value + action.payload };

        default: 

            return state;

    }

};


// COMBINE REDUCERS

const reducers = combineReducers({

    count: countReducer,

    value: addReducer

});

// my custom combine reducers
/*const allReducers = (state = {}, action) => {

    return {

        count: countReducer(state.count, action),

        value: addReducer(state.value, action)
    };

};*/

// STORE

const store = createStore(reducers);


// DISPATCHING ACTIONS

const unsubscribe = store.subscribe(() => {

    console.log(store.getState());
});

store.dispatch(incrementCount());
store.dispatch(incrementCount());
store.dispatch(decrementCount());
//unsubscribe();
store.dispatch(resetCount());

store.dispatch(incrementCount({ incrementBy: 10 }));

store.dispatch(decrementCount({ decrementBy: 5 }));

store.dispatch(setCount({ count: 100 }));

store.dispatch(incrementCount());
store.dispatch(decrementCount());


store.dispatch({ type: "ADD", payload: 14 });



