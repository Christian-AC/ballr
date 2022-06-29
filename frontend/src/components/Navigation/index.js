import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="Nav-bar">
      <ul>
        <li>
          {isLoaded && sessionLinks}
        </li>
        <li>
          <NavLink exact to="/images">Images</NavLink>

        </li>
        <li>
          <NavLink exact to="/albums">Albums</NavLink>

        </li>
      </ul>
    </div>
  );
}

export default Navigation;
