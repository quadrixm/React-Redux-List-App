import {FETCH_ITEMS, FILTER_ITEMS} from "./types";
import axios from 'axios';

export const fetchData = () => dispatch => {
    axios.get('http://localhost:8000/items/')
        .then(function (response) {
            if (response.status === 200 && response.data.results) {
                dispatch({
                    type: FETCH_ITEMS,
                    allItems: response.data.results,
                    items: response.data.results,
                    filter: {}
                })
            }
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


export const filteredData = (data, filter) => dispatch => {
    dispatch({
        type: FILTER_ITEMS,
        items: data.filter(
            item => ((filter.startTime ? item.date >= new Date(filter.startTime) : true)
                && (filter.endTime ? item.date <= new Date(filter.endTime): true)
                && item.name.includes(filter.name))
        ),
        filter: filter,
    })
}
