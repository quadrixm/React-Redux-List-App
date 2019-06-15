import {FETCH_ITEMS, FILTER_ITEMS} from "./types";

const data = [
    {name: 'abc', date: new Date('2019-06-12'), quantity: 2},
    {name: 'xcv', date: new Date('2019-06-13'), quantity: 2},
    {name: 'xnv', date: new Date('2019-06-14'), quantity: 4},
    {name: 'xqv', date: new Date('2019-06-15'), quantity: 4},
];

export const fetchData = () => dispatch => {
    dispatch({
        type: FETCH_ITEMS,
        items: data,
        filter: {}
    })
}


export const filteredData = (filter) => dispatch => {
    dispatch({
        type: FILTER_ITEMS,
        items: data.filter(
            item => ((filter.startTime ? item.date >= new Date(filter.startTime) : true)
                && (filter.endTime ? item.date <= new Date(filter.endTime): true)
                && item.name.includes(filter.name))
        ),
        filter: filter,
    })
    console.log('filtered')
    console.log(filter)
}
