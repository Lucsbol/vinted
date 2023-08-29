import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ setUserToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    subscribe: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );

      Cookies.set("token", response.data.token, { expires: 14 });

      if (response.data.token) {
        setUserToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error during account creation:", error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signup">
      <div className="container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="enroll-newsletter">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label htmlFor="subscribe">S'inscrire à la newsletter</label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Chargement..." : "S'inscrire"}
          </button>
          <Link to="/signin">Tu as déjà un compte ? Connecte-toi !</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
