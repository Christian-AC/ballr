import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateImage from "./components/CreateImage"
import AllImages from "./components/AllImages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/images"exact>
            <AllImages />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/images/create">
            <CreateImage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
