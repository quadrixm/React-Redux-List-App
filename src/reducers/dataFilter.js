import { DataFilters } from '../actions'

const dataFilter = (state = DataFilters.NAME, action) => {
    if (action.type === 'SET_DATA_FILTER') {
        return action.filter
    } else {
        return state
    }
};

export default dataFilter
