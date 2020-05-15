import * as ActionTypes from './ActionTypes';

export const shop = (state = { isLoading: true,
                                   errMess: null, 
                                   shop: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SHOP:
            return {...state, isLoading: false, errMess: null, shop: action.payload};

        case ActionTypes.SHOP_LOADING:
            return {...state, isLoading: true, errMess: null, shop: []};

        case ActionTypes.SHOP_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};