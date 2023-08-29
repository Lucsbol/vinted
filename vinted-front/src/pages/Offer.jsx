import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="offer">
      <div className="offer-Container">
        <div className="offer-Img">
          <img src={data.product_pictures[0].secure_url} alt="Product" />
        </div>
        <div className="offer-Details">
          <span className="offer-Price">{data.product_price} €</span>
          <div className="offer-Info">
            <p className="grey-text">
              MARQUE :{" "}
              <span className="api-data">{data.product_details[0].MARQUE}</span>
            </p>
            <p className="grey-text">
              ÉTAT :{" "}
              <span className="api-data">{data.product_details[1].ÉTAT}</span>
            </p>
            <p className="grey-text">
              COULEUR :{" "}
              <span className="api-data">
                {data.product_details[2].COULEUR}
              </span>
            </p>
            <p className="grey-text">
              EMPLACEMENT :{" "}
              <span className="api-data">
                {data.product_details[3].EMPLACEMENT}
              </span>
            </p>
          </div>
          <div className="offer-Description">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
          </div>
          <div className="avatar">
            <img
              src={data.owner.account.avatar.secure_url}
              alt="Avatar"
              className="avatar-image"
            />
            <div className="avatar-details">
              <p className="avatar-name">{data.owner.user}</p>
              <p className="avatar-username">{data.owner.account.username}</p>
            </div>
            <div className="payement-button">
              <Link to="/payement">
                <button className="payment-btn">Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
