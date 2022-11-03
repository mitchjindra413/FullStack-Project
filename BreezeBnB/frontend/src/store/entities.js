import { combineReducers } from "redux";
import listingsReducer from "./listings";
import reservationsReducer from "./reservations";

export const entitiesReducer = combineReducers({
    listings: listingsReducer,
    reservations: reservationsReducer,
})