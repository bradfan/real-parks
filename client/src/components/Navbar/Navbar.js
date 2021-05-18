import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { GiForest } from "react-icons/gi";

const styles = {
  height: "10vh",
  width: "20vw",
};

const active = {
  background: "linear-gradient(135deg, #4D6241 40%, blue",
};

const backStyles = {
  fontSize: 20,
  fontWeight: "bold",
  listStyleType: "none",
  display: "inline-block",
  marginLeft: "0%",
  fontFamily: "Roboto, Times New Roman, Times, serif",
};

const createLink = ({ text, to, ...rest }) => {
  const className = "nav-link";
  if (to) {
    return (
      <Link className={className} to={to} {...rest}>
        {text}
      </Link>
    );
  }
  return (
    <span
      role="button"
      className={className}
      style={{ cursor: "pointer" }}
      {...rest}
    >
      {text}
    </span>
  );
};

function NavLinks() {
  const { isLoggedIn, logout } = useAuth();
  const links = [];
  if (isLoggedIn) {
    links.push({ text: "Home", to: "/" });
    links.push({ text: "Dashboard", to: "/dashboard" });
    links.push({ text: "Favorites", to: "/favorites" });
    links.push({ text: "Logout", onClick: () => logout() });
  } else {
    links.push({ text: "Signup", to: "/signup" });
    links.push({ text: "Login", to: "/login" });
  }
  return (
    <ul style={styles} className="navbar-nav">
      {links.map((link, i) => (
        <li key={i} className="nav-item">
          {createLink(link)}
        </li>
      ))}
    </ul>
  );
}

function Navbar() {
  return (
    <nav
      style={active}
      className="navbar navbar-expand navbar-dark bg-secondary"
    >
      <div style={backStyles} className="container">
        <Link className="navbar-brand" to="/"></Link>
        <NavLinks />
      </div>
      <div>
        <GiForest color="green" size="8rem" />
      </div>
    </nav>
  );
}

export default Navbar;
