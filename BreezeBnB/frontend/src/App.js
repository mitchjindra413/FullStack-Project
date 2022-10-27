import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginFormModal } from "./components/LoginFormModal/index.js";
import SignupFormPage from "./components/SignupFormPage";


function App() {
  return (
    // TODO remove add routes
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormModal />
        </Route>
      </Switch>
    </>
  );
}

export default App;
