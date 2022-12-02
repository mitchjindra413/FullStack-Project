import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ListingsIndex } from "./components/ListingsIndex/index.js";
import { ListingPage } from "./components/ListingPage/index.js";
import { Navigation } from "./components/Navigation/index.js";
import { TripsPage } from "./components/TripsPage/index.js";
import {ProfilePage} from "./components/ProfilePage/index.js"
import { ReviewForm } from "./components/Review/ReviewForm.js";
import { UpdateReviewForm } from "./components/Review/UpdateReviewForm.js";
import { SearchView } from "./components/SearchView/SearchView.js";

function App() {
  const user = useSelector(state => state.session.user)

  return (
    <>
      <Navigation />
      <Switch>
        <Route path={'/search/:lat/:lng/:place'}>
          <SearchView></SearchView>
        </Route>
        <Route path={'/profile'}>
          {!user ? <Redirect to='/'></Redirect> : <ProfilePage></ProfilePage>}
        </Route>
        <Route path={'/trips'}>
          {!user ? <Redirect to="/"></Redirect> : <TripsPage></TripsPage>}
        </Route>
        <Route path={'/listings/:listingId/reviews/:reviewId/edit'}>
          {!user ? <Redirect to="/"></Redirect> : <UpdateReviewForm></UpdateReviewForm>}
        </Route>
        <Route exact path={'/listings/:listingId/reviews/new'}>
          {!user ? <Redirect to="/"></Redirect> : <ReviewForm></ReviewForm>}
        </Route>
        <Route path={'/listings/:listingId'}>
          <ListingPage />
        </Route>
        <Route path="/">
          <ListingsIndex />
        </Route>
      </Switch>
    </>
  );
}

export default App;
