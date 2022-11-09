import React, { useState, useEffect, useMemo } from "react";
import starFilled from "../Assets/homepage/starfilled.svg";
import starUnFilled from "../Assets/homepage/starfilled.svg";
import recommendedprofile from "../Assets/homepage/randomman.svg";
import recommended4usampleimage from "../Assets/homepage/recommended4usampleimage.svg";

const CategoryCards = ({
  first_name,
  last_name,
  hm_id,
  category,
  // service_image,
  price_from,
  type_of_work,
  description,
  handleCategoryCard,
}) => {
  const [hmRatings, setHmRatings] = useState([]);

  //====================== BACKEND FETCHING =======================
  const getHmRatings = async () => {
    const res = await fetch(
      `http://127.0.0.1:8001/handyman/${hm_id}/averageratingandjobs`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const ratingData = await res.json();
    setHmRatings(ratingData);
  };
  console.log(hm_id);
  console.log(hmRatings);
  console.log(hmRatings.total_jobs);
  //======================Creating Star Ratings=======================
  let count = 5;
  const starColour = (index) => {
    if (hmRatings.length > 0) {
      if (hmRatings[0].average_rating >= index) {
        return starFilled;
      }
      return starUnFilled;
    }
  };
  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <img src={starColour(idx)} key={idx} className="review--stars" />
      ));
  });
  //===================================================================

  useEffect(() => {
    getHmRatings();
  }, []);

  return (
    <div
      className="individual--category--card mt24"
      onClick={() => {
        handleCategoryCard({
          // first_name,
          // category,
          // price_from,
          // description,
          // type_of_work,
        });
      }}
    >
      <img
        src={recommended4usampleimage}
        className="individual--category--image"
        alt="images"
      />
      <div className="individual--category--description--container">
        <div className="individual--category--description--section ml12">
          <p className="individual--category--title fs16 fw700 m0 white mb4">
            {category}
          </p>
          <p className="individual--category--name fs12 fw400 m0 white mb4">
            {first_name}
          </p>
          <div className="individual--category--profile--stars mb4">
            <img src={recommendedprofile} alt="images"></img>
            <div className="individual--category--stars">
              <img src={starFilled} alt="images"></img>
              <img src={starFilled} alt="images"></img>
              <img src={starFilled} alt="images"></img>
              <img src={starFilled} alt="images"></img>
              <img src={starFilled} alt="images"></img>
            </div>
          </div>
          {hmRatings.length > 0 ? (
            <p className="m0 fw700 fs8 white">
              {hmRatings[0].total_jobs} jobs completed
            </p>
          ) : (
            <p className="m0 fw700 fs8 white">0 jobs completed</p>
          )}
        </div>
        <div className="individual--category--price ml12">
          <p className="starting--from m0 white fw700">starting from</p>
          <p className="starting--from--price m0 fs28 fw700">${price_from}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;
