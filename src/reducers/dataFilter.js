import {FETCH_ITEMS, FILTER_ITEMS} from "../actions/types";

const initialState = {
    items: [],
    filterName: '',
    filterStartTime: '',
    filterEndTime: '',
}

export default (state = initialState, action) => {
    console.log('dispatched');
    console.log(state)
    if (action.type === FILTER_ITEMS) {
        return {
            ...state,
            items: action.items,
            filterName: action.filterName,
            filterStartTime: action.filterStartTime,
            filterEndTime: action.filterEndTime,
        };
    } else if (action.type === FETCH_ITEMS) {
        return {
            ...state,
            items: action.items,
            filterName: action.filterName,
        };
    } else {
        return state
    }
};
