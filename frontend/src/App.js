import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateImage from "./components/CreateImage";
import AllImages from "./components/AllImages";
import SingleImage from "./components/SingleImage";
import AllAlbums from "./components/AllAlbums";
import SingleAlbum from "./components/SingleAlbum";
import Home from "./components/Home";
import Footer from "./components/Footer";
import UploadImage from "./components/UploadImage";


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
          <Route path="/albums"exact>
            <AllAlbums />
          </Route>
          <Route path="/images/upload"exact>
            <UploadImage />
          </Route>
          <Route path="/images/:imageId">
            <SingleImage />
          </Route>
          <Route path="/albums/:albumId">
            <SingleAlbum />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
