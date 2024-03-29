import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import './ProfileButton.css'
import { useNavigate} from 'react-router-dom'
// import {clearCart} from '../../redux/cart'
function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()
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
  const logout =async(e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setShowMenu(false);
    // dispatch(clearCart())
    navigate('/')
  };

  return (
    <div className="container">
      <div ref={ulRef}>
        {user ? (
          <>
            <button onClick={() => setShowMenu(!showMenu)} className="profile-button">
              <i className="fas fa-user-circle" style={{ marginRight: '2px',fontSize:'18px' }}/>
              <i className="fas fa-caret-down" />
            </button>
            {showMenu && (
              <div className="profile-dropdown">
                <ul>
                  <li className="profile-detail">{user.username}</li>
                  <li className="profile-detail">{user.email}</li>
                  <li>
                  <button onClick={logout} className="logout-button">Sign Out   <i className="fa-solid fa-arrow-right-from-bracket"/></button>
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

