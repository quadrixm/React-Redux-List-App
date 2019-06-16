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

const updateItems = function (items, getCondition, updateItem) {
    for (let i in items) {
        let item = {...items[i]}
        if (getCondition(item)) {
            updateItem(item)
            items[i] = item
        }
    }
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
        let items = Array.from(state.items);
        let filterItems = Array.from(state.filterItems);
        updateItems(items, (item) => item.id === action.item.id, (item) => item.file = action.file)
        updateItems(filterItems, (item) => item.id === action.item.id, (item) => item.file = action.file)
        return {
            ...state,
            items: items,
            filterItems: filterItems,
        };
    } else if (action.type === FILE_UPLOAD) {
        let newItems = Array.from(state.items);
        let newFilterItems = Array.from(state.filterItems);
        const uploadIds = action.uploadIds

        updateItems(newItems, (item) => {
            for (let id in uploadIds) {
                if (item.id == id) {
                    return true;
                }
            }
            return false;
        }, (item) => {
            item.photo = uploadIds[item.id];
            console.log(uploadIds[item.id])
            item.quantity = 0;
        })

        updateItems(newFilterItems, (item) => {
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

        // const updateItems = function (items, uploadIds, onFound) {
        //     for (let i in items) {
        //         let item = {...items[i]}
        //         for (let id in uploadIds) {
        //             if (item.id == id) {
        //                 onFound(item, i, id)
        //             }
        //         }
        //     }
        // }
        //
        // updateItems(newItems, uploadIds, (item, itemIndex, uploadId) => {
        //     item.photo = uploadIds[uploadId];
        //     item.quantity = 0;
        //     newItems[itemIndex] = item
        // })
        //
        // updateItems(newFilterItems, uploadIds, (item, itemIndex, uploadId) => {
        //     item.photo = uploadIds[uploadId];
        //     item.quantity = 0;
        //     newFilterItems[itemIndex] = item
        // })
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
