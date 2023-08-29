import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              {
                email,
                password,
              }
            );
            console.log("log connexion", response.data);
            setToken(response.data.token);
            navigate("/");
          } catch (error) {
            alert(
              "Vous avez saisi un mauvais e-mail ou mot de passe 🫤 ! Si vous n'avez pas de compte, inscrivez-vous."
            );
            console.log(error.message);
            // console.log(error.response.data);
          }
        }}
      >
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Se connecter" />
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
