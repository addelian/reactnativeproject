import * as ActionTypes from './ActionTypes';

export const interested = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_INTERESTED:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        default:
            return state;
    }
};