import {
    SHOW_ALERT,
    HIDE_ALERT
} from './alertTypes';

const initialState = {
    alert: null
}

//Reducer recives the initial state and and action object to make updates to the state based on action type
export function alertReducer (state = initialState, action ) {
    switch (action.type) {
        
        case SHOW_ALERT:
            return {
                alert: action.payload
            }

        case HIDE_ALERT:
            return {
                alert: null
            }

        default:
            return state
    }
}