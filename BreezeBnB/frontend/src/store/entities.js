import { combineReducers } from "redux";
import listingsReducer from "./listings";

export const entitiesReducer = combineReducers({
    listings: listingsReducer
})