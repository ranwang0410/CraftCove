import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import './ProfileButton.css'
import {NavLink} from 'react-router-dom'
function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const ulRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ulRef.current && !ulRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
      setShowMenu(false);
  };
  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setShowMenu(false);
  };

  return (
    <div className="container">
      <div ref={ulRef}>
        {user ? (
          <>
            <button onClick={() => setShowMenu(!showMenu)}>
              <i className="fas fa-user-circle" />
              <i className="fas fa-caret-down" />
            </button>
            {showMenu && (
              <div className="profile-dropdown">
                <ul>
                  <li>{user.username}</li>
                  <li>{user.email}</li>
                  <li>
                    <button onClick={(e) => logout(e)}><NavLink to ='/'>Sign Out</NavLink></button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Sign in"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </>

        )}

      </div>
    </div>
  );
}

export default ProfileButton;

