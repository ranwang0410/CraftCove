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
      <NavLink to="/"><img src='/home.png' alt="Home1" className="nav-home-icon" /></NavLink>

      {/* <form className="search-form" onClick={() => alert('Feature coming soon')}>
          <input
            type="text"
            placeholder="Search..."
            value='Search for anything'
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form> */}
      <div className="landing-right">
        {
          sessionUser && (
            <div onClick={handleStoreClick} title="Manage Shop" className="nav-item">
              <NavLink to="/store" className='manage-shop-button' style={{fontSize:'17px',color:'black'}}>
                <i className="fas fa-store-alt" />
              </NavLink>
            </div>
          )
        }
        <div className="nav-item"><ProfileButton /></div>

        <button className="shopping-cart-icon" onClick={() => alert('Feature coming soon')} title='shopping cart' style={{fontSize:'15px'}}>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>

    </ul>
  );
}

export default Navigation;
