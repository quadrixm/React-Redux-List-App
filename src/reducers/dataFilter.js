import {ADD_FILE, FETCH_ITEMS, FILE_UPLOAD, FILTER_ITEMS} from "../actions/types";

const initialState = {
    items: [],
    filter: {
        name: '',
        startTime: '',
        endTime: '',
    },
}

const updateItems = function (items, getCondition, onTrue, onFalse = undefined) {
    for (let i in items) {
        let item = {...items[i]}
        if (getCondition(item)) {
            if (onTrue) {
                onTrue(item)
                items[i] = item
            }
        } else {
            if (onFalse) {
                onFalse(item)
                items[i] = item
            }
        }
    }
}

export default (state = initialState, action) => {
    console.log('dispatched');
    console.log(action)
    if (action.type === FILTER_ITEMS) {
        let items = Array.from(state.items);
        updateItems(items, (item) => (action.filter.startTime ? new Date(item.date) >= new Date(action.filter.startTime) : true)
            && (action.filter.endTime ? new Date(item.date) <= new Date(action.filter.endTime) : true)
            && item.name.includes(action.filter.name), (item) =>  item.hidden = false, (item) =>  item.hidden = true)
        return {
            ...state,
            items: items,
            filter: action.filter,
        };
    } else if (action.type === FETCH_ITEMS) {
        return {
            ...state,
            items: action.items,
            filter: action.filter,
        };
    } else if (action.type === ADD_FILE) {
        let items = Array.from(state.items);
        updateItems(items, (item) => item.id === action.item.id, (item) => item.file = action.file)
        return {
            ...state,
            items: items,
        };
    } else if (action.type === FILE_UPLOAD) {
        let items = Array.from(state.items);
        // let newFilterItems = Array.from(state.filterItems);
        const uploadIds = action.uploadIds

        updateItems(items, (item) => {
            for (let id in uploadIds) {
                if (item.id == id) {
                    return true;
                }
            }
            return false;
        }, (item) => {
            item.photo = uploadIds[item.id];
            item.file = undefined;
        })

        console.log('FILE_UPLOAD')
        console.log(uploadIds)
        return {
            ...state,
            items: items,
        };
    } else {
        return state
    }
};
