import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";

import Header from "./pages/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payement from "./pages/Payement.jsx";
import Checkout from "./pages/CheckoutForm.jsx";
import CheckoutForm from "./pages/CheckoutForm.jsx";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState();

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path="/publish"
          element={<Publish token={token} setToken={setToken} />}
        />
        <Route
          path="/payement"
          element={<Payement token={token} setToken={setToken} />}
        />
        <Route
          path="/CheckoutForm"
          element={<CheckoutForm token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
