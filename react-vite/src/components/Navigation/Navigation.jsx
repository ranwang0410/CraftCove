import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from 'react-redux'

function Navigation() {
  const navigate = useNavigate()
  const sessionUser = useSelector(state => state.session.user);


  const handleStoreClick = () => {
    navigate('/store');
  };

  return (
    <ul className='navcontainer'>
      <li><NavLink to="/"><img src='/home.png' alt="Home1" className="nav-home-icon" /></NavLink></li>

      {/* <form className="search-form" onClick={() => alert('Feature coming soon')}>
          <input
            type="text"
            placeholder="Search..."
            value='Search for anything'
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form> */}
      <li className="landing-right">
        {
          sessionUser && (
            <li onClick={handleStoreClick} title="Manage Shop">
              <NavLink to="/store">
                <i className="fas fa-store-alt" />
              </NavLink>
            </li>
          )
        }
        <li><ProfileButton /></li>

        <button className="shopping-cart-icon" onClick={() => alert('Feature coming soon')} title='shopping cart'>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </li>

    </ul>
  );
}

export default Navigation;
