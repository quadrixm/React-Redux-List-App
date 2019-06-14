import {combineReducers} from "redux";
import dataFilter from "./dataFilter";


export default combineReducers({
    data: dataFilter
})
