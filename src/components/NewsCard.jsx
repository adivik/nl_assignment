import React, { useState, useEffect } from "react";
import { RiHeart3Fill } from "react-icons/ri";
import "./style.css";

function NewsCard(props) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const storedState = localStorage.getItem(`news_${props.id}_favorite`);
    if (storedState === "true") console.log("hi");
    console.log(`Loading state for news ${props.id}: ${storedState}`);
    return storedState === "true";
  });

  useEffect(() => {
    console.log(isFavorite);
    localStorage.setItem(`news_${props.id}_favorite`, isFavorite);
    console.log(`news_${props.id} was made favorite:${isFavorite}`);
  }, [props.id, isFavorite]);

  function handleWishlistClick() {
    setIsFavorite(!isFavorite);
  }

  const date = new Date(props.time);

  return (
    <div className="col-6 col-md-6 col-lg-3 mb-3" key={props.index}>
      <div className="card h-100">
        <br />

        <RiHeart3Fill
          className="heart"
          style={{ color: isFavorite ? "red" : "black" }}
          onClick={handleWishlistClick}
        />

        <div className="m-3 mb-0">
          <small className="card-title">
            <h3>{props.title}</h3>
          </small>
          <br />
          <small className="card-title">
            Published At: {date.toDateString()}
          </small>
          <br />
        </div>
        <div style={{ marginTop: "auto" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="m-3">
              <b>Story By: {props.author} </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
