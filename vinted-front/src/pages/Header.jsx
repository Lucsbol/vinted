import { Link } from "react-router-dom";

const Header = ({ token, setToken, search, setSearch }) => {
  return (
    <>
      <header className="head">
        <div className="headerContainer">
          <Link to="/">
            <img src="/src/images/logo-vinted.png" alt="" />
          </Link>
          <input
            type="text"
            value={search}
            placeholder="Recherche des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          {token ? (
            <>
              <button
                className="logoutButton" // Added class for styling
                onClick={() => {
                  setToken("");
                }}
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="authButton"> S'inscrire</button>
              </Link>

              <Link to="/login">
                <button className="authButton">Se connecter</button>
              </Link>
            </>
          )}
          <Link to="/publish">
            <button className="sellButton">Vends tes articles</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
