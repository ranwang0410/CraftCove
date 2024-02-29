import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className='navcontainer'>
      <li><NavLink to="/"><img src='/home.png' alt="Home1" className="nav-home-icon" /></NavLink></li>
      {/* <li><SearchBar/></li> */}
      <li><ProfileButton /></li>
      {/* <li><ShoppingCart/></li> */}
    </ul>
  );
}

export default Navigation;
