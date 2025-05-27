import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "@assets/images/logo-text.png";
import IconBurgerMenu from "@assets/icons/icon-burger-menu.svg";
import SearchIcon from '@mui/icons-material/Search';

const Navigation = () => {
    const [navOpen, setNavOpen] = useState(false);
    return(
        <nav className="nav container">
            <NavLink to="/" style={{padding: 0}}><img src={Logo} className="logo" alt="Logo"/></NavLink>
            <div className={(navOpen == true ? "open":"") + " mobile-nav"}>
                <div className="nav-left" onClick={() => setNavOpen(false)}>
                    <NavLink to="/properties?purpose=rent"><strong>Rent</strong></NavLink>
                    <NavLink to="/properties?purpose=sale"><strong>Buy</strong></NavLink> 
                    <NavLink to="/properties">
                        Search
                        <SearchIcon className="search-icon"/>
                    </NavLink>
                </div>              
                <div className="nav-right" onClick={() => setNavOpen(false)}>
                    <NavLink to="/about-us">About Us</NavLink>
                    <NavLink to="/realtors">Realtors</NavLink>
                    <NavLink to="/calculator" style={{paddingRight: 0}}>Calculator</NavLink>
                </div>
            </div>
            <img src={IconBurgerMenu} className="burger-icon" onClick={() => setNavOpen(!navOpen)} alt="Toggle Menu"/>
        </nav>
    )
}

export default Navigation;