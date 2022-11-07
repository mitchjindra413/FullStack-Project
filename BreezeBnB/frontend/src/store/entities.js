import { combineReducers } from "redux";
import listingsReducer from "./listings";
import reservationsReducer from "./reservations";
import { reviewsReducer } from "./reviews";

export const entitiesReducer = combineReducers({
    listings: listingsReducer,
    reservations: reservationsReducer,
    reviews: reviewsReducer
})