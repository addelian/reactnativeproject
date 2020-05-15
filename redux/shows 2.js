import * as ActionTypes from './ActionTypes';

export const shows = (state = { isLoading: true,
                                   errMess: null, 
                                   shows: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SHOWS:
            return {...state, isLoading: false, errMess: null, shows: action.payload};

        case ActionTypes.SHOWS_LOADING:
            return {...state, isLoading: true, errMess: null, shows: []};

        case ActionTypes.SHOWS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};