import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import {useSelector} from 'react-redux'

function Navigation() {
  const navigate = useNavigate()
  const sessionUser = useSelector(state => state.session.user);
  const handleStoreClick = () => {
    navigate('/store');
  };
  return (
    <ul className='navcontainer'>
      <li><NavLink to="/"><img src='/home.png' alt="Home1" className="nav-home-icon" /></NavLink></li>
      {/* <li><SearchBar/></li> */}
      {
          sessionUser && (

            <li onClick={handleStoreClick}>
              <NavLink to="/store">
                <i className="fas fa-store-alt"/>
              </NavLink>
            </li>
          )
        }
      <li><ProfileButton /></li>

      <li className="shopping-cart-icon">
          <i className="fas fa-shopping-cart"></i>
        </li>

    </ul>
  );
}

export default Navigation;
