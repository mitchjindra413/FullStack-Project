import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ListingsIndex } from "./components/ListingsIndex/index.js";
import { ListingPage } from "./components/ListingsIndex/ListingPage/index.js";
import { Navigation } from "./components/Navigation/index.js";
import { TripsPage } from "./components/TripsPage/index.js";


function App() {
  const user = useSelector(state => state.session.user)
  
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={'/trips'}>
          {!user ? <Redirect to="/"></Redirect> : <TripsPage></TripsPage>}
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
