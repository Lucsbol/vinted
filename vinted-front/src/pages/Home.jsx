import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <Hero />

      <div className="card-list">
        {data.offers.map((offerList, index) => {
          const { owner, product_image, product_price } = offerList;

          return (
            <div className="card-container">
              <div className="card-username">
                {owner.account.avatar && (
                  <img
                    className="avatar"
                    src={owner.account.avatar.secure_url}
                    alt={owner.account.username}
                  />
                )}
                <p>{owner.account.username}</p>
              </div>
              <div>
                <Link to={`/offers/${offerList._id}`} key={index}>
                  <img src={product_image.secure_url} alt="" />
                </Link>
              </div>
              <div className="card-price">
                <span>{product_price} €</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
