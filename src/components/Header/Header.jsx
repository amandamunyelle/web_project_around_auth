import logo from "../../images/logo.png";
import line from "../../images/line.png";
import { Link, useLocation } from "react-router-dom";

export default function Header({ loggedIn, onLogout }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img src={logo} alt="Around the U.S logo" className="logo header__logo" />
      <img src={line} alt="linha decorativa" className="header__line" />
      {loggedIn ? (
        <button className="header__logout" onClick={onLogout}>
          Sair
        </button>
      ) : (
        <Link
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
          className="header__link"
        >
          {location.pathname === "/signin" ? "Registrar-se" : "Entrar"}
        </Link>
      )}
    </header>
  );
}
