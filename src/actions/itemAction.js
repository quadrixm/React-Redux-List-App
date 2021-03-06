import {ADD_FILE, FETCH_ITEMS, FILE_UPLOAD, FILTER_ITEMS} from "./types";
import axios from 'axios';

export const fetchData = () => dispatch => {
    axios.get('http://localhost:8000/items/')
        .then(function (response) {
            if (response.status === 200 && response.data.results) {
                dispatch({
                    type: FETCH_ITEMS,
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
        items: data,
        filter: filter,
    })
}


export const addFile = (file, item) => dispatch => {
    dispatch({
        type: ADD_FILE,
        file: file,
        item: item,
    })
}


export const uploadFiles = (items) => dispatch => {

    const formData = new FormData();

    items.map((item, key) => {
            if (item.file) {
                formData.append('' + item.id, item.file);
            }
        }
    )

    axios.post(`http://localhost:8000/upload/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        if (response.status === 200 && response.data) {
            dispatch({
                type: FILE_UPLOAD,
                uploadIds: response.data,
            })
        }
    }).catch(error => {
        console.log(error)
    });
}
