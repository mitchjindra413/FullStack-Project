import React from "react";
import { Route, Switch } from "react-router-dom";
import { ListingsIndex } from "./components/ListingsIndex/index.js";
import { ListingPage } from "./components/ListingsIndex/ListingPage/index.js";
import { Navigation } from "./components/Navigation/index.js";

function App() {
  return (
    // TODO remove add routes
    <>
      <Navigation />
      <Switch>
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
