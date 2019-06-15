import {ADD_FILE, FETCH_ITEMS, FILTER_ITEMS} from "../actions/types";

const initialState = {
    items: [],
    filterItems: [],
    filter: {
        name: '',
        startTime: '',
        endTime: '',
    },
}

export default (state = initialState, action) => {
    console.log('dispatched');
    console.log(action)
    if (action.type === FILTER_ITEMS) {
        return {
            ...state,
            filterItems: action.items,
            filter: action.filter,
        };
    } else if (action.type === FETCH_ITEMS) {
        return {
            ...state,
            items: action.items,
            filterItems: action.items,
            filter: action.filter,
        };
    } else if (action.type === ADD_FILE) {
        let items = state.items;
        const item = action.item
        for (var i in items) {
            if (items[i].id === item.id) {
                items[i].file = action.file;
                break; //Stop this loop, we found it!
            }
        }
        return {
            ...state,
            items: items,
        };
    } else {
        return state
    }
};
