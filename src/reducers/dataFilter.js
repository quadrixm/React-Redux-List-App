import {ADD_FILE, FETCH_ITEMS, FILE_UPLOAD, FILTER_ITEMS} from "../actions/types";

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
    } else if (action.type === FILE_UPLOAD) {
        let newItems = [];
        // let newItems = Array.from(state.items);
        let newFilterItems = [];
        // let newFilterItems = Array.from(state.filterItems);
        const uploadIds = action.uploadIds
        for (let i in state.items) {
            let item = {...state.items[i]}
            for (let key in uploadIds) {
                if (item.id == key) {
                    console.log(uploadIds[key])
                    // newItems.push(state.items[i])
                    item.photo = uploadIds[key];
                    item.quantity = 0;
                }
                newItems.push(item)
            }
        }
        for (let i in state.filterItems) {
            let item = {...state.filterItems[i]}
            for (let key in uploadIds) {
                if (item.id == key) {
                    console.log(uploadIds[key])
                    // newItems.push(state.items[i])
                    item.photo = uploadIds[key];
                    item.quantity = 0;
                }
                newFilterItems.push(item)
            }
        }
        console.log('FILE_UPLOAD')
        console.log(uploadIds)
        return {
            ...state,
            items: newItems,
            filterItems: newFilterItems,
        };
    } else {
        return state
    }
};
