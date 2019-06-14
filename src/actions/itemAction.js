import {FETCH_ITEMS, FILTER_ITEMS} from "./types";

export const fetchData = () => dispatch => {
    const data = [
        {name: 'abc', date: new Date('2019-06-12'), quantity: 2},
        {name: 'xcv', date: new Date('2019-06-13'), quantity: 2},
        {name: 'xnv', date: new Date('2019-06-14'), quantity: 4},
        {name: 'xqv', date: new Date('2019-06-15'), quantity: 4},
    ];

    dispatch({
        type: FETCH_ITEMS,
        items: data,
        filterName: ''
    })

    console.log('fetched')
}


export const filteredData = (data, name, start, end) => dispatch => {
    dispatch({
        type: FILTER_ITEMS,
        items: data.filter(
            item => ((start ? item.date >= new Date(start) : true)
                && (end ? item.date <= new Date(end): true)
                && item.name.includes(name))
        ),
        filterName: name,
        filterStartTime: start,
        filterEndTime: end
    })
    console.log('filtered')
}
