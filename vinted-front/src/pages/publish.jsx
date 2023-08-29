import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const PublishAdPage = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div>
      <h1 className="main-title">Vends ton article</h1>{" "}
      <div className="publish-container">
        <form className="publish-form" onSubmit={handleSubmit}>
          <div className="publish-block">
            <div className="publish-picture">
              <button htmlFor="filePicker">
                <label htmlFor="fileInput">Ajoute une photo</label>
                <input type="file" id="fileInput" style={{ display: "none" }} />
              </button>
              <input
                style={{ display: "none" }}
                id="filePicker"
                type="file"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                }}
              />
              {picture && <img src={URL.createObjectURL(picture)} alt="" />}
            </div>
            <div className="publish-title">
              <label>Titre</label>
              <input
                type="text"
                placeholder="Titre"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="publish-description">
              <label>Description</label>
              <textarea
                placeholder="Description"
                cols="30"
                rows="10"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="publish-block">
            <div className="publish-brand">
              <label>Marque</label>
              <input
                type="text"
                placeholder="Marque"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="publish-size">
              <label>Taille</label>
              <input
                type="text"
                placeholder="Taille"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="publish-color">
              <label>Couleur</label>
              <input
                type="text"
                placeholder="Couleur"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="publish-condition">
              <label>État</label>
              <input
                type="text"
                placeholder="État"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="publish-place">
              <label>Lieu</label>
              <input
                type="text"
                placeholder="Lieu"
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-block">
            <div className="publish-price">
              <label>Prix</label>
              <input
                type="number"
                placeholder="Prix"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-block">
            <div className="publish-submit">
              <input type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PublishAdPage;
