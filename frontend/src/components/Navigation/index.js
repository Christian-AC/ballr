import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({credential: "Demo-lition", password: 'password' }));
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ul className='user-stuff'>
        <li>
          <NavLink exact to="/images/upload">Upload</NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </ul>
    );
  } else {
    sessionLinks = (
      <ul className='user-stuff'>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <NavLink id="Signupnav" to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <form onSubmit={demoLogin}>
              <button type="submit">Demo User</button>
          </form>
        </li>
      </ul>
    );
  }

  return (
    <div className="Nav-bar">
      <ul>
        <li>
          <NavLink exact to="/">Ballr</NavLink>
        </li>
        <li>
          <NavLink exact to="/albums">Albums</NavLink>
        </li>
        <li>
          <NavLink exact to="/images">Images</NavLink>
        </li>
        <li id="profileButton">
        </li>
      </ul>
          {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
